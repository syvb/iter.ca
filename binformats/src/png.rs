#![allow(clippy::eval_order_dependence)] // n! macro

use crate::Data;
use flate2::read::ZlibDecoder;
use std::{convert::TryInto, io::prelude::*};

#[derive(Debug, Clone, PartialEq)]
pub struct Png<'a> {
    /// The PNG signature, "137 80 78 71 13 10 26 10"
    signature: Data<'a, ()>,
    pub chunks: Vec<Chunk<'a>>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ChunkName<'a>(pub Data<'a, [u8; 4]>);

#[derive(Debug, Clone, PartialEq)]
pub struct Chunk<'a> {
    pub size: Data<'a, u32>,
    pub name: ChunkName<'a>,
    pub data: Data<'a, &'a [u8]>, // TODO: decode this!
    pub crc: Data<'a, u32>,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum ColorType {
    Greyscale = 0,
    Truecolor = 2,
    IndexedColor = 3,
    GreyscaleAlpha = 4,
    TruecolourAlpha = 6,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum Interlacing {
    None = 0,
    Adam7 = 1,
}

// section 8.2
pub const ADAM7: [[u8; 8]; 8] = [
    [1, 6, 4, 6, 2, 6, 4, 6],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [5, 6, 5, 6, 5, 6, 5, 6],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [3, 6, 4, 6, 3, 6, 4, 6],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [5, 6, 5, 6, 5, 6, 5, 6],
    [7, 7, 7, 7, 7, 7, 7, 7],
];

pub const ADAM7_HEIGHT_DIVSORS: [u32; 8] = [0, 8, 8, 8, 4, 4, 2, 2];
pub const ADAM7_WIDTH_DIVSORS: [u32; 8] = [0, 8, 8, 4, 4, 2, 2, 1];

#[derive(Debug, Clone, PartialEq)]
pub enum ChunkData {
    Idhr {
        width: u32,
        height: u32,
        bit_depth: u8,
        color_type: ColorType,
        compression_method: u8,
        filter_method: u8,
        interlace_method: Interlacing,
    },
    Plte(Vec<(u8, u8, u8)>),
    Iend,
    Chrm {
        white_point_x: u32,
        white_point_y: u32,
        red_x: u32,
        red_y: u32,
        green_x: u32,
        green_y: u32,
        blue_x: u32,
        blue_y: u32,
    },
    Gama(u32),
    Srgb(u8),
}

pub struct Bitmap {
    width: u32,
    height: u32,
    data: Vec<(u8, u8, u8)>,
}

impl ChunkData {
    pub fn from_chunk(c: &Chunk) -> Option<Self> {
        match &c.name.0 .0 {
            b"IHDR" => {
                if c.size.0 != 13 {
                    return None;
                }
                Some(Self::Idhr {
                    width: u32::from_be_bytes([c.data.0[0], c.data.0[1], c.data.0[2], c.data.0[3]]),
                    height: u32::from_be_bytes([
                        c.data.0[4],
                        c.data.0[5],
                        c.data.0[6],
                        c.data.0[7],
                    ]),
                    bit_depth: c.data.0[8],
                    color_type: match c.data.0[9] {
                        0 => ColorType::Greyscale,
                        2 => ColorType::Truecolor,
                        3 => ColorType::IndexedColor,
                        4 => ColorType::GreyscaleAlpha,
                        6 => ColorType::TruecolourAlpha,
                        _ => return None,
                    },
                    compression_method: c.data.0[10],
                    filter_method: c.data.0[11],
                    interlace_method: match c.data.0[12] {
                        0 => Interlacing::None,
                        1 => Interlacing::Adam7,
                        _ => return None,
                    },
                })
            }
            b"PLTE" => {
                if c.size.0 % 3 != 0 {
                    return None;
                }
                Some(Self::Plte(
                    c.data.0.chunks(3).map(|x| (x[0], x[1], x[2])).collect(),
                ))
            }
            b"IEND" => Some(Self::Iend),
            b"gAMA" => {
                if c.size.0 != 4 {
                    return None;
                }
                Some(Self::Gama(u32::from_be_bytes([
                    c.data.0[0],
                    c.data.0[1],
                    c.data.0[2],
                    c.data.0[3],
                ])))
            }
            b"sRGB" => {
                if c.size.0 != 1 {
                    return None;
                }
                Some(Self::Srgb(c.data.0[0]))
            }
            // TODO: more
            _ => None,
        }
    }
    /// This should only be called on IDHR chunks. Returns the numbers of bits per pixel.
    pub fn bits_per_pixel(&self) -> u8 {
        if let ChunkData::Idhr {
            color_type,
            bit_depth,
            ..
        } = self
        {
            match color_type {
                ColorType::Greyscale | ColorType::IndexedColor => *bit_depth,
                ColorType::GreyscaleAlpha => bit_depth * 2,
                ColorType::Truecolor => bit_depth * 3,
                ColorType::TruecolourAlpha => bit_depth * 4,
            }
        } else {
            panic!("not an IDHR chunk");
        }
    }
    /// Bytes per pixel, rounding up to 1 if less than a byte is used per pixel.
    pub fn bytes_per_pixel(&self) -> u8 {
        let bits = self.bits_per_pixel();
        if bits <= 8 {
            1
        } else {
            assert!(bits % 8 == 0);
            bits / 8
        }
    }
}

impl<'a> Chunk<'a> {
    pub fn text_summary(&self) {
        println!("{}", String::from_utf8_lossy(&self.name.0 .0));
        println!("\tSize: {} bytes", self.size.0);
        if let Some(parsed) = ChunkData::from_chunk(self) {
            println!("\tData: {:?}", parsed);
        } else {
            match &self.name.0 .0 {
                b"IDAT" => println!("\tData: (image data)"),
                b"tEXt" => println!("\tData: {}", String::from_utf8_lossy(self.data.0)),
                _ => println!("\tData: {:02x?}", self.data.0),
            };
        }
        println!("\tCRC: {}", self.crc.0);
    }
}

impl<'a> Png<'a> {
    pub fn text_summary(&self) {
        println!("Signature: {:02x?}", self.signature);
        for chunk in &self.chunks {
            chunk.text_summary();
        }
    }
    pub fn from_bytes(s: &'a [u8]) -> Result<Self, &'static str> {
        if s.len() < 8
            || s[0] != 137
            || s[1] != 80
            || s[2] != 78
            || s[3] != 71
            || s[4] != 13
            || s[5] != 10
            || s[6] != 26
            || s[7] != 10
        {
            return Err("invalid signature");
        }
        let mut idx = 8;
        macro_rules! n {
            () => {{
                idx += 1;
                *s.get(idx - 1).ok_or("too short")?
            }};
        }
        macro_rules! n_u32 {
            () => {{
                idx += 4;
                let data = s.get((idx - 4)..idx).ok_or("too short")?;
                Data(
                    u32::from_be_bytes([data[0], data[1], data[2], data[3]]),
                    &s[(idx - 4)..idx],
                )
            }};
        }
        let mut chunks = Vec::with_capacity(2);
        while s.len() > idx {
            let size = n_u32!();
            // "Although encoders and decoders should treat the length as unsigned, its value shall not exceed 2^31-1 bytes"
            if size.0 > i32::MAX as u32 {
                return Err("len too long");
            }
            let name_start = idx;
            let name = [n!(), n!(), n!(), n!()];
            for &b in &name {
                if !((65..=90).contains(&b) || (97..=122).contains(&b)) {
                    return Err("chunk type character out of range");
                }
            }
            let name = ChunkName(Data(name, &s[(name_start)..idx]));
            if (idx + size.0 as usize) > s.len() {
                return Err("chunk size too big");
            }
            let data = Data(
                &s[idx..(idx + size.0 as usize)],
                &s[idx..(idx + size.0 as usize)],
            );
            idx += size.0 as usize;
            let crc = n_u32!();
            chunks.push(Chunk {
                name,
                size,
                data,
                crc,
            });
        }
        Ok(Self {
            signature: Data((), &s[0..8]),
            chunks,
        })
    }
    pub fn raw_idat(&self) -> Option<Vec<u8>> {
        let mut combined = Vec::new();
        for chunk in self.chunks.iter().filter(|c| c.name.0 .0 == *b"IDAT") {
            combined.extend_from_slice(chunk.data.0);
        }
        Some(combined)
    }
    pub fn decompressed_idat(&self) -> Option<Vec<u8>> {
        let combined = self.raw_idat()?;
        let mut decomp = ZlibDecoder::new(&combined[..]);
        let mut buf = Vec::new();
        decomp.read_to_end(&mut buf).ok()?;
        Some(buf)
    }
    pub fn defilter_idat(
        &self,
        idat: &[u8],
        interlace_pass: u8,
    ) -> Option<(u32, u32, Vec<u8>, [u32; 5])> {
        #[inline]
        fn paeth(oa: u8, ob: u8, oc: u8) -> u8 {
            // "shall be performed exactly, without overflow"
            let a = oa as i16;
            let b = ob as i16;
            let c = oc as i16;
            let p = a + b - c;
            let pa = (p - a).abs();
            let pb = (p - b).abs();
            let pc = (p - c).abs();
            if pa <= pb && pa <= pc {
                oa
            } else if pb <= pc {
                ob
            } else {
                oc
            }
        }
        assert!(interlace_pass >= 1 && interlace_pass <= 7);
        let mut counts = [0; 5];
        let idhr = ChunkData::from_chunk(self.chunks.get(0)?);
        if let Some(ChunkData::Idhr {
            width,
            height,
            interlace_method,
            ..
        }) = idhr
        {
            let idhr = idhr.unwrap();
            assert!(
                idhr.bits_per_pixel() >= 8,
                "sub-byte pixels are unimplemented"
            );
            assert!(interlace_method == Interlacing::Adam7 || interlace_pass == 1);
            // assumes that adam7 images have power of 2 dimensions
            let bpp = idhr.bytes_per_pixel();
            let (width, height, idat_offset) = if interlace_method == Interlacing::Adam7 {
                let mut idat_offset = 0;
                for pass in 1..interlace_pass {
                    let width = width / ADAM7_WIDTH_DIVSORS[pass as usize];
                    let height = height / ADAM7_HEIGHT_DIVSORS[pass as usize];
                    idat_offset += (width * height * bpp as u32) as usize + height as usize;
                }
                (
                    width / ADAM7_WIDTH_DIVSORS[interlace_pass as usize],
                    height / ADAM7_HEIGHT_DIVSORS[interlace_pass as usize],
                    // skip over previous interlacing passes
                    idat_offset,
                )
            } else {
                (width, height, 0)
            };
            // image data + filters
            let size = (width * height * bpp as u32) as usize + height as usize;
            assert!(interlace_method != Interlacing::None || idat.len() == size);
            let mut data: Vec<u8> = Vec::with_capacity(size);
            for y in 0..height {
                let filter =
                    idat[y as usize * ((width as usize) * (bpp as usize) + 1) + idat_offset];
                counts[filter as usize] += 1;
                for x in 0..((width * bpp as u32) + 1) {
                    if x == 0 {
                        continue; // filter byte
                    }
                    let leftmost = x <= bpp as u32;
                    let topmost = y == 0;
                    // TODO: get right values when accounting for interlacing
                    let a = if leftmost {
                        0
                    } else {
                        data[data.len() - bpp as usize]
                    };
                    let b = if topmost {
                        0
                    } else {
                        data[data.len() - (width as usize) * (bpp as usize)]
                    };
                    let c = if topmost || leftmost {
                        0
                    } else {
                        data[data.len() - (width as usize) * (bpp as usize) - bpp as usize]
                    };
                    // filt is the filter pixel that we want to undo the filtering on
                    let filt = idat[y as usize * ((width as usize) * (bpp as usize) + 1)
                        + (x as usize)
                        + idat_offset];
                    data.push(match filter {
                        0 => filt,                                                               // none
                        1 => filt.wrapping_add(a), // sub
                        2 => filt.wrapping_add(b), // up
                        3 => filt.wrapping_add(((a as u16 + b as u16) / 2).try_into().unwrap()), // average (integer division gives us flooring for free)
                        4 => filt.wrapping_add(paeth(a, b, c)), // paeth
                        _ => panic!("invalid filt"),
                    });
                }
            }
            // assert_eq!(data.len(), data.capacity());
            Some((width, height, data, counts))
        } else {
            None
        }
    }
    pub fn data_to_bitmap(&self, data: Vec<u8>) -> Option<Bitmap> {
        if let Some(ChunkData::Idhr { height, width, .. }) =
            ChunkData::from_chunk(self.chunks.get(0)?)
        {
            Some(Bitmap {
                height,
                width,
                data: data
                    .chunks(3)
                    .map(|x| (x[0], *x.get(1).unwrap_or(&0), *x.get(2).unwrap_or(&0)))
                    .collect(),
            })
        } else {
            None
        }
    }
    pub fn data_to_bitmap_wh(&self, data: (u32, u32, Vec<u8>, [u32; 5])) -> Bitmap {
        Bitmap {
            height: data.1,
            width: data.0,
            data: data
                .2
                .chunks(3)
                .map(|x| (x[0], *x.get(1).unwrap_or(&0), *x.get(2).unwrap_or(&0)))
                .collect(),
        }
    }
}

impl Bitmap {
    pub fn ppm(&self) -> Vec<u8> {
        let mut data = vec![b'P', b'3', b' '];
        data.extend_from_slice(self.width.to_string().as_bytes());
        data.push(b' ');
        data.extend_from_slice(self.height.to_string().as_bytes());
        data.push(b' ');
        data.push(b'2');
        data.push(b'5');
        data.push(b'5');
        data.push(b' ');
        for (r, g, b) in &self.data {
            data.extend_from_slice(r.to_string().as_bytes());
            data.push(b' ');
            data.extend_from_slice(g.to_string().as_bytes());
            data.push(b' ');
            data.extend_from_slice(b.to_string().as_bytes());
            data.push(b' ');
        }
        if self.data.len() / 3 < (self.height * self.width) as usize {
            let extra_bytes = (self.height * self.width) as usize - (self.data.len() / 3);
            for _ in 0..extra_bytes {
                data.push(b'0');
                data.push(b' ');
                data.push(b'0');
                data.push(b' ');
                data.push(b'0');
                data.push(b' ');
            }
        }
        data
    }
}
