use binformats::{
    bytes_hex,
    png::{Bitmap, ChunkData, Png},
};
use std::{env, fs, ops::RangeInclusive, process::Command};

fn main() {
    let (_public, subdir, tmpl) = binformats::get_data("png");
    let a256 = include_bytes!("../../testimgs/a256adpt.png");
    let a256png = Png::from_bytes(a256).unwrap();
    let a256inter = include_bytes!("../../testimgs/a256inter.png");
    let a256interpng = Png::from_bytes(a256inter).unwrap();

    let tmpl = {
        let prefix = env::var("BINFORMATS_URI_PREFIX")
            .map(|p| format!("{}/png/", p))
            .unwrap_or_else(|_| "".to_string());
        let chunks = a256png
            .chunks
            .iter()
            .enumerate()
            .filter(|(_, chunk)| chunk.name.0 .1 != b"IEND")
            .map(|(idx, chunk)| {
                let _data = ChunkData::from_chunk(chunk);
                // skip some boring text chunks
                if chunk.name.0.1 == b"tEXt" && !(idx == 11 || idx == 14) {
                    return "".to_string();
                }
                format!(
                    include_str!("gen_png/chunk.html"),
                    human_name = match chunk.name.0 .1 {
                        b"IHDR" => "Header",
                        b"gAMA" => "Gamma",
                        b"cHRM" => "Color space information",
                        b"bKGD" => "Background color",
                        b"pHYs" => "Physical dimensions",
                        b"tIME" => "Last modification date",
                        b"IDAT" => "Image data",
                        b"tEXt" => "Text",
                        _ => panic!(),
                    },
                    data_desc = match chunk.name.0 .1 {
                        b"IHDR" => include_str!("gen_png/header_desc.html").to_string(),
                        b"gAMA" => "= 45455".to_string(),
                        b"IDAT" => "(the compressed and filtered bytes of the image)".to_string(),
                        b"bKGD" => "= white".to_string(),
                        b"tEXt" => {
                            let mut parts = chunk.data.1.split(|val| *val == 0);
                            format!("= key: \"{}\", value: \"{}\"", String::from_utf8_lossy(parts.next().unwrap()), String::from_utf8_lossy(parts.next().unwrap()))
                        },
                        b"cHRM" => "".to_string(),
                        b"tIME" => "2021-05-10, 10:47:44 (UTC)".to_string(),
                        b"pHYs" => "2835 pixels = 1 metre".to_string(),
                        _ => panic!("unknown chunk type"),
                    },
                    len_bytes = bytes_hex(&chunk.size.1),
                    len = chunk.size.0,
                    type_bytes = bytes_hex(&chunk.name.0 .1),
                    crc_bytes = bytes_hex(&chunk.crc.1),
                    type_word = String::from_utf8(chunk.name.0 .0.to_vec()).unwrap(),
                    desc = match chunk.name.0 .1 {
                        b"IHDR" => "This contains metadata about the image.",
                        b"gAMA" => "This contains the image gamma, used to display more accurate colours.",
                        b"cHRM" => r#"This contains data about where in the <a href="https://en.wikipedia.org/wiki/CIE_1931_color_space">full CIE color space</a> the colors in the image are, so that monitors that support colors outside the standard sRGB space can display the image better."#,
                        b"bKGD" => "This contains the background color of the image to be displayed while the image is loading",
                        b"pHYs" => "This contains the physical dimensions of the image, so it can be displayed at the right physical size when possible.",
                        b"tIME" => "This contains the time the image was created at.",
                        b"IDAT" => "This contains the compressed image data.",
                        b"tEXt" => "This can store arbitrary tagged textual data about the image.",
                        _ => panic!(),
                    },
                    data_bytes = if chunk.name.0 .1 == b"IDAT" {
                        "...".to_string()
                    } else {
                        bytes_hex(chunk.data.1)
                    },
                    classes = format!("chunk-{} {}",
                        String::from_utf8_lossy(chunk.name.0.1),
                        if chunk.name.0 .1 == b"IDAT" || chunk.name.0 .1 == b"IHDR" {
                            "chunk-important"
                        } else {
                            "chunk-extra"
                        }
                    ),
                )
            })
            .fold(String::new(), |acc, next| format!("{}{}", acc, next));
        let filter_counts = a256png
            .defilter_idat(&a256png.decompressed_idat().unwrap(), 1)
            .unwrap()
            .3
            .iter()
            .enumerate()
            .map(|(id, count)| {
                format!(
                    r#"<div><span class="filt-label">{}</span> <span style="width: {}%" class="filt-amount">{}</span></div>"#,
                    match id {
                        0 => "None",
                        1 => "Subtract",
                        2 => "Up",
                        3 => "Average",
                        4 => "Paeth",
                        _ => panic!("invalid filter type"),
                    },
                    (*count as f32) / 2.56,
                    count,
                )
            })
            .fold(String::new(), |acc, next| format!("{}{}", acc, next));
        tmpl.replace("%CHUNKS%", &chunks)
            .replace("%FILTER_COUNTS%", &filter_counts)
            .replace("%PREFIX%", &prefix)
    };

    #[derive(Debug, Clone, Copy, PartialEq, Eq)]
    enum ReferenceType {
        Hex,
        Word,
    }
    #[derive(Debug, Clone)]
    enum OutPart {
        Raw(String),
        Reference(RangeInclusive<usize>, ReferenceType),
    }

    let mut parsed: Vec<OutPart> = Vec::new();
    {
        let mut in_ref = true;
        for mut part in tmpl.split('|') {
            in_ref = !in_ref;
            if in_ref {
                let mut ref_type = ReferenceType::Hex;
                if part.bytes().next().unwrap() == b'w' {
                    part = &part[1..];
                    ref_type = ReferenceType::Word;
                };
                let mut parts = part.split('-');
                parsed.push(OutPart::Reference(
                    parts.next().unwrap().parse().unwrap()..=parts.next().unwrap().parse().unwrap(),
                    ref_type,
                ))
            } else {
                parsed.push(OutPart::Raw(part.to_string()));
            }
        }
        assert!(!in_ref);
    }

    let out = parsed
        .into_iter()
        .map(|part| match part {
            OutPart::Raw(x) => x,
            OutPart::Reference(range, ref_type) => match ref_type {
                ReferenceType::Hex => format!(
                    r#"<span class="chunk-bytes">{}</span>"#,
                    bytes_hex(&a256[range])
                ),
                ReferenceType::Word => a256[range]
                    .iter()
                    .map(|byte| String::from_utf8_lossy(&[*byte]).to_string())
                    .fold(String::new(), |acc, next| format!("{}{}", acc, next)),
            },
        })
        .fold(String::new(), |acc, next| format!("{} {}", acc, next));
    fs::write(subdir.join("index.html"), out).expect("failed to write");

    let write_bmp = |name: String, bmp: Bitmap| {
        let ppm = subdir.join(format!("{}.ppm", name).clone());
        let png = subdir.join(format!("{}.png", name).clone());
        fs::write(ppm.clone(), bmp.ppm()).expect("failed to write");
        Command::new("convert")
            .args([ppm, png])
            .output()
            .expect("failed to execute imagemagick");
    };
    write_bmp(
        "idat-raw".to_string(),
        a256png.data_to_bitmap(a256png.raw_idat().unwrap()).unwrap(),
    );
    write_bmp(
        "idat".to_string(),
        a256png
            .data_to_bitmap(a256png.decompressed_idat().unwrap())
            .unwrap(),
    );
    write_bmp(
        "defiltered".to_string(),
        a256png
            .data_to_bitmap(
                a256png
                    .defilter_idat(&a256png.decompressed_idat().unwrap(), 1)
                    .unwrap()
                    .2,
            )
            .unwrap(),
    );
    write_bmp(
        "inter-idat".to_string(),
        a256interpng
            .data_to_bitmap(a256interpng.decompressed_idat().unwrap())
            .unwrap(),
    );
    for pass in 1..=7 {
        write_bmp(
            format!("inter-{}", pass),
            a256interpng.data_to_bitmap_wh(
                a256interpng
                    .defilter_idat(&a256interpng.decompressed_idat().unwrap(), pass)
                    .unwrap(),
            ),
        );
    }
    Command::new("sh")
        .args(["-c", "pngcrush -ow public/png/*"])
        .output()
        .expect("failed to execute pngcrush");
    Command::new("sh")
        .args(["-c", "rm public/png/*.ppm"])
        .output()
        .expect("failed to execute rm");
}
