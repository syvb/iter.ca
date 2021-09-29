cd static

rm -rf transform-playground
git clone https://github.com/Smittyvb/transform-playground.git
rm -rf transform-playground/.git

rm -rf segme segmerepo
git clone https://github.com/Smittyvb/segme.git segmerepo
cd segmerepo
wasm-pack build -t no-modules
mv pkg public
cd ..
mv segmerepo/public segme
rm -rf segmerepo

cd ..
