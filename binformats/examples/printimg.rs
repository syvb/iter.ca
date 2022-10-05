use binformats::png;
use std::io::{self, Read};

fn main() -> io::Result<()> {
    let mut buffer = Vec::new();
    let stdin = io::stdin();
    let mut handle = stdin.lock();
    handle.read_to_end(&mut buffer)?;
    let img = png::Png::from_bytes(&buffer).expect("invalid PNG");
    img.text_summary();
    Ok(())
}
