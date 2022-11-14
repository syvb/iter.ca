+++
date = "2022-11-13T21:00:00Z"
description = "Averaging hues is weird, you can't just take a normal average"
tags = ["programming", "math"]
title = "How to average hues"
toc = 1
image = "post/hue-avg/cover.png"
image_alt = "A color line with two points and their average"
+++

Recently I needed some software to be able to average the hues in some [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) colors to find the hue between them. My first attempt was simple: just treat the hues as a number from 0° to 360° and average them. That approach did not work as I expected. The solution was to take a [circular mean](https://en.wikipedia.org/wiki/Circular_mean); this post will explain that.

Here's what a naive arithmetic mean would look like for averaging 40° and 300°. The average of two numbers is always equidistant between those two numbers, so the average sits right in the middle of the two averaged numbers:

<img src="color-line-avg.svg" width="400" alt="A color line with points indicated at 40° and 300°, and their average shown exactly between them at 170°">

That averaged color doesn't look right. We averaged <span style="color: hsl(40deg, 70%, 33%)">orange</span> and <span style="color: hsl(300deg, 70%, 33%)">magenta</span> but got a <span style="color: hsl(170deg, 70%, 33%)">greenish cyan</span>. Something like <span style="color: hsl(350deg, 65%, 50%)">red</span> would have been a better in-between color.

## The color wheel

The issue with our averaging scheme is that it treats colors on the left and right side as being far apart, when in reality the color line loops around. It's really a wheel:

<img src="color-wheel.png" width="300" alt="A color wheel">

## A simple way to average 2 hues
There's a simple way to find a good average of 2 hues, but it doesn't work for more than two:

<details>
<summary>Expand</summary>

On a wheel, there are *two* equidistant points from the two averaged numbers, shown in white. The one on the top of the circle is closer to the two inputs, and the other is further from the two inputs. Here, the two averaged numbers are plotted in black, and the averages in white:

<div id="observablehq-twoHueWheel-47b658f5"></div>
<div id="observablehq-viewof-pieP1-47b658f5"></div>
<div id="observablehq-viewof-pieP2-47b658f5"></div>
<noscript>
  <img src="color-wheel-2-points.png" alt="A color wheel with two points. There are two average points on opposite sides of the circle, both between the two averaged points.">
</noscript>

The calculation for the two averages is simple: we can find one the usual way, by taking the average of the hues:

```js
function simpleAvg(p1, p2) {
  return (p1 + p2) / 2 }
```

And rotate the first average by 180° to get the second one:

```js
function oppositeAvg(p1, p2) {
  return (simpleAvg(p1, p2) + 180) % 360 }
```
We can use the average closest to the points as our average hue.

</details>
<br>

## More than 2 hues

Here's a color wheel with three values (in black) to average:

<img src="color-wheel-3-points.png" width="300" alt="A color wheel with three values in black, and two averages in white">

The two values in white are derived from the arithmetic average of all three hues. None of them look right.

We can take a [circular mean](https://en.wikipedia.org/wiki/Circular_mean) to find a hue that does look right. Here's the process to find one (click it to advance the current step):

<div id="explainer-area">
  <div>
    <div id="observablehq-nCircExplainer-b1c5a5c2"></div>
    <div id="observablehq-nCircStyle-b1c5a5c2"></div>
    <noscript>
      <img src="nCircExplainer.svg" alt="">
    </noscript>
  </div>
  <div id="explainer-side">
    <ol id="explainer-step-list">
      <li id="explainer-phase-2">
        <div class="explainer-phase-name">Make each hue a point on the circle</div>
        <div class="explainer-phase-details">Each angle is converted into a point on a circle.</div>
      </li>
      <li id="explainer-phase-3">
        <div class="explainer-phase-name">Find the average point</div>
        <div class="explainer-phase-details">The X and Y values of the points on the circle are averaged to find an average point.</div>
      </li>
      <li id="explainer-phase-4">
        <div class="explainer-phase-name">Find the angle of the average point</div>
        <div class="explainer-phase-details">The angle of the average point is the circular average.</div>
      </li>
    </ol>
    <button id="explainer-next" style="display: none">Next</button>
  </div>
</div>
<script type="module" async>
import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import define from "./nb.js";
window.obsModule = new Runtime().module(define, name => {
  if (name === "nCircExplainer") return new Inspector(document.querySelector("#observablehq-nCircExplainer-b1c5a5c2"));
  if (name === "nCircStyle") return new Inspector(document.querySelector("#observablehq-nCircStyle-b1c5a5c2"));
  if (name === "twoHueWheel") return new Inspector(document.querySelector("#observablehq-twoHueWheel-47b658f5"));
  if (name === "viewof pieP1") return new Inspector(document.querySelector("#observablehq-viewof-pieP1-47b658f5"));
  if (name === "viewof pieP2") return new Inspector(document.querySelector("#observablehq-viewof-pieP2-47b658f5"));
  return ["phase"].includes(name);
});
// script is after element so it will always exist by now
const nextBtn = document.getElementById("explainer-next");
async function advancePhase() {
  (await obsModule.value("viewof advanceButton")).children[0].click();
  const phase = await obsModule.value("phase");
  nextBtn.textContent = phase === 4 ? "Reset" : "Next";
}
document.getElementById("explainer-area").addEventListener("click", advancePhase);
document.getElementById("explainer-step-list").style.color = "#5d5d5d";
document.getElementById("explainer-next").style.display = "block";
</script>
<style>
  #explainer-area {
    display: flex;
    cursor: pointer;
    margin-bottom: 0.5em;
  }
  #explainer-area li {
    margin-top: 0.5em;
    transition: 0.333s color; 
  }
  #explainer-area li > .explainer-phase-details {
    margin-left: 1rem;
  }
  #explainer-area li > .explainer-phase-name {
    font-weight: 500;
  }
  #explainer-next {
    margin-left: 2rem;
  }
  @media (max-width: 800px) {
    #explainer-area {
      display: block;
      margin-bottom: 1em;
    }
  }
</style>

By treating the colors as 2D points and finding the point between them all on the color wheel, we get a much better average.

## Calculating the circular average

 Here's how we could implement that in JavaScript (all angles are in radians since that's what the JS trigonometric functions use):
```js
function hueAverage(hues) {
  // Convert each hue to a point on the unit circle
  const points = hues.map(hue => [Math.cos(hue), Math.sin(hue)]);

  // Find the average point
  const averagePoint = [
    points.reduce((prev, cur) => prev + cur[0], 0) / points.length, // x
    points.reduce((prev, cur) => prev + cur[1], 0) / points.length, // y
  ];

  // Get the angle of the average point
  return Math.atan2(averagePoint[1], averagePoint[0]);
}

hueAverage([Math.PI/6, 2*Math.PI - Math.PI/6]) // -> almost 0
```

`hueAverage` can be optimized a bit by [seperating the calculation of the x and y averages](https://stackoverflow.com/a/8170595/10113238).

Here's a mathematical formula that finds the circular average:

<!-- taken from rendered KaTeX in notebook -->
<math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mstyle scriptlevel="0" displaystyle="true"><mtext>avg</mtext><mo stretchy="false">(</mo><mi>l</mi><mo stretchy="false">)</mo><mo>=</mo><mtext>atan2</mtext><mrow><mo fence="true">(</mo><mfrac><mrow><munder><mo>∑</mo><mi>i</mi></munder><mrow><mtext>sin</mtext><mrow><mo stretchy="false">(</mo><msub><mi>l</mi><mi>i</mi></msub><mo stretchy="false">)</mo></mrow></mrow></mrow><mrow><mtext>len</mtext><mo stretchy="false">(</mo><mi>l</mi><mo stretchy="false">)</mo></mrow></mfrac><mo separator="true">,</mo><mfrac><mrow><munder><mo>∑</mo><mi>i</mi></munder><mrow><mtext>cos</mtext><mrow><mo stretchy="false">(</mo><msub><mi>l</mi><mi>i</mi></msub><mo stretchy="false">)</mo></mrow></mrow></mrow><mrow><mtext>len</mtext><mo stretchy="false">(</mo><mi>l</mi><mo stretchy="false">)</mo></mrow></mfrac><mo fence="true">)</mo></mrow></mstyle></mrow></semantics></math>

`Math.atan2` is a cool function. It takes a (x,y) point, and tells you what angle around the unit circle the point is. Here's [a nice illustration](https://commons.wikimedia.org/wiki/File:Atan2definition.svg): 
<img src="/ext/Atan2definition.svg" width="300" alt="A plane with an (x,y) point. The angle between the point and the x axis is shown as atan2(y,x)">

Keep in mind that the arguments are opposite the usual order, since `atan2` is a generalization of `atan(y/x)` that works when `x` or `y` is negative.

## Further reading
- The [source code for the illustrations in this post](https://observablehq.com/@smitop/averaging-hues).
- The [spherical mean](https://en.wikipedia.org/wiki/Spherical_mean) generalises the circular mean into 3 dimensions. Can you generalise even further to find the hyperspherical mean in any for an *n*-sphere in any dimension? No idea.
