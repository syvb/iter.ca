use binformats::png;
use std::io::{self, Read, Write};

fn main() -> io::Result<()> {
    let mut buffer = Vec::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();
    handle.read_to_end(&mut buffer)?;
    let img = png::Png::from_bytes(&buffer).expect("invalid PNG");
    let bmp = img.data_to_bitmap_wh(
        img.defilter_idat(
            &img.decompressed_idat().unwrap(),
            std::env::args()
                .nth(1)
                .unwrap_or_else(|| "1".to_string())
                .parse()
                .unwrap(),
        )
        .unwrap(),
    );
    let mut out = io::stdout();
    out.write_all(&bmp.ppm())?;
    out.flush()?;
    Ok(())
}
