function _1(md){return(
md`# Averaging hues`
)}

function _2(labelledLine){return(
labelledLine([[40, "red"], [300, "red"], [(40 + 300) / 2, "blue"]])
)}

function _gradientDef(svg){return(
function gradientDef(id) {
  return svg`
    <linearGradient id="hsl-line-${id}">
      ${Array(360).fill().map((_, i) => `<stop offset="${((i/360) * 100).toFixed(2)}%" stop-color="hsl(${i}deg, 100%, 50%)" />`)}
    </linearGradient>
  `;
}
)}

function _labelledLine(html,SIDE_LEN,LINE_HEIGHT,gradientDef,svg){return(
function labelledLine(points) {
  const id = Math.random().toString(36).split(".")[1];
  return html`
    <svg width="${SIDE_LEN}" height="${LINE_HEIGHT * 1.55}">
      <defs>${gradientDef(id)}</defs>
      ${points.map(([deg, color]) => {
          const x = (deg / 360) * SIDE_LEN;
          return svg`
            <line x1="${x}" y1="${LINE_HEIGHT * 0.3}" x2="${x}" y2=${LINE_HEIGHT} stroke="hsl(${deg}deg, 70%, 40%)"></line>
            <text x="${x - (deg.toString().length >= 3 ? 13 : 9)}" y="20" fill="hsl(${deg}deg, 45%, 40%)" font-family="&quot;Liberation Serif&quot;, serif">${deg}°</text>
          `;
      })}
      <rect x=0 y=${LINE_HEIGHT * 0.55} width=${SIDE_LEN} height=${LINE_HEIGHT} fill="url(#hsl-line-${id})" />
    </svg>
  `;
}
)}

function _5(md){return(
md`## The color wheel`
)}

function _6(colorWheel){return(
colorWheel()
)}

function _7(md){return(
md`## A simple way for averaging 2 hues
There's a simple way for finding a good average of 2 hues, but it doesn't generalize to more hues.`
)}

function _8(md){return(
md`On a wheel, there are *two* equidistant points from the two averaged numbers, shown in white. The one on the top of the circle is closer to the two inputs, and the other one is further from the two inputs. Here, the two averaged numbers are plotted in black, and the averages in white:`
)}

function _twoHueWheel(colorWheel,pieP1,pieP2,simpleAvg,oppositeAvg){return(
colorWheel(false, [[pieP1, true], [pieP2, true], [simpleAvg(pieP1, pieP2), false], [oppositeAvg(pieP1, pieP2), false]])
)}

function _10(md){return(
md`Try moving around the two black points.`
)}

function _pieP1(Inputs){return(
Inputs.range([0, 360], {label: "Point 1", step: 1, value: 40})
)}

function _pieP2(Inputs){return(
Inputs.range([0, 360], {label: "Point 2", step: 1, value:300})
)}

function _13(md){return(
md`The calculation for the two averages is simple: we can find one the usual way, by taking the average of the hues:`
)}

function _simpleAvg(){return(
function simpleAvg(p1, p2) {
  return (p1 + p2) / 2 }
)}

function _oppositeAvg(simpleAvg){return(
function oppositeAvg(p1, p2) {
  return (simpleAvg(p1, p2) + 180) % 360 }
)}

function _16(md){return(
md`## More than 2 hues`
)}

function _POINTS(){return(
[15, 105, 350]
)}

function _18(colorWheel,POINTS){return(
colorWheel(false, [[POINTS[0], true], [POINTS[1], true], [POINTS[2], true], [(POINTS[0] + POINTS[1] + POINTS[2]) / 3, false], [(((POINTS[0] + POINTS[1] + POINTS[2]) / 3) + 180) % 360, false]])
)}

function _19(md){return(
md`### 1. Make each hue a point on a circle`
)}

function _nCircStyle(html,phase,realifyCoords,avgPoint){return(
html`<style>
  .n-circ-explainer #unit-circle-points {
    opacity: ${phase > 1 ? 1 : 0} !important;
  }
  .n-circ-explainer #unit-circle-points-anim {
    opacity: ${phase > 1 ? 1 : 0} !important;
  }
  .n-circ-explainer #unit-circle-points-anim > circle {
    ${phase >= 3 ? `
      cx: ${realifyCoords(avgPoint)[0]}px;
      cy: ${realifyCoords(avgPoint)[1] + 12}px;
      fill: white;
      stroke-width: 4px;
    ` : ""}
    stroke: black;
    transition-duration: 0.5s;
    transition-property: cx, cy, fill, stroke-width;
  }
  .n-circ-explainer #unit-circle-avg-line {
    opacity: ${phase > 3 ? 1 : 0} !important;
  }
  .n-circ-explainer .unit-circle-phase {
    transition: 0.333s opacity;
  }
  /* only for blog post */
  #explainer-area li#explainer-phase-2 { color: ${phase >= 2 ? "black" : "inherit"} }
  #explainer-area li#explainer-phase-3 { color: ${phase >= 3 ? "black" : "inherit"} }
  #explainer-area li#explainer-phase-4 { color: ${phase >= 4 ? "black" : "inherit"} }
</style>`
)}

function _nCircExplainer(html,injectAnimation,genUnitCircle,unitCircleAngle,avgPoint,POINTS,unitCirclePoint,svg,ANIM_LENGTH,ANIM_LENGTH_WITH_GAP)
{
  const id = Math.random().toString(36).split(".")[1];
  return html`
    <svg width="310" height="300" viewBox="-10 -10 320 320" class="n-circ-explainer${injectAnimation.length ? "-autoanimated" : ""}">
      ${genUnitCircle(id)}
      <g id="unit-circle-avg-line" class="unit-circle-phase" style="opacity: 0">${unitCircleAngle(avgPoint)}</g>
      <g id="unit-circle-points" class="unit-circle-phase" style="opacity: 0">${POINTS.map(p => unitCirclePoint(p))}</g>
      <g id="unit-circle-points-anim" class="unit-circle-phase" style="opacity: 0">${POINTS.map(p => unitCirclePoint(p))}</g>
      <style>
     ${injectAnimation.length ? svg`
      <style>
        @keyframes phase2 {
          from, ${(((0.25 * ANIM_LENGTH) - 0.333) / ANIM_LENGTH_WITH_GAP) * 100}% {
            opacity: 0;
          }
          ${((0.25 * ANIM_LENGTH) / ANIM_LENGTH_WITH_GAP) * 100}%, to {
            opacity: 1;
          }
        }
        @keyframes phase4 {
          from, ${(((0.75 * ANIM_LENGTH) - 0.333) / ANIM_LENGTH_WITH_GAP) * 100}% {
            opacity: 0;
          }
          ${((0.75 * ANIM_LENGTH) / ANIM_LENGTH_WITH_GAP) * 100}%, to {
            opacity: 1;
          }
        }
        #unit-circle-points, #unit-circle-points-anim {
          animation-name: phase2;
        }
        #unit-circle-avg-line {
          animation-name: phase4;
        }
        .unit-circle-phase {
          animation-duration: ${ANIM_LENGTH_WITH_GAP}s;
          animation-iteration-count: infinite;
        }
      </style>
    ` : ""}
    </svg>
  `;
}


function _advanceButton(Inputs){return(
Inputs.button("Next")
)}

function _phase(advanceButton){return(
(advanceButton % 4) + 1
)}

function _injectAnimation(Inputs){return(
Inputs.checkbox(["Inject animation CSS"])
)}

function _ANIM_LENGTH(){return(
10
)}

function _ANIM_LENGTH_WITH_GAP(){return(
11
)}

function _genUnitCircle(svg){return(
function genUnitCircle(id) {
  // const bg = "conic-gradient(hsl(0deg, 100%, 50%), hsl(120deg, 100%, 50%), hsl(240deg, 100%, 50%), hsl(360deg, 100%, 50%))";
  const bg = `conic-gradient(${Array(360*2).fill().map((_, i) => `hsl(${i/2}deg, 100%, 50%)`).join(",")})`;
  return svg`
    <!-- unit circle: https://css-tricks.com/my-struggle-to-use-and-animate-a-conic-gradient-in-svg/ -->
    <foreignObject x="0" y="0" height="1000" width="1000">
      <div xmlns="http://www.w3.org/1999/xhtml" style="background: ${bg}; border-radius:50%; width: 300px; height: 300px;"></div>
    </foreignObject>

    <line x1=150 y1=150 x2=150 y2=0 stroke=black stroke-width=6 /> <!-- radius line -->
    <text x="130" y="95" font-family="&quot;Liberation Serif&quot;, serif" fill="white">1</text> <!-- radius number -->
    <circle cx="150" cy="150" r="7" fill="black" /> <!-- center circle -->
  `;
}
)}

function _28(md){return(
md`### 2. Find the average point`
)}

function _avgPoint(averagePointFromAngles,POINTS){return(
averagePointFromAngles(POINTS)
)}

function _30(md){return(
md`### 3. Find the angle of the average point`
)}

function _unitCircleAngle(realifyCoords,svg){return(
function unitCircleAngle(abstractCoords) {
  const ANGLE_AMOUNT = 0.45;
  const coords = realifyCoords(abstractCoords);
  let circleStartCoords = realifyCoords(abstractCoords.map(c => c * ANGLE_AMOUNT));
  circleStartCoords[0] += 7
  const lineLen = Math.hypot(...abstractCoords);
  const circleEndCoords = [150, 150 - ANGLE_AMOUNT*(lineLen * 150)];
  const textCoords = circleStartCoords.map((c, i) => (c + circleEndCoords[i]) / 2);
  return svg`
    <line x1=150 y1=153 x2=${coords[0]} y2=${coords[1] + 12} stroke=black stroke-width=6 />
    <path d="M ${circleStartCoords.map(c => c.toFixed(2)).join(",")} A ${circleEndCoords.map(c => c.toFixed(2)).join(",")} 360 0 0 ${circleEndCoords.map(c => c.toFixed(2)).join(",")}" stroke="black" stroke-width=3.5 />
    <text x=${textCoords[0] - 3} y=${textCoords[1] - 6} font-family="&quot;Liberation Serif&quot;, serif" fill="white">θ</text>
  `;
 }
)}

function _32(md){return(
md`## Calculating the circular average`
)}

function _33(tex){return(
tex`
\displaystyle
\text{avg}(l) = \text{atan2}\left(\frac{\sum_i{\text{sin}{(l_i)}}}{\text{len}(l)}, \frac{\sum_i{\text{cos}{(l_i)}}}{\text{len}(l)}\right)
`
)}

function _34(md){return(
md`## Appendix`
)}

function _SIDE_LEN(){return(
400
)}

function _LINE_HEIGHT(SIDE_LEN){return(
SIDE_LEN * 0.2
)}

function _colorWheel(DOM,SIDE_LEN,LINE_HEIGHT,distance,rad2deg,hsl2rgb){return(
function colorWheel(line = false, pois = []) {
  // line = true currently never happens
  const ctx = DOM.context2d(SIDE_LEN, line ? LINE_HEIGHT : SIDE_LEN);
  const imageData = new ImageData(SIDE_LEN, line ? LINE_HEIGHT : SIDE_LEN);

  const HALF_SL = SIDE_LEN / 2;
  const center = [HALF_SL, HALF_SL];
  for (let x = 0; x < ctx.canvas.width; x++) {
    for (let y = 0; y < ctx.canvas.height; y++) {
      const point = [x, y];
      const hypLen = distance(point, center);

      let color;
      const circleStart = Math.floor(HALF_SL*0.5);
      const circleEnd = Math.floor(HALF_SL);
      if (line || ((hypLen < circleEnd) && (hypLen >= circleStart))) {
        let theta;
        if (line) {
          theta = (x / SIDE_LEN) * 360;
        } else {
          const adjLen = distance([center[0], y], center);
          theta = Math.acos(adjLen / hypLen);
          if (isNaN(theta)) continue;
          theta = rad2deg(theta);
          if (x >= HALF_SL && y >= HALF_SL) theta = 180 - theta;
          else if (x <= HALF_SL && y >= HALF_SL) theta = 180 + theta;
          else if (x <= HALF_SL && y <= HALF_SL) theta = 360 - theta;
        }
        color = [theta, 1, 0.5];
        if (pois.length > 0) {
          let [poiDistance, poi] = pois
            .map(poi => [Math.abs(poi[0] - theta), poi])
            .sort(([a], [b]) => a - b)[0];
          const poiDistThresh = Math.ceil(SIDE_LEN * 0.003);
          if (poiDistance <= poiDistThresh) {
            const antiAliasAmount = Math.min(1, poiDistThresh - poiDistance)*0.8;
            if (antiAliasAmount < 0) throw new Error("unreachable");
            color[2] = poi[1] ? (1 - antiAliasAmount)*color[2] : 1-(1 - antiAliasAmount)*color[2];
          }
        }

        // anti-alias circle edges
        let alpha = 255;
        const innerCircleAmount = hypLen - circleStart;
        const outerCircleAmount = circleEnd - hypLen;
        if (!line && innerCircleAmount < 1) {
          alpha = 255 * innerCircleAmount;
        }
        if (!line && outerCircleAmount < 1) {
          alpha = 255 * outerCircleAmount;
        }
        
        color = [...hsl2rgb(color), alpha];
      } else {
        color = [255, 255, 255, 0];
      }

      const offset = (y * SIDE_LEN * 4) + (x * 4);
      imageData.data[offset] = color[0];
      imageData.data[offset + 1] = color[1];
      imageData.data[offset + 2] = color[2];
      imageData.data[offset + 3] = color[3]; // alpha
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return ctx.canvas;
}
)}

function _hsl2rgb(){return(
function hsl2rgb([h,s,l])  {
  // https://stackoverflow.com/a/64090995/10113238
  let a =s*Math.min(l,1-l);
  let f = (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0)*255,f(8)*255,f(4)*255];
}
)}

function _distance(){return(
function distance([x1, y1], [x2, y2]) {
  return Math.hypot(x1 - x2, y1 - y2);
}
)}

function _rad2deg(){return(
function rad2deg(deg) {
  return deg * (180 / Math.PI);
}
)}

function _deg2rad(){return(
function deg2rad(deg) {
  return deg / (180 / Math.PI);
}
)}

function _averagePoint(){return(
function averagePoint(points) {
  let x = 0;
  let y = 0;
  points.forEach(([pX, pY]) => {
    x += pX;
    y += pY;
  })
  return [x, y].map(val => val /= points.length);
}
)}

function _averagePointFromAngles(averagePoint,deg2rad){return(
function averagePointFromAngles(angles) {
  return averagePoint(angles.map(angle => {
    const rad = deg2rad(angle - 90);
    return [Math.cos(rad), Math.sin(rad)];
  }));
}
)}

function _realifyCoords(){return(
function realifyCoords(coords) {
  const width = (300 / 2);
  return coords.map(v => v * width + width);
}
)}

function _unitCirclePoint(deg2rad,realifyCoords,svg){return(
function unitCirclePoint(coords, calcCoords = true, color = "black") {
  if (calcCoords) {
    const rad = deg2rad(coords - 90);
    coords = [Math.cos(rad), Math.sin(rad)]
  }
  coords = realifyCoords(coords);
  return svg`
    <circle cx=${coords[0]} cy=${coords[1]} r="12" fill="${color}" />
  `;
}
)}

function _46(htl){return(
htl.html`<style>
  form {
    width: 100% !important;
  }
  form input[type=number] {
    width: 6rem;
  }
</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["labelledLine"], _2);
  main.variable(observer("gradientDef")).define("gradientDef", ["svg"], _gradientDef);
  main.variable(observer("labelledLine")).define("labelledLine", ["html","SIDE_LEN","LINE_HEIGHT","gradientDef","svg"], _labelledLine);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["colorWheel"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("twoHueWheel")).define("twoHueWheel", ["colorWheel","pieP1","pieP2","simpleAvg","oppositeAvg"], _twoHueWheel);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof pieP1")).define("viewof pieP1", ["Inputs"], _pieP1);
  main.variable(observer("pieP1")).define("pieP1", ["Generators", "viewof pieP1"], (G, _) => G.input(_));
  main.variable(observer("viewof pieP2")).define("viewof pieP2", ["Inputs"], _pieP2);
  main.variable(observer("pieP2")).define("pieP2", ["Generators", "viewof pieP2"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("simpleAvg")).define("simpleAvg", _simpleAvg);
  main.variable(observer("oppositeAvg")).define("oppositeAvg", ["simpleAvg"], _oppositeAvg);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("POINTS")).define("POINTS", _POINTS);
  main.variable(observer()).define(["colorWheel","POINTS"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("nCircStyle")).define("nCircStyle", ["html","phase","realifyCoords","avgPoint"], _nCircStyle);
  main.variable(observer("nCircExplainer")).define("nCircExplainer", ["html","injectAnimation","genUnitCircle","unitCircleAngle","avgPoint","POINTS","unitCirclePoint","svg","ANIM_LENGTH","ANIM_LENGTH_WITH_GAP"], _nCircExplainer);
  main.variable(observer("viewof advanceButton")).define("viewof advanceButton", ["Inputs"], _advanceButton);
  main.variable(observer("advanceButton")).define("advanceButton", ["Generators", "viewof advanceButton"], (G, _) => G.input(_));
  main.variable(observer("phase")).define("phase", ["advanceButton"], _phase);
  main.variable(observer("viewof injectAnimation")).define("viewof injectAnimation", ["Inputs"], _injectAnimation);
  main.variable(observer("injectAnimation")).define("injectAnimation", ["Generators", "viewof injectAnimation"], (G, _) => G.input(_));
  main.variable(observer("ANIM_LENGTH")).define("ANIM_LENGTH", _ANIM_LENGTH);
  main.variable(observer("ANIM_LENGTH_WITH_GAP")).define("ANIM_LENGTH_WITH_GAP", _ANIM_LENGTH_WITH_GAP);
  main.variable(observer("genUnitCircle")).define("genUnitCircle", ["svg"], _genUnitCircle);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("avgPoint")).define("avgPoint", ["averagePointFromAngles","POINTS"], _avgPoint);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("unitCircleAngle")).define("unitCircleAngle", ["realifyCoords","svg"], _unitCircleAngle);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["tex"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("SIDE_LEN")).define("SIDE_LEN", _SIDE_LEN);
  main.variable(observer("LINE_HEIGHT")).define("LINE_HEIGHT", ["SIDE_LEN"], _LINE_HEIGHT);
  main.variable(observer("colorWheel")).define("colorWheel", ["DOM","SIDE_LEN","LINE_HEIGHT","distance","rad2deg","hsl2rgb"], _colorWheel);
  main.variable(observer("hsl2rgb")).define("hsl2rgb", _hsl2rgb);
  main.variable(observer("distance")).define("distance", _distance);
  main.variable(observer("rad2deg")).define("rad2deg", _rad2deg);
  main.variable(observer("deg2rad")).define("deg2rad", _deg2rad);
  main.variable(observer("averagePoint")).define("averagePoint", _averagePoint);
  main.variable(observer("averagePointFromAngles")).define("averagePointFromAngles", ["averagePoint","deg2rad"], _averagePointFromAngles);
  main.variable(observer("realifyCoords")).define("realifyCoords", _realifyCoords);
  main.variable(observer("unitCirclePoint")).define("unitCirclePoint", ["deg2rad","realifyCoords","svg"], _unitCirclePoint);
  main.variable(observer()).define(["htl"], _46);
  return main;
}
