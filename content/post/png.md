+++
title = "Every part of PNG decoding"
date = "2021-12-18T05:00:00+00:00"
description = "How the PNG file format works, in detail."
tags = ["png", "fileformat"]
image = "/pngbug.png"
image_alt = "A glitchly-looking multicolored letter S."
fmat_id = "png"
# BINFORMATS_URI_PREFIX="https://smitop.com/fmat" ca r gen_png .
# then copypaste below from <body> of binformats/public/png/index.html
+++
    <style>
        p {
            max-width: 45rem;
        }
        .chunks {
            text-align: left;
        }
        .chunk {
            border: 2px solid black;
            border-bottom: 0;
            width: 20em;
            max-width: 85vw;
            display: inline-block;
            height: max-content;
            height: fit-content;
            vertical-align: top;
            margin-right: 1em;
            margin-bottom: 1em;
        }
        .chunk .chunk-header {
            font-weight: bold;
            text-align: center;
            font-size: 1.5em;
        }
        .chunk > div {
            border-bottom: 2px solid black;
            padding: 4px;
        }
        .chunk > div > .chunk-label {
            display: block;
            font-weight: bold;
            font-size: 1.1em;
        }
        .chunk-bytes {
            font-family: monospace;
        }
        .chunk table th {
            text-align: right;
        }
        .chunk-IDAT {
            background: #f7f73a;
        }
        .chunks {
            margin-top: 1rem;
        }
        .chunk-extra {
            display: none;
        }
        #all-chunks:checked ~ .chunks > .chunk-extra {
            display: inline-block;
        }
        .filt-label {
            display: inline-block;
            width: 5rem;
        }
        .filt-amount {
            background-color: rgb(194, 194, 194);
            display: inline-block;
        }
        .filt-counts div:nth-child(2n) .filt-amount {
            background-color: rgb(161, 161, 161);
        }
        .filt-counts {
            margin-bottom: 1rem;
        }
        .inter-passes > img {
            display: inline;
            margin-right: 1rem;
            vertical-align: top;
        }
        img {
            max-width: calc(100vw - 36px);
            height: auto;
            position: relative;
        }
        @media (max-width: 530px) {
            .chunk {
                margin-right: 0;
            }
        }
    </style>
    <div>
        <p>Let's look at the complete process of decoding a <abbr title="Portable Network Graphics">PNG</abbr> file. Here's the image I'll be using to demonstrate:</p>
        <img src="https://smitop.com/avatar/a256.png" width="256" height="256" alt="Several letter 'S's on top of each other, each with a different color." />
    </div>
    <div>
        <h2>Chunking</h2>
        <p>PNG files are stored as a series of chunks. Each chunk has a 4 byte length, 4 byte name, the acutal data, and a CRC. Most of the chunks contain metadata about the image, but the <code>IDAT</code> chunk contains the actual compressed image data. The capitalization of each letter of the chunk name determines how unexpected chunks should be handled:</p>
        <table class="chunk-char-table">
            <tbody>
                <tr><th>UPPERCASE</th><th>lowercase</th></tr>
                <tr><td>Critical</td><td>Ancillary</td><td>Is this chunk required to display the image correctly?</td></tr>
                <tr><td>Public</td><td>Private</td><td>Is this a private, application-specific, chunk?</td></tr>
                <tr><td>Reserved</td><td>Reserved</td><td></td></tr>
                <tr><td>Safe to copy</td><td>Unsafe to copy</td><td>Do programs that modify the PNG data need to understand this chunk?</td></tr>
            </tbody>
        </table>
        <img src="https://smitop.com/Chunk-letters.svg" alt="c: Ancillary, H: Public, R: Reserved, M: Unsafe to copy" width="571" height="251" />
        <p>Here are the chunks in the image:</p>
        <input type="checkbox" id="all-chunks"><label for="all-chunks"> Show metadata chunks</label>
        <div class="chunks">
            <div class="chunk chunk-important">
                <div class="chunk-top"><div class="chunk-header">Signature</div> This identifies the image as a PNG. It contains newline characters and other characters that often get mangled to ensure that the binary image data didn't get corrupted.</div>
                <div class="length"><span> <span class="chunk-bytes"> 89 50 4E 47 0D 0A 1A 0A</span> </span></div>
            </div>
            <div class="chunk chunk-IHDR chunk-important">
    <div class="chunk-top"><div class="chunk-header">Header</div> This contains metadata about the image.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 0D</span> = 13 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 49 48 44 52</span> = IHDR</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 00 00 01 00 00 00 01 00 08 02 00 00 00</span>
            <table>
    <tbody>
        <tr><th>Width</th><td>256</td></tr>
        <tr><th>Height</th><td>256</td></tr>
        <tr><th>Bit depth</th><td>8</td></tr>
        <tr><th>Color space</th><td>Truecolor RGB</td></tr>
        <tr><th>Compression method</th><td>0</td></tr>
        <tr><th>Fitler method</th><td>0</td></tr>
        <tr><th>Interlacing</th><td>disabled</td></tr>
    </tbody>
</table>

        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> D3 10 3F 31</span></div>
</div>
<div class="chunk chunk-gAMA chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Gamma</div> This contains the image gamma, used to display more accurate colours.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 04</span> = 4 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 67 41 4D 41</span> = gAMA</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 00 00 B1 8F</span>
            = 45455
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 0B FC 61 05</span></div>
</div>
<div class="chunk chunk-cHRM chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Color space information</div> This contains data about where in the <a href="https://en.wikipedia.org/wiki/CIE_1931_color_space">full CIE color space</a> the colors in the image are, so that monitors that support colors outside the standard sRGB space can display the image better.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 20</span> = 32 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 63 48 52 4D</span> = cHRM</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 00 00 7A 26 00 00 80 84 00 00 FA 00 00 00 80 E8 00 00 75 30 00 00 EA 60 00 00 3A 98 00 00 17 70</span>
            
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 9C BA 51 3C</span></div>
</div>
<div class="chunk chunk-pHYs chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Physical dimensions</div> This contains the physical dimensions of the image, so it can be displayed at the right physical size when possible.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 09</span> = 9 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 70 48 59 73</span> = pHYs</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 00 00 0B 13 00 00 0B 13 01</span>
            2835 pixels = 1 metre
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 00 9A 9C 18</span></div>
</div>
<div class="chunk chunk-tIME chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Last modification date</div> This contains the time the image was created at.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 07</span> = 7 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 74 49 4D 45</span> = tIME</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 07 E5 05 0A 0A 2F 2C</span>
            2021-05-10, 10:47:44 (UTC)
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 00 53 9E DD</span></div>
</div>
<div class="chunk chunk-bKGD chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Background color</div> This contains the background color of the image to be displayed while the image is loading</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 06</span> = 6 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 62 4B 47 44</span> = bKGD</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 00 FF 00 FF 00 FF</span>
            = white
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> A0 BD A7 93</span></div>
</div>
<div class="chunk chunk-IDAT chunk-important">
    <div class="chunk-top"><div class="chunk-header">Image data</div> This contains the compressed image data.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 F5 51</span> = 62801 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 49 44 41 54</span> = IDAT</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes">...</span>
            (the compressed and filtered bytes of the image)
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> BF EB 1B 15</span></div>
</div>
<div class="chunk chunk-tEXt chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Text</div> This can store arbitrary tagged textual data about the image.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 27</span> = 39 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 74 45 58 74</span> = tEXt</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 46 69 6C 65 00 2F 68 6F 6D 65 2F 73 6D 69 74 2F 50 69 63 74 75 72 65 73 2F 69 63 6F 6E 33 2F 33 64 2E 62 6C 65 6E 64</span>
            = key: "File", value: "/home/smit/Pictures/icon3/3d.blend"
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 88 DA 55 E7</span></div>
</div>
<div class="chunk chunk-tEXt chunk-extra">
    <div class="chunk-top"><div class="chunk-header">Text</div> This can store arbitrary tagged textual data about the image.</div>
    <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes"> 00 00 00 13</span> = 19 bytes long</span></div>
    <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes"> 74 45 58 74</span> = tEXt</span></div>
    <div class="type">
        <span class="chunk-label">Data</span>
        <span>
            <span  class="chunk-bytes"> 52 65 6E 64 65 72 54 69 6D 65 00 30 30 3A 31 32 2E 31 35</span>
            = key: "RenderTime", value: "00:12.15"
        </span>
    </div>
    <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes"> 5E 2F 7A B4</span></div>
</div>

            <div class="chunk chunk-important">
                <div class="chunk-top"><div class="chunk-header">Trailer</div> This empty chunk indicates the end of the PNG file.</div>
                <div class="length"><span class="chunk-label">Length</span><span><span class="chunk-bytes">00 00 00 00</span> = 0 bytes long</span></div>
                <div class="type"><span class="chunk-label">Type</span><span><span class="chunk-bytes">49 45 4E 44</span> = IEND</span></div>
                <div class="crc"><span class="chunk-label">CRC</span><span class="chunk-bytes">AE 42 60 82</span></div>
            </div>            
        </div>
    </div>
    <div>
        <h2>Extracting the image data</h2>
        <p>We take all of the <abbr title="Image DATa"><code>IDAT</code></abbr> chunks, and concatenate them together. In this image there is only one <code>IDAT</code> chunk, but images can have multiple IDAT chunks, and the contents are concatenated together by the PNG decoder. This is so streaming encoders <a href="https://stackoverflow.com/a/29517059/14004262">don't need to know the total data length up front</a>, since the data length is at the beginning of each chunk. It's also needed for encoding images with image data having a length longer than the largest possible chunk size (255<sup>4</sup>) Here's what we get if treat the compressed data as raw image data:</p>
        <img src="https://smitop.com/fmat/png/idat-raw.png" width="256" height="256" loading="lazy" alt="Random noise on the top third, with the rest black." />
        <p>It looks like random noise, and that means that the compression algorithm did a good job. Compressed data should look higher-entropy than the lower-entropy data it is encoding. Also, it's less than a third of the height of the actual image: that's some good compression!</p>
    </div>
    <div>
        <h2>Decompressing</h2>
        <p>The most important chunk is the <code>IDAT</code> chunk, which contains the actual image data. To get the filtered image data, we concatenate the data in the <code>IDAT</code> chunks, and decompress it using zlib. There is no image-specific compression mechanism in play here: just normal zlib compression.</p>
        <img src="https://smitop.com/fmat/png/idat.png" width="256" height="256" loading="lazy" alt="The example image, increasingly skewed to right from top to bottom. It is mostly black and white, with pixels of intense color scattered throughout." />
        <p>Aside from the colors looking all wrong, the image also appears to be skewed horizontally. This is because each line of the image has a filter as the first byte. Filters don't directly reduce the image size, but get it into a form that is more compressible by zlib. I <a href="https://observablehq.com/@smitop/png-filters">have written about PNG filters before</a>.</p>
    </div>
    <div>
        <h2>Defiltering</h2>
        <p>We take the decompressed data, and undo the filter on each line. This gets us the decoded image, the same as the original! Here's the popularity of each filter type</p>
        <div class="filt-counts">
            <div><span class="filt-label">None</span> <span style="width: 0%" class="filt-amount">0</span></div><div><span class="filt-label">Subtract</span> <span style="width: 8.984375%" class="filt-amount">23</span></div><div><span class="filt-label">Up</span> <span style="width: 30.078125%" class="filt-amount">77</span></div><div><span class="filt-label">Average</span> <span style="width: 52.34375%" class="filt-amount">134</span></div><div><span class="filt-label">Paeth</span> <span style="width: 8.59375%" class="filt-amount">22</span></div>
        </div>        
        <img src="https://smitop.com/fmat/png/defiltered.png" alt="The example image" width="256" height="256" loading="lazy" />
    </div>
    <div>
        <h2>Interlacing</h2>
        <p>PNGs can optionally be <dfn>interlaced</dfn>, which splits the image into 7 different images, each of which cover a non-overlapping area of the image:</p>
        <img src="https://smitop.com/ext/Adam7-mul.svg" alt="Diagram of the 7 passes in an 8x8 area. The first is a single pixel in the top-left, and the seventh is every other row." width="400" height="400" loading="lazy" />
        <p>Each of the 7 images is loaded in sequence, adding more detail to the image as it is loaded. This sequence of images is called <a href="https://en.wikipedia.org/wiki/Adam7_algorithm">Adam7</a>.</p>
        <p>The data for each of the 7 images is stored after each other in the image file. If we take the example image and enable interlacing, here's the raw uncompressed image data:</p>
        <img src="https://smitop.com/fmat/png/inter-idat.png" alt="Same as the earlier skewed letter S, but there are multiple stacked on top of each other. The bottom half has 2, the third above that has 2 more, and above that it increasingly looks like random noise." width="256" height="256" />
        <p>Here are the 7 passes that we can extract from that image data, which look like downscaled versions of the image:</p>
        <div class="inter-passes">
            <!-- in-article text describes these well enough, so set null alt text -->
            <img src="https://smitop.com/fmat/png/inter-1.png" alt="" width="32" height="32" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-2.png" alt="" width="32" height="32" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-3.png" alt="" width="64" height="32" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-4.png" alt="" width="64" height="64" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-5.png" alt="" width="128" height="64" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-6.png" alt="" width="128" height="128" loading="lazy">
            <img src="https://smitop.com/fmat/png/inter-7.png" alt="" width="256" height="128" loading="lazy">
        </div>
        <p>Since some of those sub-images are rectangles but the actual image is square, there will be more details horizontally than vertically when loading, since apparenty horizontal detail is more important than vertical detail.</p>
    </div>
    <div>
        <h2>Bonus: bugs</h2>
        <p>Here's what you get when you have a bug in the Average filter that causes it to treat overflows incorrectly (the way integer overflow in filter value calculation is specified to be a bit different than the rest):</p>
        <img src="https://smitop.com/pngbug.png" alt="The example image, but it looks glitchy starting a quarter of the way down." width="256" height="256" loading="lazy">
    </div>
