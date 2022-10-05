const fs = require("fs");
const assert = require("assert").strict;

const SIDE_LEN = 32;
const CLAMP = false;

function pred(a, b, c, clamp = CLAMP) {
    if (!Number.isFinite(a)) throw new Error("pred called with non-finite value for a");
    if (!Number.isFinite(b)) throw new Error("pred called with non-finite value for b");
    if (!Number.isFinite(c)) throw new Error("pred called with non-finite value for c");
    let p = a + b - c;
    if (!clamp) {
        if (p < 0) p = 0;
        if (p > 255) p = 255;
        return Math.floor(p);
    }
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    if (pa <= pb && pa <= pc) {
        return a;
    } else if (pb <= pc) {
        return b;
    } else {
        return c;
    }
    throw new Error("?");
}

const imgData = fs.readFileSync(__dirname + `/bw32.ppm`, "utf-8");
const imgParts = imgData.split(/\s+/);
assert.equal(imgParts.shift(), "P3");
assert.equal(imgParts.shift(), SIDE_LEN.toString());
assert.equal(imgParts.shift(), SIDE_LEN.toString());
assert.equal(imgParts.shift(), "255");

const img = [];
for (let i = 0; i < Math.floor(imgParts.length); i += 3) {
    const pixelIdx = i / 3; 
    const row = Math.floor(pixelIdx / SIDE_LEN);
    const col = pixelIdx - row * SIDE_LEN;
    if (col === 0) {
        img.push([]);
    }
    assert.equal(img.length - 1, row);
    assert.equal(img[row].length, col);
    const predPixel = pred;

    let a, b, c;
    if (col === 0) {
        a = [0, 0, 0];
    } else {
        a = img[row][col - 1];
    }
    if (row === 0) {
        b = [0, 0, 0];
    } else {
        b = img[row - 1][col];
    }
    if (row === 0 || col === 0) {
        c = [0, 0, 0];
    } else {
        c = img[row - 1][col - 1];
    }
    const ir = parseInt(imgParts[i], 10);
    const ig = parseInt(imgParts[i + 1], 10);
    const ib = parseInt(imgParts[i + 2], 10);
    const arr = [ir, ig, ib];
    arr.pred = [
        predPixel(a[0], b[0], c[0]),
        predPixel(a[1], b[1], c[1]),
        predPixel(a[2], b[2], c[2]),
    ];
    img[row].push(arr);
}
console.log(`P3 ${SIDE_LEN} ${SIDE_LEN} 255`);
img.forEach(row => {
    row.forEach(pixel => {
        pixel.pred.forEach(val => {
            console.log(" " + val);
        });
    });
});
