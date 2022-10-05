use std::{fmt, fs, path::PathBuf, str::FromStr};

pub mod png;

#[cfg(test)]
pub fn hex(h: &'static str) -> Vec<u8> {
    h.split_whitespace()
        .map(|group| u8::from_str_radix(group, 16).unwrap())
        .collect()
}

pub fn bytes_hex(b: &[u8]) -> String {
    b.iter()
        .map(|byte| format!("{:02X}", byte))
        .fold(String::new(), |acc, next| format!("{} {}", acc, next))
}

#[derive(Debug, Clone, PartialEq)]
pub struct Data<'a, T>(pub T, pub &'a [u8])
where
    T: fmt::Debug + Clone + PartialEq;

pub fn get_data(sub: &'static str) -> (PathBuf, PathBuf, String) {
    let public = std::env::args().nth(2).expect("must pass root directory");
    let root = PathBuf::from_str(&public).expect("invalid directory");
    let public = root.join("public");
    if !public.exists() {
        panic!("public doesn't exist");
    }
    let subdir = public.join(sub);
    if !subdir.exists() {
        println!("Creating {} subdir", sub);
        fs::create_dir(subdir.clone()).expect("failed to create subdir");
    }
    let tmpl_path = root.join("tmpl").join(format!("{}.html", sub));
    let tmpl = fs::read_to_string(tmpl_path).expect("couldn't read tmpl");
    (public, subdir, tmpl)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hex_works() {
        #[cfg(test)]
        assert_eq!(
            hex("89 50 4E 47 0D 0A 1A 0A"),
            &[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
        );
    }
}
