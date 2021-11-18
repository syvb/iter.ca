use binformats::png;
use std::io::{self, Read, Write};

fn main() -> io::Result<()> {
    let mut buffer = Vec::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();
    handle.read_to_end(&mut buffer)?;
    let img = png::Png::from_bytes(&buffer).expect("invalid PNG");
    let bmp = img
        .data_to_bitmap(img.decompressed_idat().unwrap())
        .unwrap();
    let mut out = io::stdout();
    out.write_all(&bmp.ppm())?;
    out.flush()?;
    Ok(())
}
