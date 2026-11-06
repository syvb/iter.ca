(() => {
  const root = document.documentElement;
  const motion = root.classList.contains('motion');
  const $ = (s) => document.querySelector(s);
  const wm = $('#wm'), home = $('#wm-home'), dot = $('#wm .dot'), bl = $('#wm .bl'), bar = $('.bar');
  const slotCorner = $('#slot-corner'), slotFoot = $('#slot-foot');
  const cOct = $('#oct'), cGlow = $('#glow');
  // the wordmark is painted in its slot until now; from here it floats over the page (placed by layout() before the next paint)
  if (motion) document.body.insertBefore(wm, $('main'));

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpS = (A, B, t, o) => { o.x = lerp(A.x, B.x, t); o.y = lerp(A.y, B.y, t); o.s = lerp(A.s, B.s, t); return o; };
  // the wordmark's current transform and its letters' layout boxes, shared with the letter physics below so neither
  // has to read layout (getBoundingClientRect) every frame; letters dodge/jump with their own transforms (FXwm.L)
  // t: the latest animation frame's timestamp, so a loop that slept resumes with the same first step it would have taken running
  const FXwm = window.FXwm = { x: 0, y: 0, s: 1, ch: [], L: null, wake: null, t: undefined };

  // ---------- WebGL setup ----------
  // no multisampling on the full-window canvas: only the gem needs it, so it is drawn multisampled into a small buffer around
  // itself and resolved into place (see the frame), instead of clearing and resolving a window-sized 4x buffer every frame
  const opts = { alpha: true, premultipliedAlpha: true, antialias: false };
  const go = cOct.getContext('webgl2', opts);
  const gg = cGlow.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!go || !gg) { root.classList.add('no-gl'); }

  function program(g, vs, fs) {
    const mk = (type, src) => { const s = g.createShader(type); g.shaderSource(s, src); g.compileShader(s);
      if (!g.getShaderParameter(s, g.COMPILE_STATUS)) throw new Error(g.getShaderInfoLog(s)); return s; };
    const p = g.createProgram(); g.attachShader(p, mk(g.VERTEX_SHADER, vs)); g.attachShader(p, mk(g.FRAGMENT_SHADER, fs)); g.linkProgram(p);
    if (!g.getProgramParameter(p, g.LINK_STATUS)) throw new Error(g.getProgramInfoLog(p));
    const u = {}; const n = g.getProgramParameter(p, g.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const name = g.getActiveUniform(p, i).name; u[name] = g.getUniformLocation(p, name); }
    return { p, u };
  }
  const QUAD_VS = `#version 300 es
  in vec2 aP; void main(){ gl_Position = vec4(aP, 0., 1.); }`;
  function quad(g) { const b = g.createBuffer(); g.bindBuffer(g.ARRAY_BUFFER, b);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), g.STATIC_DRAW); return b; }

  // Palette shared by the octahedron and the glow ribbon (sampled from the avatar).
  const PAL_GLSL = `
  vec3 pal(float x){
    x = fract(x);
    vec3 c0=vec3(.906,0.,.808), c1=vec3(.643,0.,.91), c2=vec3(.27,.0,.906), c3=vec3(0.,.906,.906), c4=vec3(.184,.906,0.), c5=vec3(.906,.81,0.);
    if(x<.18) return mix(c0,c1,x/.18);
    if(x<.34) return mix(c1,c2,(x-.18)/.16);
    if(x<.52) return mix(c2,c3,(x-.34)/.18);
    if(x<.68) return mix(c3,c4,(x-.52)/.16);
    if(x<.84) return mix(c4,c5,(x-.68)/.16);
    return mix(c5,c0,(x-.84)/.16);
  }`;

  let O = null, G = null;
  if (go && gg) {
    // ----- octahedron -----
    const V = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    const C = [
      [0.00, 0.93, 0.95], // +x cyan
      [0.93, 0.05, 0.80], // -x magenta
      [1.00, 1.00, 1.00], // +y white
      [0.25, 0.92, 0.10], // -y green
      [0.97, 0.90, 0.10], // +z yellow
      [0.55, 0.20, 1.00], // -z violet
    ];
    const F = [];
    for (const xi of [0, 1]) for (const yi of [2, 3]) for (const zi of [4, 5]) F.push([xi, yi, zi]);
    const data = [];
    for (const f of F) {
      const n = [V[f[0]][0] + V[f[1]][0] + V[f[2]][0], V[f[0]][1] + V[f[1]][1] + V[f[2]][1], V[f[0]][2] + V[f[1]][2] + V[f[2]][2]].map(v => v / Math.sqrt(3));
      f.forEach((vi, k) => { data.push(...V[vi], ...C[vi], k === 0 ? 1 : 0, k === 1 ? 1 : 0, k === 2 ? 1 : 0, ...n); });
    }
    const OVS = `#version 300 es
    in vec3 aPos; in vec3 aCol; in vec3 aBary; in vec3 aNrm;
    uniform mat3 uR; uniform vec2 uC; uniform float uS; uniform vec2 uRes;
    out vec3 vCol; out vec3 vB; out float vF; out float vL;
    const float CAM = 3.4;
    void main(){
      vec3 p = uR * aPos; vec3 n = uR * aNrm;
      float f = CAM / (CAM - p.z);
      vec2 sp = uC + vec2(p.x, -p.y) * f * uS;
      gl_Position = vec4(sp.x / uRes.x * 2. - 1., 1. - sp.y / uRes.y * 2., -p.z * .2, 1.);
      vCol = aCol; vB = aBary;
      vF = dot(n, vec3(0., 0., CAM) - p);
      vL = dot(n, normalize(vec3(-.4, .6, .8)));
    }`;
    const OFS = `#version 300 es
    precision highp float;
    in vec3 vCol; in vec3 vB; in float vF; in float vL;
    uniform int uPass; uniform float uEdge;
    out vec4 o;
    void main(){
      if (uPass == 0 && vF > 0.) discard;
      if (uPass == 1 && vF <= 0.) discard;
      float e = min(min(vB.x, vB.y), vB.z);
      float w = fwidth(e) * 1.2;
      float m = smoothstep(uEdge - w, uEdge + w, e);
      vec3 col = vCol;
      if (uPass == 0) {
        o = vec4(mix(vec3(.02), col * .5, m), 1.);
      } else {
        float shade = .78 + .3 * clamp(vL, 0., 1.);
        vec3 c = col * shade + vec3(.06) * (1. - e * 2.);
        float a = mix(1., .8, m);
        vec3 edge = vec3(.035, .03, .045);
        o = vec4(mix(edge, c, m) * a, a);
      }
    }`;
    const HFS = `#version 300 es
    precision highp float;
    uniform vec2 uC; uniform float uS; uniform float uH; uniform float uPh; uniform float uDpr; uniform vec2 uOff;
    out vec4 o;
    ${PAL_GLSL}
    void main(){
      vec2 p = (gl_FragCoord.xy + uOff) / uDpr; // css px, y up (uOff: where the gem's buffer sits in the canvas)
      vec2 d = (p - uC) / (uS * 2.4);
      float r = length(d);
      float g = exp(-r * r * 3.2) * uH;
      float ang = atan(d.y, d.x) / 6.2831853;
      vec3 c = pal(ang + uPh) * g * .55;
      o = vec4(c, 0.);  // additive (premultiplied, alpha 0)
    }`;
    const pr = program(go, OVS, OFS);
    const ph = program(go, QUAD_VS, HFS);
    const buf = go.createBuffer(); go.bindBuffer(go.ARRAY_BUFFER, buf); go.bufferData(go.ARRAY_BUFFER, new Float32Array(data), go.STATIC_DRAW);
    const vao = go.createVertexArray(); go.bindVertexArray(vao);
    const stride = 12 * 4;
    [['aPos', 0], ['aCol', 3], ['aBary', 6], ['aNrm', 9]].forEach(([name, off]) => {
      const loc = go.getAttribLocation(pr.p, name); go.enableVertexAttribArray(loc); go.vertexAttribPointer(loc, 3, go.FLOAT, false, stride, off * 4);
    });
    const hvao = go.createVertexArray(); go.bindVertexArray(hvao); quad(go);
    const hl = go.getAttribLocation(ph.p, 'aP'); go.enableVertexAttribArray(hl); go.vertexAttribPointer(hl, 2, go.FLOAT, false, 0, 0);
    go.bindVertexArray(null);
    go.enable(go.BLEND); go.blendFunc(go.ONE, go.ONE_MINUS_SRC_ALPHA);
    // the gem's multisampled buffer (4 samples, like the antialiased canvas it replaces), just big enough for the gem; grown
    // on demand. A multisampled blit can't move pixels (and some GPUs resolve the whole buffer), so it resolves into a
    // same-sized plain buffer, which is then copied into place
    const fbo = go.createFramebuffer(), rb = go.createRenderbuffer(), fbo1 = go.createFramebuffer(), rb1 = go.createRenderbuffer();
    O = { pr, ph, vao, hvao, fbo, rb, fbo1, rb1, samples: Math.min(4, go.getParameter(go.MAX_SAMPLES)), capW: 0, capH: 0 };

    // ----- glow ribbon -----
    const GFS = `#version 300 es
    precision highp float;
    uniform vec2 uRes; uniform float uT; uniform float uAmt; uniform float uPh; uniform float uHero; uniform float uWave; uniform float uMask; uniform vec3 uWk[7];
    uniform vec3 uM; uniform vec4 uRp[4]; uniform float uFoc;
    out vec4 o;
    ${PAL_GLSL}
    float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p){ float a = .5, s = 0.; for (int i = 0; i < 4; i++) { s += a * vn(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p; a *= .5; } return s; }
    void main(){
      vec2 p = gl_FragCoord.xy;
      vec2 uv = p / uRes;
      float asp = uRes.x / uRes.y;
      float x = uv.x * asp;
      vec3 col = vec3(0.);
      vec2 m = uM.xy / uRes; float mx = m.x * asp;
      float rip = 0.;
      for (int k = 0; k < 4; k++) {   // ripples add up; each eases in, so a new click never replaces an old one
        vec4 R = uRp[k];
        if (R.w == 0.) continue;      // unused slot: adds exactly 0
        float rr = length(vec2((uv.x - R.x / uRes.x) * asp, uv.y - R.y / uRes.y));
        float env = smoothstep(0., .35, R.z) * exp(-R.z * 1.4);
        rip += R.w * env * sin(rr * 34. - R.z * 10.) * exp(-rr * 2.2) * .06;
      }
      if (uWave > 0.) {   // ribbons only near the footer (scaled by uWave, so skipping them at 0 changes nothing); the cursor glow below stays everywhere
        float pull = exp(-pow((x - mx) * 2.6, 2.)) * uM.z;
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          float yc = .1 + .028 * fi
            + .055 * sin(x * (1.1 + fi * .23) + uT * (.32 + .07 * fi) + fi * 1.9 + uPh * 2.)
            + .022 * sin(x * (3.7 - fi * .3) - uT * (.5 + .05 * fi) + fi);
          yc += (clamp(m.y, 0., .6) - yc) * pull * (.55 - .07 * fi) + rip * (1. + .3 * fi);
          float th = .010 + .016 * (.5 + .5 * sin(x * 1.7 + uT * .4 + fi * 2.3));
          float d = (uv.y - yc) / th;
          float g = exp(-d * d) + .22 * exp(-abs(d) * .28);
          col += pal(uv.x * .6 + fi * .08 + uPh + uT * .015) * g * (.62 - .08 * fi);
        }
        col += pal(uv.x * .5 + uPh + .3) * .16 * smoothstep(.32, 0., uv.y);
        col *= uWave;
      }
      vec2 dm = vec2((uv.x - m.x) * asp, uv.y - m.y);
      float foc = 1. + 3. * uFoc;                           // pressing narrows the cursor glow in on the click point
      if (uM.z > 0.) col += pal(m.x + uPh + uT * .05) * (.5 + .25 * uFoc) * exp(-dot(dm, dm) * 60. * foc) * uM.z;   // no pointer (touch): adds exactly 0
      col *= uAmt;
      if (uHero > .003) {   // whole page: a drifting "loss landscape" — domain-warped terrain drawn as marching contour lines
        vec2 fp = vec2(x, uv.y) * 1.9;
        float wk = 0.;
        if (uMask > .003) {   // wake: a moving wordmark letter stirs ripples into the terrain
          for (int k = 0; k < 7; k++) { vec3 W = uWk[k]; if (W.z < .002) continue;
            float rr = length(vec2((uv.x - W.x) * asp, uv.y - W.y));
            wk += W.z * sin(rr * 46. - uT * 9.) * exp(-rr * 5.) * smoothstep(0., .04, rr); }
          wk *= uMask;
        }
        vec2 w = vec2(fbm(fp + vec2(0., uT * .05)), fbm(fp + vec2(5.2, 1.3) - uT * .04));
        float f = fbm(fp + 2.1 * w + vec2(uT * .02, 0.));
        if (uM.z > 0.) f += (.3 + .1 * uFoc) * exp(-dot(dm, dm) * 12. * foc) * uM.z;   // the cursor raises a peak; its contours ring around it (tighter while pressed)
        float fill = smoothstep(.55, .85, f) * .06;
        f += rip * 1.6 + wk * .14;                            // clicks (and moving letters) send rings through the terrain
        float lv = f * 11. - uT * .25;                        // contour levels march slowly downhill
        float e = abs(fract(lv) - .5) * 2.;                   // 1 on a contour line
        float wid = fwidth(lv) * 1.4;
        float line = smoothstep(1. - wid * 2.2, 1., e);
        float major = mod(floor(lv + .5), 4.) < .5 ? 1. : .55;  // every 4th line brighter
        float edge = (asp < 1. ? mix(.3, .9, smoothstep(.74, .9, uv.y)) : mix(.42, 1., smoothstep(.36, .62, uv.y)));
        edge = mix(1., edge, uMask);  // bold around the wordmark, calmer behind the text below it (first screen only)
        vec3 hc = pal(f * .9 + w.x * .6 + uPh + uT * .02);
        col += hc * (line * major * .5 + fill) * edge * uHero;
      }
      // 4x4 Bayer matrix (0 8 2 10 / 12 4 14 6 / 3 11 1 9 / 15 7 13 5) from bits, without an indexed const array
      ivec2 q4 = ivec2(p) & 3, q1 = q4 & 1, q2 = q4 >> 1;
      float b = float(4 * (((q1.x ^ q1.y) << 1) | q1.y) + (((q2.x ^ q2.y) << 1) | q2.y)) / 16.;
      vec3 q = clamp(floor(col * 4. + b) / 4., 0., 1.);
      float a = max(q.r, max(q.g, q.b));
      o = vec4(q, a);
    }`;
    const pg = program(gg, QUAD_VS, GFS);
    const gvao = gg.createVertexArray(); gg.bindVertexArray(gvao); quad(gg);
    const gl = gg.getAttribLocation(pg.p, 'aP'); gg.enableVertexAttribArray(gl); gg.vertexAttribPointer(gl, 2, gg.FLOAT, false, 0, 0);
    G = { pg, gvao };
  }

  // ---------- wordmark height map (blurred letters, quarter res) for the loss landscape ----------
  // per-letter motion energy (how fast each wordmark letter is moving), for the wake ripples
  const chs = [...wm.querySelectorAll('.ch')], wake = chs.map(() => ({ x: 0, y: 0, e: 0, init: false }));
  function stepWake(dt) {
    // letter centers from the cached layout (FXwm.ch) and the current transforms, instead of reading layout each frame
    chs.forEach((el, i) => { const c = FXwm.ch[i], l = FXwm.L && FXwm.L[i], W = wake[i];
      const cx = motion ? FXwm.x + FXwm.s * (c.x + (l ? l.tx : 0)) : c.x - scrollX, cy = motion ? FXwm.y + FXwm.s * (c.y + (l ? l.ty : 0)) : c.y - scrollY;
      const v = W.init ? Math.hypot(cx - W.x, cy - W.y) / Math.max(dt, 1e-3) : 0; W.x = cx; W.y = cy; W.init = true;
      // two chained easings (an S-curve): a letter launched by a click ramps its ripples in instead of popping them on
      const T = Math.min(1, v / 900); W.t = (W.t || 0) + (T - (W.t || 0)) * (1 - Math.exp(-dt * (T > (W.t || 0) ? 6 : 1.6)));
      W.e += (W.t - W.e) * (1 - Math.exp(-dt * 4)); });
  }

  // ---------- layout ----------
  let vw, vh, dpr, fs = 100, dotX = 0, dotY = 0, homeTop = 0, homeLeft = 0, maxScroll = 1;
  let kCorner = 1, kFootStart = 1, noMid = false;

  function layout() {
    vw = innerWidth; vh = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
    if (motion) {
      wm.style.transform = 'none';
      wm.style.fontSize = '100px';
      const w = wm.getBoundingClientRect().width;
      const target = Math.min(vw - 2 * parseFloat(getComputedStyle(home.parentElement).paddingLeft), 1500);
      fs = Math.max(56, Math.min(100 * target / w, vh * (vw < 700 ? .3 : .62)));
      wm.style.fontSize = fs + 'px';
      // "iter.ca" has no descenders, so the slot drops the empty space under the baseline,
      // and on desktop also the empty line-box space above the tallest letters (i, t), so they sit near the top of the page
      const mc = layout.mc || (layout.mc = document.createElement('canvas').getContext('2d'));
      const above = () => { mc.font = `800 ${fs}px ${getComputedStyle(wm).fontFamily}`; const m = mc.measureText('it');
        const lh = wm.offsetHeight, fa = m.fontBoundingBoxAscent ?? fs * .95, fd = m.fontBoundingBoxDescent ?? fs * .25;
        return Math.max(0, (lh - fa - fd) / 2 + fa - m.actualBoundingBoxAscent); };
      const trimTop = () => vw >= 700 ? above() : 0;
      const slotH = () => wm.offsetHeight - fs * .1 - trimTop();
      const place = () => { const t = trimTop(); home.style.height = slotH() + 'px'; home.dataset.trim = t; };
      place();
      if (vw >= 700) {   // as big as fits: shrink only once the first screen overflows the window by more than 8%
        const hero = home.parentElement, cl = document.documentElement.classList; hero.style.minHeight = '0'; cl.add('fit');   // measure with the lists at their 5.5-row first-screen height
        cl.remove('no-else'); if (hero.offsetHeight > vh) cl.add('no-else');   // "elsewhere" joins the first screen only if it fits at full wordmark size
        const over = hero.offsetHeight - vh; hero.style.minHeight = ''; cl.remove('fit');
        if (over > 0) { fs = Math.max(56, Math.min(fs, vh * .42), fs - over / (slotH() / fs)); wm.style.fontSize = fs + 'px'; place(); }  // never below 42% of the window height
      }
      dotX = dot.offsetLeft + dot.offsetWidth / 2;
      dotY = bl.offsetTop;
      // the fixed wordmark link sits above the page: clip its hit area to the letters so the empty line-box space
      // above them and below the baseline ("iter.ca" has no descenders) doesn't swallow clicks on the intro links
      const wa = wm.firstElementChild, trim = Math.max(0, (+home.dataset.trim || 0) - fs * .02);
      wa.style.clipPath = `inset(${trim.toFixed(1)}px 0 ${Math.max(0, wa.offsetTop + wa.offsetHeight - dotY - fs * .04).toFixed(1)}px 0)`;
      const hr = home.getBoundingClientRect();
      homeTop = hr.top + scrollY - (+home.dataset.trim || 0); homeLeft = hr.left;   // the wordmark box starts above its trimmed slot
    }
    // with no layer sections left below the first screen (e.g. "elsewhere" moved up), drop the residual stream too
    const lay = document.getElementById('layers');
    noMid = lay.classList.toggle('empty', [...lay.querySelectorAll(':scope > .sec')].every(s => getComputedStyle(s).display === 'none'));
    maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
    kCorner = vh * .75;   // lands in the corner as the wordmark finishes shrinking into the bar
    kFootStart = Math.max(kCorner + 1, maxScroll - vh * .85);
    for (const [c, s] of [[cOct, dpr], [cGlow, .5]]) {
      c.width = Math.round(vw * s); c.height = Math.round(vh * s);
    }
    if (motion) { FXwm.x = 0; FXwm.y = 0; FXwm.s = 1; wmSet = false; measureLetters(); FXwm.wake && FXwm.wake(); }   // transform is 'none' until the next frame
    measureSlots();
    dirty = true;
  }

  // layout reads, cached: the frame loop below only does arithmetic on these (the corner slot is fixed; the footer slot is
  // kept in page coordinates); re-measured by layout() and whenever the page's size changes (ResizeObserver below)
  const cornerV = { x: 0, y: 0, s: 0 }, footDoc = { x: 0, y: 0, s: 0 };
  let heroPad = 0;
  function measureSlots() {
    const c = slotCorner.getBoundingClientRect(), f = slotFoot.getBoundingClientRect();
    cornerV.x = c.left + c.width / 2; cornerV.y = c.top + c.height / 2; cornerV.s = c.width;
    footDoc.x = f.left + f.width / 2; footDoc.y = f.top + f.height / 2 + scrollY; footDoc.s = f.width;
    heroPad = parseFloat(getComputedStyle(home.parentElement).paddingLeft);
    if (!motion) measureLetters();
  }
  // letter boxes: with motion, in the floating wordmark's own (untransformed) coordinates, without the letters' own dodge/jump
  // transforms; without motion (the wordmark stays in its slot), in page coordinates
  function measureLetters() {
    const r = motion ? wm.getBoundingClientRect() : { left: -scrollX, top: -scrollY };
    const saved = chs.map(el => el.style.transform);
    if (motion) chs.forEach(el => { el.style.transform = 'none'; });
    FXwm.ch = chs.map(el => { const b = el.getBoundingClientRect(); return { x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top, w: b.width, h: b.height }; });
    if (motion) chs.forEach((el, i) => { el.style.transform = saved[i]; });
  }

  // ---------- pointer interaction ----------
  const hit = $('#oct-hit');
  let mx = -1e4, my = -1e4, mOn = 0, mOnT = 0;       // pointer + presence (for ribbon bend)
  let ux = 0, uy = 0, vx = 0, vy = 0;                 // user-applied spin + inertia
  let tiltX = 0, tiltY = 0, hov = 0, pop = 0, popV = 0, flash = 0;
  const rips = [];
  let sx = -1e4, sy = -1e4, boost = 0, flashK = 0, hovT = 0, curSt = { x: 0, y: 0, s: 0 }, drag = null, pokes = 0;
  // the glow that follows the pointer is for mice (and pens) only: on touch screens nothing should trail the finger
  addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; mx = e.clientX; my = e.clientY; mOnT = 1; }, { passive: true });
  let pressed = false, pressT0 = -1, foc = 0;         // press focus: the cursor glow narrows while held (and briefly after a tap)
  addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') return; mx = e.clientX; my = e.clientY; mOnT = 1; pressed = true; pressT0 = performance.now(); }, { passive: true });
  addEventListener('pointercancel', () => { pressed = false; }, { passive: true });
  document.addEventListener('pointerleave', () => { mOnT = 0; });
  addEventListener('pointerup', (e) => { pressed = false; if (e.pointerType !== 'mouse') mOnT = 0; }, { passive: true });
  window.FXglow = { ripple(x, y) { rips.push({ x, y, t0: performance.now() / 1000 }); if (rips.length > 4) rips.shift(); } };
  hit.addEventListener('pointerdown', (e) => {
    e.preventDefault(); hit.setPointerCapture(e.pointerId); hit.classList.add('drag');
    drag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: performance.now() };
    vx = vy = 0;
  });
  hit.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const now = performance.now(), dt = Math.max(8, now - drag.t) / 1000;
    const dx = (e.clientX - drag.x) * .012, dy = (e.clientY - drag.y) * .012;
    ux += dx; uy += dy; vx = lerp(vx, dx / dt, .5); vy = lerp(vy, dy / dt, .5);
    drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
  });
  const endDrag = (e) => {
    if (!drag) return;
    hit.classList.remove('drag');
    const moved = Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0);
    if (performance.now() - drag.t > 90) { vx *= .2; vy *= .2; }   // held still before release: little fling
    if (moved < 6) {   // a click/tap: pop!
      pokes++;
      popV += 9 + Math.min(pokes, 12) * .6; flashK = Math.min(1.6, flashK + 1);
      vx += (Math.random() < .5 ? -1 : 1) * (10 + Math.random() * 8); vy += (Math.random() - .5) * 8;
      window.FX && FX.burst(curSt.x, curSt.y, 46 + Math.min(pokes * 4, 60), curSt.s * .9);
      if (pokes % 7 === 0 && window.FX) FX.confetti(curSt.x, curSt.y);
    }
    drag = null;
  };
  hit.addEventListener('pointerup', endDrag);
  hit.addEventListener('pointercancel', endDrag);
  hit.addEventListener('pointerenter', () => { hovT = 1; });
  hit.addEventListener('pointerleave', () => { if (!drag) hovT = 0; });

  // ---------- frame ----------
  let dirty = true, last = performance.now(), t0 = last, smoothY = scrollY, vel = 0, spin = 0, glowCleared = false;
  // per-frame scratch, allocated once
  const dotS = { x: 0, y: 0, s: 0 }, footV = { x: 0, y: 0, s: 0 }, gutV = { x: 0, y: 0, s: 40 }, tmpS = { x: 0, y: 0, s: 0 }, stS = { x: 0, y: 0, s: 0 };
  const WK = new Float32Array(21), RP = new Float32Array(16);
  const Ry = new Float64Array(9), Rx = new Float64Array(9), Rz = new Float64Array(9), RxRy = new Float64Array(9), R = new Float32Array(9);
  // last values written to the DOM, so unchanged frames write nothing (every style write costs a style recalc)
  let wmSet = false, lastDot = '', lastBar = '', hitX = NaN, hitY = NaN, hitS = NaN;

  const mul = (A, B, r) => { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { let s = 0; for (let k = 0; k < 3; k++) s += A[k*3+j] * B[i*3+k]; r[i*3+j] = s; } return r; };
  function rotMat(a, b, c) {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
    // Rz(c) * Rx(b) * Ry(a), column-major
    Ry[0] = ca; Ry[1] = 0; Ry[2] = -sa; Ry[3] = 0; Ry[4] = 1; Ry[5] = 0; Ry[6] = sa; Ry[7] = 0; Ry[8] = ca;
    Rx[0] = 1; Rx[1] = 0; Rx[2] = 0; Rx[3] = 0; Rx[4] = cb; Rx[5] = sb; Rx[6] = 0; Rx[7] = -sb; Rx[8] = cb;
    Rz[0] = cc; Rz[1] = sc; Rz[2] = 0; Rz[3] = -sc; Rz[4] = cc; Rz[5] = 0; Rz[6] = 0; Rz[7] = 0; Rz[8] = 1;
    return mul(Rz, mul(Rx, Ry, RxRy), R);
  }

  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now; FXwm.t = now;
    const time = motion ? (now - t0) / 1000 : 0;
    const y = scrollY;
    // scroll velocity (smoothed) adds extra spin
    const dy = y - smoothY; smoothY = y; vel = lerp(vel, dy / Math.max(dt, .001), .12);

    // --- reads (cached layout only; no layout reads in the frame) ---
    let st, wmX = 0, wmY = 0, sc = 1, tw = 0;
    if (motion) {
      tw = clamp(y / (vh * .75));
      const e = ease(tw);
      const small = vw < 600 ? 26 : 30;
      sc = lerp(1, small / fs, e);
      wmX = lerp(homeLeft, Math.min(homeLeft, 22), e);
      wmY = lerp(homeTop - y, 16, e);
      dotS.x = wmX + dotX * sc; dotS.y = wmY + (dotY - fs * .19) * sc; dotS.s = fs * .4 * sc;
      const corner = cornerV, foot = footV;
      foot.x = footDoc.x; foot.y = footDoc.y - y; foot.s = footDoc.s;
      if (noMid && vw >= 700) {   // top + bottom only (desktop; phones' long single page parks it in the corner): one unbroken trip from the dot to the footer, small and in the right margin past the content
        gutV.x = vw - Math.max(22, heroPad / 2); gutV.y = vh * .5;
        const f0 = Math.max(maxScroll * .3, maxScroll - vh * .85);   // drop into the footer only once it's coming into view
        st = lerpS(lerpS(dotS, gutV, ease(clamp(y / Math.min(maxScroll * .4, vh * .5))), tmpS), foot, ease(clamp((y - f0) / (maxScroll - f0))), stS);
      } else if (y <= kCorner) st = lerpS(dotS, corner, ease(clamp(y / kCorner)), stS);
      else if (y <= kFootStart) st = corner;
      else st = lerpS(corner, foot, ease((y - kFootStart) / (maxScroll - kFootStart)), stS);
      // --- writes (only what changed) ---
      if (!wmSet || wmX !== FXwm.x || wmY !== FXwm.y || sc !== FXwm.s) {
        FXwm.x = wmX; FXwm.y = wmY; FXwm.s = sc; wmSet = true;
        wm.style.transform = `translate3d(${wmX}px, ${wmY}px, 0) scale(${sc})`;
      }
      const dotV = sstep(.08, .45, tw).toFixed(3), barV = sstep(.5, 1, tw).toFixed(3);
      if (dotV !== lastDot) { lastDot = dotV; wm.style.setProperty('--dot', dotV); }
      if (barV !== lastBar) { lastBar = barV; bar.style.opacity = barV; }
    } else {
      st = cornerV;
    }

    if (O) {
      spin += vel * dt * .0035;
      // inertia + springs for the pointer-driven parts
      if (!drag) { ux += vx * dt; uy += vy * dt; const f = Math.exp(-dt * 1.6); vx *= f; vy *= f; uy *= Math.exp(-dt * .9); }
      popV += (-pop * 210 - popV * 13) * dt; pop += popV * dt; pop = Math.max(-.35, pop);
      // click/hover effects ease toward targets instead of snapping
      flashK *= Math.exp(-dt * 3.5); flash = lerp(flash, flashK, 1 - Math.exp(-dt * 14));
      hov = lerp(hov, hovT, 1 - Math.exp(-dt * 10));
      // the ribbon follows a smoothed pointer, so a tap somewhere new glides there instead of teleporting
      if (mOn < .02 && mOnT === 0) { sx = mx; sy = my; }
      else { const k = 1 - Math.exp(-dt * 7); sx += (mx - sx) * k; sy += (my - sy) * k; }
      const near = Math.hypot(mx - curSt.x, my - curSt.y) / Math.max(60, curSt.s);
      const tw2 = clamp(1.6 - near) * mOn;  // lean toward a nearby cursor
      tiltX = lerp(tiltX, clamp((mx - curSt.x) / Math.max(80, curSt.s)) * tw2 * .6, .08);
      tiltY = lerp(tiltY, clamp((my - curSt.y) / Math.max(80, curSt.s)) * tw2 * .6, .08);
      mOn = lerp(mOn, mOnT, .06);
      { const focT = pressed || now - pressT0 < 250 ? 1 : 0; foc += (focT - foc) * (1 - Math.exp(-dt * (focT > foc ? 6 : 3))); }   // eased both ways, never a jump
      const a = .55 + y * .0042 + time * .22 + spin + ux + tiltX;
      // mostly upright: the spin is around the vertical axis, with only a little lean toward the viewer and roll
      const b = .24 + Math.sin(y * .0011 + time * .15) * .12 + uy + tiltY;
      const c = -.08 + Math.sin(y * .0007) * .06;
      const Rm = rotMat(a, b, c);
      const g = go;
      g.viewport(0, 0, cOct.width, cOct.height);
      g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT);
      curSt.x = st.x; curSt.y = st.y; curSt.s = st.s;
      // only write when it moved (a size write invalidates layout; parked, it no longer does every frame)
      const hs = st.s * .8, hx = st.x - hs / 2, hy = st.y - hs / 2;
      if (hx !== hitX || hy !== hitY) { hitX = hx; hitY = hy; hit.style.transform = `translate3d(${hx}px, ${hy}px, 0)`; }
      if (hs !== hitS) { hitS = hs; hit.style.width = hit.style.height = hs + 'px'; }
      const S = st.s / 2 / 1.3 * (1 + pop * .5 + hov * .06);
      const ph = a * .08;
      // halo behind the gem (stronger when it's large, mid-page)
      const haloAmt = motion ? lerp(.55, 1, sstep(.2, .9, clamp(y / kCorner))) : 1;
      g.useProgram(O.ph.p); g.bindVertexArray(O.hvao);
      g.uniform2f(O.ph.u.uC, st.x, vh - st.y); g.uniform1f(O.ph.u.uS, S); g.uniform1f(O.ph.u.uH, haloAmt * (1 + hov * .5 + flash * 2.2));
      g.uniform1f(O.ph.u.uPh, ph); g.uniform1f(O.ph.u.uDpr, dpr); g.uniform2f(O.ph.u.uOff, 0, 0);
      // only shade the halo's own square: past 2 * 2.4 * S css px from the center it is below 1e-5 even at full flash
      // (uH <= 5), which rounds to exactly 0 in the 8-bit canvas, so the pixels outside stay the cleared 0 either way
      { const r = 2 * 2.4 * S + 2, x0 = Math.max(0, Math.floor((st.x - r) * dpr)), y0 = Math.max(0, Math.floor((vh - st.y - r) * dpr));
        g.enable(g.SCISSOR_TEST); g.scissor(x0, y0, Math.max(0, Math.ceil((st.x + r) * dpr) - x0), Math.max(0, Math.ceil((vh - st.y + r) * dpr) - y0)); }
      g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
      g.disable(g.SCISSOR_TEST);
      // the gem, multisampled: its projected vertices stay within CAM / (CAM - 1) * S < 1.42 * S css px of its center, so that
      // square (+2px) is drawn into the small multisampled buffer (halo first, so the gem blends over it as it did on the
      // canvas) and resolved over the same pixels of the canvas
      const cw = cOct.width, ch = cOct.height, gr = 1.42 * S * dpr + 2, gx = st.x * dpr, gy = (vh - st.y) * dpr;
      const bx0 = Math.max(0, Math.floor(gx - gr)), by0 = Math.max(0, Math.floor(gy - gr)), bx1 = Math.min(cw, Math.ceil(gx + gr)), by1 = Math.min(ch, Math.ceil(gy + gr));
      if (bx1 > bx0 && by1 > by0) {
        const bw = bx1 - bx0, bh = by1 - by0;
        g.bindFramebuffer(g.FRAMEBUFFER, O.fbo);
        if (bw > O.capW || bh > O.capH) {   // grow with headroom, so scrolling to the big footer gem reallocates only a few times
          O.capW = Math.min(cw, Math.max(O.capW, Math.ceil(bw * 1.25))); O.capH = Math.min(ch, Math.max(O.capH, Math.ceil(bh * 1.25)));
          g.bindRenderbuffer(g.RENDERBUFFER, O.rb); g.renderbufferStorageMultisample(g.RENDERBUFFER, O.samples, g.RGBA8, O.capW, O.capH);
          g.framebufferRenderbuffer(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.RENDERBUFFER, O.rb);
          g.bindFramebuffer(g.FRAMEBUFFER, O.fbo1);
          g.bindRenderbuffer(g.RENDERBUFFER, O.rb1); g.renderbufferStorage(g.RENDERBUFFER, g.RGBA8, O.capW, O.capH);
          g.framebufferRenderbuffer(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.RENDERBUFFER, O.rb1);
          g.bindFramebuffer(g.FRAMEBUFFER, O.fbo);
        }
        g.viewport(-bx0, -by0, cw, ch);   // the canvas's coordinates, shifted so the box lands at the buffer's origin
        g.clear(g.COLOR_BUFFER_BIT);
        g.uniform2f(O.ph.u.uOff, bx0, by0);
        g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
        g.useProgram(O.pr.p); g.bindVertexArray(O.vao);
        g.uniformMatrix3fv(O.pr.u.uR, false, Rm);
        g.uniform2f(O.pr.u.uC, st.x, st.y); g.uniform1f(O.pr.u.uS, S); g.uniform2f(O.pr.u.uRes, vw, vh);
        g.uniform1f(O.pr.u.uEdge, Math.max(.04, 1.1 / (S * 1.15)));   // edges scale with the gem (a fixed share of each face), never thinner than ~1px
        g.uniform1i(O.pr.u.uPass, 0); g.drawArrays(g.TRIANGLES, 0, 24);
        g.uniform1i(O.pr.u.uPass, 1); g.drawArrays(g.TRIANGLES, 0, 24);
        g.bindFramebuffer(g.DRAW_FRAMEBUFFER, O.fbo1);
        g.blitFramebuffer(0, 0, O.capW, O.capH, 0, 0, O.capW, O.capH, g.COLOR_BUFFER_BIT, g.NEAREST);   // resolve
        g.bindFramebuffer(g.READ_FRAMEBUFFER, O.fbo1); g.bindFramebuffer(g.DRAW_FRAMEBUFFER, null);
        g.blitFramebuffer(0, 0, bw, bh, bx0, by0, bx1, by1, g.COLOR_BUFFER_BIT, g.NEAREST);   // into place
        g.bindFramebuffer(g.FRAMEBUFFER, null);
      }

      // glow ribbon: faint at the hero, blooms at the bottom of the page
      const foot = sstep(maxScroll - vh * 1.1, maxScroll, y);
      const nowS = now / 1000;
      let boostT = 0, nr = 0;
      for (const q of rips) if (nowS - q.t0 < 4) { rips[nr++] = q; boostT = Math.max(boostT, Math.exp(-(nowS - q.t0) * 2)); }
      rips.length = nr;
      boost = lerp(boost, boostT, 1 - Math.exp(-dt * 6));
      const hero = 1 - sstep(0, vh * .7, y);
      const field = Math.max(hero, foot, .2);   // full strength at the top and bottom, toned down in between
      const amt = motion ? Math.max((vw < 700 ? .18 : .3) * hero, foot) * (1 + .5 * boost) : foot;
      const h = gg;
      h.viewport(0, 0, cGlow.width, cGlow.height);
      if (amt > .004 || field > .003) {
        if (hero > .003) stepWake(dt);
        h.useProgram(G.pg.p); h.bindVertexArray(G.gvao);
        h.uniform2f(G.pg.u.uRes, cGlow.width, cGlow.height); h.uniform1f(G.pg.u.uT, time + y * .002);
        h.uniform1f(G.pg.u.uAmt, amt); h.uniform1f(G.pg.u.uPh, ph); h.uniform1f(G.pg.u.uWave, amt > 0 ? clamp(foot * (motion ? 1 + .5 * boost : 1) / amt) : 0); h.uniform1f(G.pg.u.uHero, field * (1 + .4 * boost)); h.uniform1f(G.pg.u.uMask, hero);
        for (let i = 0; i < wake.length; i++) { const W = wake[i]; WK[i * 3] = W.x / vw; WK[i * 3 + 1] = 1 - W.y / vh; WK[i * 3 + 2] = W.e; }
        h.uniform3fv(G.pg.u['uWk[0]'], WK);
        const gs = cGlow.width / vw;
        h.uniform3f(G.pg.u.uM, sx * gs, (vh - sy) * gs, motion ? mOn : 0); h.uniform1f(G.pg.u.uFoc, foc);
        RP.fill(0);
        if (motion) for (let i = 0; i < rips.length; i++) { const q = rips[i]; RP[i * 4] = q.x * gs; RP[i * 4 + 1] = (vh - q.y) * gs; RP[i * 4 + 2] = nowS - q.t0; RP[i * 4 + 3] = 1; }
        h.uniform4fv(G.pg.u['uRp[0]'], RP);
        h.drawArrays(h.TRIANGLE_STRIP, 0, 4); glowCleared = false;
      } else if (!glowCleared) { h.clearColor(0, 0, 0, 0); h.clear(h.COLOR_BUFFER_BIT); glowCleared = true; }
    }
    dirty = false;
    if (motion) requestAnimationFrame(frame);
  }

  const request = () => { if (!motion && !dirty) { dirty = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => { layout(); if (!motion) requestAnimationFrame(frame); }, { passive: true });
  layout();
  // content above the footer changing height (e.g. the accounts list opening on phones) moves the footer slot
  new ResizeObserver(measureSlots).observe(document.body);
  requestAnimationFrame(frame);
  // relayout once the web fonts are in (the first layout may have used the fallback font)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { layout(); if (!motion) requestAnimationFrame(frame); });
})();

/* where — location data from the /where/ spreadsheet export (snapshot; Plane rows dropped), shown in the corner and its hover card */
(() => {
  const STAYS = [["2024-01-01", "2024-03-24", "Canada", "Toronto"], ["2024-03-25", "2024-03-29", "France", "Paris"], ["2024-03-29", "2024-05-05", "Canada", "Toronto"], ["2024-05-05", "2024-05-08", "United States", "NYC"], ["2024-05-08", "2024-06-05", "Canada", "Toronto"], ["2024-06-05", "2024-06-11", "United States", "SF"], ["2024-06-11", "2024-09-10", "Canada", "Toronto"], ["2024-09-10", "2024-09-14", "Canada", "Montreal"], ["2024-09-14", "2024-10-01", "Canada", "Toronto"], ["2024-10-01", "2024-10-01", "United States", "Niagara Falls"], ["2024-10-01", "2025-01-01", "Canada", "Toronto"], ["2025-01-01", "2025-02-19", "Canada", "Toronto"], ["2025-02-19", "2025-02-23", "United States", "NYC"], ["2025-02-23", "2025-09-11", "Canada", "Toronto"], ["2025-09-11", "2025-09-18", "United States", "SF"], ["2025-09-18", "2025-12-26", "Canada", "Toronto"], ["2025-12-27", "2026-01-04", "Germany", "Hamburg"], ["2026-01-04", "2026-02-07", "United Kingdom", "London"], ["2026-02-07", "2026-02-20", "Canada", "Toronto/Waterloo/Ayr"], ["2026-02-20", "2026-03-25", "Canada", "Montreal"], ["2026-03-25", "2026-03-31", "Canada", "Toronto/Waterloo/Ayr"], ["2026-03-31", "2026-05-05", "United States", "SF"], ["2026-05-05", "2026-06-05", "Canada", "Toronto"], ["2026-06-05", "2026-08-07", "United States", "SF"], ["2026-08-07", "2026-08-20", "Canada", "Toronto"], ["2026-08-20", "2026-08-20", "Canada", "Montreal"], ["2026-08-21", "2026-12-15", "United Kingdom", "London"]];
  const FLAG = { "Canada": "🇨🇦", "United States": "🇺🇸", "France": "🇫🇷", "Germany": "🇩🇪", "United Kingdom": "🇬🇧" };
  const ALIAS = { "Toronto/Waterloo/Ayr": "Toronto" };
  const COORD = { "Toronto": [43.65, -79.38], "Montreal": [45.50, -73.57], "Niagara Falls": [43.10, -79.06], "NYC": [40.71, -74.01],
                  "SF": [37.77, -122.42], "Paris": [48.85, 2.35], "Hamburg": [53.55, 9.99], "London": [51.51, -0.13] };
  const HOME = COORD.Toronto;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (q) => document.querySelector(q);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const D = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmt = (d, y) => MON[d.getUTCMonth()] + " " + d.getUTCDate() + (y ? ", " + d.getUTCFullYear() : "");
  const daysIncl = (f, t) => Math.round((t - f) / 864e5) + 1;
  const human = (n) => n < 14 ? n + (n === 1 ? " day" : " days") : n < 60 ? Math.round(n / 7) + " wk" : Math.round(n / 30.44) + " mo";
  const hav = (a, b) => { if (!a || !b) return null; const R = 6371, k = Math.PI / 180, dLa = (b[0] - a[0]) * k, dLo = (b[1] - a[1]) * k;
    const s = Math.sin(dLa / 2) ** 2 + Math.cos(a[0] * k) * Math.cos(b[0] * k) * Math.sin(dLo / 2) ** 2; return Math.round(2 * R * Math.asin(Math.sqrt(s))); };
  const stays = STAYS.map(([f, t, c, p]) => ({ from: D(f), to: D(t), country: c, place: ALIAS[p] || p })).sort((a, b) => a.from - b.from);
  const merged = [];
  for (const st of stays) { const l = merged[merged.length - 1];
    if (l && l.place === st.place && +l.to >= +st.from - 864e5) l.to = st.to; else merged.push({ ...st }); }
  const now = new Date(), today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  let cur = merged.find(m => m.from <= today && today < m.to); const live = !!cur; if (!cur) cur = merged[merged.length - 1];
  const countries = new Set(stays.map(x => x.country)).size;
  let travelled = 0; for (let i = 1; i < merged.length; i++) travelled += hav(COORD[merged[i - 1].place], COORD[merged[i].place]) || 0;
  const fromHome = hav(COORD[cur.place], HOME);
  const day = daysIncl(cur.from, today);

  // ---- "right now" card + hero corner ----
  $('#here-flag').textContent = FLAG[cur.country] || '🌍';
  $('#here-place').textContent = cur.place;
  $('#here-eyebrow').textContent = live ? "right now I'm in" : 'last seen in';
  $('#here-meta').innerHTML = live
    ? `<b>${cur.country}</b> · <span class="nw">here since <b>${fmt(cur.from, true)}</b></span> · <span class="nw">day <b>${day}</b></span>`
    : `<b>${cur.country}</b> · ${fmt(cur.from)} – ${fmt(cur.to, true)}`;
  $('#here-chips').innerHTML = [
    cur.place === 'Toronto' ? '🏠 home base' : `<b>${fromHome.toLocaleString('en-CA')} km</b> from home 🏠`,
    `<b>${countries}</b> countries`, `<b>≈${Math.round(travelled / 1000)}k km</b> covered`, `<b>${merged.length}</b> stays since 2024`,
  ].map(x => `<li>${x}</li>`).join('');
  $('#here-mini').textContent = `${cur.place.toLowerCase()}${live ? ' · since ' + fmt(cur.from) : ''}`;

  // ---- trail map ----
  const cv = $('#trailmap'), ctx = cv.getContext('2d');
  const places = {}; merged.forEach(m => { const p = places[m.place] ||= { name: m.place, days: 0, visits: 0, c: COORD[m.place] }; p.days += daysIncl(m.from, m.to); p.visits++; });
  const P = Object.values(places).filter(p => p.c);
  const ANCH = { Toronto: [-1, 1], Montreal: [1, -1], NYC: [1, 1], SF: [1, 0], London: [-1, -1], Paris: [-1, 1], Hamburg: [1, 0], 'Niagara Falls': [0, 0] };
  const legs = []; for (let i = 1; i < merged.length; i++) { const a = places[merged[i - 1].place], b = places[merged[i].place]; if (a && b && a !== b) legs.push([a, b]); }
  const PAL = [[255,79,216],[164,0,232],[143,99,255],[65,230,255],[47,231,0],[231,207,0]];
  const palc = (u, al) => { u = ((u % 1) + 1) % 1 * PAL.length; const i = u | 0, f = u - i, a = PAL[i], b = PAL[(i + 1) % PAL.length];
    return `rgba(${a[0] + (b[0] - a[0]) * f | 0},${a[1] + (b[1] - a[1]) * f | 0},${a[2] + (b[2] - a[2]) * f | 0},${al})`; };
  let W = 0, H = 0, dpr = 1, prog = RM ? 1 : 0, hl = null, pings = [], vis = false;
  const LON = [-128, 18], LAT = [33, 58];
  const proj = (c) => { const px = W * .07, py = H * .12;
    return [px + (c[1] - LON[0]) / (LON[1] - LON[0]) * (W - 2 * px), H - py - (c[0] - LAT[0]) / (LAT[1] - LAT[0]) * (H - 2 * py)]; };
  function size() { dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; P.forEach(p => p.xy = proj(p.c)); bgOk = false; }
  const ctrl = (a, b) => { const [x1, y1] = a.xy, [x2, y2] = b.xy, d = Math.hypot(x2 - x1, y2 - y1); return [(x1 + x2) / 2, (y1 + y2) / 2 - d * .32 - 6]; };
  const qpt = (a, c, b, t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];
  // the static layer (dot grid, graticule, region names) is drawn once into its own canvas and copied in each frame
  const bg = document.createElement('canvas'), bgx = bg.getContext('2d');
  let bgOk = false;
  function drawBg(c) {
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
    // dot grid + graticule
    c.fillStyle = 'rgba(255,255,255,.07)';
    for (let x = 6; x < W; x += 12) for (let y = 6; y < H; y += 12) c.fillRect(x, y, 1, 1);
    c.strokeStyle = 'rgba(255,255,255,.045)'; c.lineWidth = 1; c.beginPath();
    for (let lo = -120; lo <= 10; lo += 10) { const [x] = proj([0, lo]); c.moveTo(x, 0); c.lineTo(x, H); }
    for (let la = 35; la <= 55; la += 10) { const [, y] = proj([la, 0]); c.moveTo(0, y); c.lineTo(W, y); }
    c.stroke();
    c.font = `400 ${W < 420 ? 9 : 10}px "DM Mono", ui-monospace, monospace`; c.fillStyle = 'rgba(255,255,255,.18)';
    c.fillText('N. AMERICA', proj([55, -112])[0], proj([55, -112])[1]); c.fillText('ATLANTIC', proj([39, -48])[0], proj([39, -48])[1]); c.fillText('EUROPE', proj([57, 3])[0], proj([57, 3])[1]);
  }
  function draw(t) {
    if (!bgOk) { bg.width = cv.width; bg.height = cv.height; drawBg(bgx); bgOk = true; }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(bg, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // arcs, drawn in order up to scroll progress
    const shown = prog * legs.length;
    legs.forEach(([a, b], i) => {
      const k = clamp(shown - i); if (k <= 0) return;
      const c = ctrl(a, b), on = Math.max(a.h, b.h), rec = i >= legs.length - 3, base = rec ? .85 : .38;
      ctx.lineWidth = (rec ? 1.8 : 1.2) + (2.4 - (rec ? 1.8 : 1.2)) * on * anyH;
      ctx.strokeStyle = palc(i / legs.length * .9 + t * .02, base + ((.12 + .83 * on) - base) * anyH);
      ctx.beginPath(); ctx.moveTo(a.xy[0], a.xy[1]);
      for (let s = 1; s <= 24; s++) { const q = qpt(a.xy, c, b.xy, s / 24 * k); ctx.lineTo(q[0], q[1]); }
      ctx.stroke();
      if (k < 1) { const q = qpt(a.xy, c, b.xy, k); ctx.fillStyle = '#fff'; ctx.shadowColor = '#41e6ff'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, 7); ctx.fill(); ctx.shadowBlur = 0; }
    });
    // places
    for (const p of P) {
      const isCur = p.name === cur.place, isHl = p.h > .02, r = 2.2 + Math.sqrt(p.days) * .32 * (W < 420 ? .7 : 1);
      if (isCur && live) for (let k = 0; k < 2; k++) { const ph = ((t * .6 + k * .5) % 1); ctx.strokeStyle = `rgba(255,79,216,${.7 * (1 - ph)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.xy[0], p.xy[1], r + 3 + ph * 22, 0, 7); ctx.stroke(); }
      ctx.fillStyle = isCur ? '#ff4fd8' : `rgb(${236 - 171 * p.h | 0},${234 - 4 * p.h | 0},${242 + 13 * p.h | 0})`;
      ctx.shadowColor = isCur ? '#ff4fd8' : '#41e6ff'; ctx.shadowBlur = isCur ? 16 : 16 * p.h;
      ctx.beginPath(); ctx.arc(p.xy[0], p.xy[1], r * (1 + .35 * p.h), 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      const an = ANCH[p.name] || [1, 0]; if (!an[0] && !isHl) continue;
      ctx.font = `${isCur ? 500 : 400} ${isCur ? 13 : W < 420 ? 9.5 : 11}px "DM Mono", ui-monospace, monospace`;
      ctx.fillStyle = isCur ? '#fff' : `rgba(${236 - 171 * p.h | 0},${234 - 4 * p.h | 0},${242 + 13 * p.h | 0},${.55 + .45 * p.h})`;
      const label = isCur && live ? p.name + ' ← now' : p.name, tw = ctx.measureText(label).width, dx = an[0] || 1;
      let lx = p.xy[0] + (dx > 0 ? r + 5 : -r - 5 - tw); if (lx + tw > W - 4) { if (!isHl) continue; lx = W - tw - 4; ctx.globalAlpha = p.h; } // narrow map: show clipped labels only on hover/tap
      ctx.fillText(label, Math.max(4, lx), p.xy[1] + (an[1] > 0 ? r + 10 : an[1] < 0 ? -r - 4 : 4));
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 1;
    // click pings
    pings = pings.filter(g => t - g.t < 1.2);
    for (const g of pings) { const k = (t - g.t) / 1.2; ctx.strokeStyle = palc(g.h + k * .3, (1 - k) * Math.min(1, k * 10)); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(g.x, g.y, 4 + k * 46, 0, 7); ctx.stroke(); }
  }
  // interactions: hover a place to light up its arcs; tap/click to ping it
  P.forEach(p => p.h = 0); let anyH = 0;
  function easeHl(dt) { const k = RM ? 1 : 1 - Math.exp(-dt * 10);
    for (const p of P) p.h += ((p === hl ? 1 : 0) - p.h) * k; anyH += ((hl ? 1 : 0) - anyH) * k; }
  const nearest = (x, y) => { let best = null, bd = 28; for (const p of P) { const d = Math.hypot(p.xy[0] - x, p.xy[1] - y); if (d < bd) { bd = d; best = p; } } return best; };
  function setHl(p) {
    hl = p;
    $('#map-hover').textContent = p ? `${p.name} · ${p.visits} stay${p.visits > 1 ? 's' : ''} · ${human(p.days)} total` + (p.name === 'Toronto' ? ' · 🏠 home' : ` · ${hav(p.c, HOME).toLocaleString('en-CA')} km from home`) : 'hover a place';
    if (RM) { easeHl(1); draw(0); }
  }
  const local = (e) => { const b = cv.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
  cv.addEventListener('pointermove', (e) => setHl(nearest(...local(e))), { passive: true });
  cv.addEventListener('pointerleave', () => setHl(null));
  cv.addEventListener('pointerdown', (e) => {
    const [x, y] = local(e), p = nearest(x, y), b = cv.getBoundingClientRect(), t = performance.now() / 1000;
    setHl(p);
    if (p) { pings.push({ x: p.xy[0], y: p.xy[1], t, h: Math.random() }); window.FX && FX.burst(b.left + p.xy[0], b.top + p.xy[1], 26, 12); }
    else { pings.push({ x, y, t, h: Math.random() }); }
  }, { passive: true });
  size(); addEventListener('resize', () => { size(); if (RM) draw(0); }, { passive: true });
  if (document.fonts) document.fonts.ready.then(() => { bgOk = false; RM && draw(0); });
  // the card opens while the corner location (or the card itself) is hovered or focused; a short grace period lets the pointer cross the gap
  const box = $('.where-hover'); let closeT = 0, openedAt = -1;
  const setOpen = (on) => { clearTimeout(closeT);
    if (on) { if (!box.classList.contains('open')) { box.classList.add('open'); size(); if (!RM && openedAt < 0) prog = 0; openedAt = performance.now(); vis = true; if (RM) draw(0); else startLoop(); } }
    else closeT = setTimeout(() => { box.classList.remove('open'); setHl(null); }, 220); };
  box.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setOpen(true); });
  box.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') setOpen(false); });
  box.addEventListener('focusin', () => setOpen(true));
  box.addEventListener('focusout', (e) => { if (!box.contains(e.relatedTarget)) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { clearTimeout(closeT); box.classList.remove('open'); } });
  if (RM) { draw(0); return; }
  box.addEventListener('transitionend', (e) => { if (e.target.id === 'where-pop' && e.propertyName === 'opacity' && !box.classList.contains('open')) { vis = false; openedAt = -1; } });
  // the map only animates while its card is showing: the loop stops once it has faded out and restarts when it opens
  let looping = false;
  function loop(ms) {
    const lastMs = loop.last; loop.last = ms;
    if (vis) {
      prog += (1 - prog) * .045;   // arcs draw in each time the card opens
      easeHl(Math.min(.05, (ms - (lastMs ?? ms)) / 1000)); draw(ms / 1000);
      requestAnimationFrame(loop);
    } else looping = false;
  }
  function startLoop() { if (!looping) { looping = true; loop.last = window.FXwm.t; requestAnimationFrame(loop); } }
})();

/* residual-stream sidebar + activation strips (ported from prototype B) */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const layersEl = document.getElementById('layers'), flow = document.getElementById('flow'), packet = document.getElementById('packet');
  const secs = $$('#layers > .sec');
  const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v => (v + .5) / 16);
  const STOPS = [[255,79,216],[143,99,255],[65,230,255]];
  let gr = 0, gg = 0, gb = 0;   // grad() writes here instead of allocating an array per pixel
  const grad = (u) => { u = ((u % 1) + 1) % 1; u = u < .5 ? u * 2 : (1 - u) * 2;
    const s = u * 2, i = Math.min(1, s | 0), f = s - i, a = STOPS[i], b = STOPS[i + 1];
    gr = a[0] + (b[0] - a[0]) * f; gg = a[1] + (b[1] - a[1]) * f; gb = a[2] + (b[2] - a[2]) * f; };
  const LE = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
  const pack = (r, g, b, a) => LE ? ((a << 24) | (b << 16) | (g << 8) | r) >>> 0 : ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
  const BG = pack(20, 19, 23, 255);

  const NL = 37, hash = (x, y, s) => { const h = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453; return h - Math.floor(h); };
  const strips = $$('.strip').map(c => { const sm = c.nextElementSibling;
    return { c, ctx: c.getContext('2d'), seed: +c.dataset.seed, lit: 0, vis: false, L: 0, Lt: 0, shownL: -1, hov: -1, hovZ: 0,
      ml: sm.querySelector('.sm-l'), mr: sm.querySelector('.sm-r') }; });
  function size() {
    strips.forEach(s => {
      s.W = Math.max(48, Math.round(s.c.clientWidth / 6)); s.H = 7;
      s.c.width = s.W; s.c.height = s.H;
      s.img = s.ctx.createImageData(s.W, s.H); s.buf = new Uint32Array(s.img.data.buffer);
      s.inj = new Float32Array(s.W); s.injT = new Float32Array(s.W); s.waves = s.waves || [];
    });
  }
  // ---- interactivity: poke the activations ----
  const now = () => performance.now() / 1000;
  const stripFor = (el) => strips.find(s => s.c.closest('.sec') === el.closest('.sec'));
  function inject(s, u, amt = 1, w = 2.5) {   // u in 0..1
    const cx = u * s.W;
    for (let x = Math.max(0, cx - w * 3 | 0); x < Math.min(s.W, cx + w * 3); x++) s.injT[x] = Math.min(1.6, s.injT[x] + amt * Math.exp(-((x - cx) ** 2) / (2 * w * w)));
    s.vis = true; wakeLoop();
  }
  const wave = (s, u) => { s.waves.push({ x: u * s.W, t: now() }); if (s.waves.length > 6) s.waves.shift(); wakeLoop(); };
  const uOf = (s, e) => { const b = s.c.getBoundingClientRect(); return clamp((e.clientX - b.left) / b.width); };
  strips.forEach(s => {
    s.c.addEventListener('pointermove', (e) => { const u = uOf(s, e); inject(s, u, .35, 2.2);
      const b = s.c.getBoundingClientRect(); s.hov = Math.min(s.H - 1, (e.clientY - b.top) / b.height * s.H | 0) * s.W + Math.min(s.W - 1, u * s.W | 0); s.shownL = -1; }, { passive: true });
    s.c.addEventListener('pointerleave', () => { s.hov = -1; s.shownL = -1; }, { passive: true });
    s.c.addEventListener('pointerdown', (e) => { const u = uOf(s, e); wave(s, u); inject(s, u, 1.4, 1.5);
      const b = s.c.getBoundingClientRect(); window.FX && FX.burst(e.clientX, b.top + b.height / 2, 18, 30); }, { passive: true });
  });
  // hovering (or tapping) a list row fires "its" feature in the section's strip
  $$('#layers .list, #layers .links').forEach(list => {
    const items = [...list.children], s = stripFor(list);
    items.forEach((li, i) => {
      const fire = () => { if (s) { inject(s, (i + .5) / items.length, 1.2, 1.8); s.lastFire = now(); } };
      li.addEventListener('pointerenter', fire, { passive: true });
      li.addEventListener('pointerdown', fire, { passive: true });
    });
  });
  // tokens sent down the residual stream
  const streamEl = document.getElementById('stream'), toks = [];
  const nodes = secs.map(sec => ({ sec, el: sec.querySelector('.node'), s: stripFor(sec) }));
  function launch(y0) {
    if (RM) return;
    const el = document.createElement('div'); el.className = 'tok'; streamEl.appendChild(el);
    toks.push({ el, y: y0, v: 260, hit: new Set() }); wakeLoop();
  }
  document.getElementById('stream-hit').addEventListener('click', (e) => {
    launch(e.clientY - streamEl.getBoundingClientRect().top);
    window.FX && FX.burst(e.clientX, e.clientY, 16, 18);
  });
  nodes.forEach(n => n.el.addEventListener('click', (e) => {
    const sr = streamEl.getBoundingClientRect(), nr = n.el.getBoundingClientRect();
    launch(nr.top + nr.height / 2 - sr.top - 1);
    window.FX && FX.burst(nr.left + nr.width / 2, nr.top + nr.height / 2, 22, 26);
  }));
  function stepToks(dt) {
    if (!toks.length) return;
    // read every node's position once, before any token is moved (reading between the writes forced a style recalc each time);
    // a node's center doesn't change when it scales on a zap, and token transforms don't move the nodes
    const sr = streamEl.getBoundingClientRect();
    nodes.forEach(n => { n.on = !!n.el.offsetParent; if (n.on) n.r = n.el.getBoundingClientRect(); });
    for (let i = toks.length - 1; i >= 0; i--) {
      const k = toks[i]; k.v = Math.min(2400, k.v + 1700 * dt); k.y += k.v * dt;
      k.el.style.transform = `translateY(${k.y}px)`;
      nodes.forEach((n, j) => {
        if (!n.on) return;  // section hidden at this size
        const nr = n.r, ny = nr.top + nr.height / 2 - sr.top;
        if (!k.hit.has(j) && k.y >= ny - 4) {
          k.hit.add(j);
          if (k.y - ny < 60) {  // only nodes it actually flows through
            n.el.classList.add('zap'); setTimeout(() => n.el.classList.remove('zap'), 260);
            if (n.s) { wave(n.s, 0); inject(n.s, 0, 1.5, 2); }
            window.FX && FX.burst(nr.left + nr.width / 2, nr.top + nr.height / 2, 14, 22);
          }
        }
      });
      if (k.y > sr.height + 40) { k.el.remove(); toks.splice(i, 1); }
    }
  }
  // procedural stand-in for the activations: drifting sinusoidal "features" + sparse hot units, re-mixed by layer
  function act(s, x, y, t) {
    const sd = s.seed + s.L * .37, n = hash(x, y, s.seed + (s.L | 0) * 13.1);
    const col = Math.sin(x * .11 * s.seed + t * .5 + s.L * .21) * Math.sin(x * .043 + sd - t * .31);
    const row = .5 + .5 * Math.sin(y * 1.3 + x * .07 + t * 1.1 + sd);
    return col * (.45 + .55 * row) + (n > .94 ? (n > .97 ? 1 : -1) * .6 * (.5 + .5 * Math.sin(t * 3 + n * 40)) : 0);  // -1..1
  }
  function drawStrip(s, t) {
    const { W, H, buf } = s, t0w = now(), waves = s.waves;
    let nw = 0; for (const w of waves) if (t0w - w.t < 2.5) waves[nw++] = w; waves.length = nw;
    for (let y = 0; y < H; y++) { const row = .5 + .5 * Math.sin(y * 1.3 + t * 1.1 + s.seed);
    for (let x = 0; x < W; x++) {
      const z = act(s, x, y, t), d = y * W + x;
      let v = Math.max(0, Math.abs(z) - .2) / .8;
      v *= clamp(s.lit * 1.25 * W - x * .9, 0, W * .25) / (W * .25);          // scroll-driven left→right sweep
      v += s.inj[x] * (.65 + .35 * row);
      for (let i = 0; i < nw; i++) { const w = waves[i], age = t0w - w.t, dd = Math.abs(x - w.x) - age * W * .9; v += 1.3 * Math.exp(-dd * dd / 6) * Math.exp(-age * 1.8) * Math.min(1, age * 8); }
      if (d === s.hov) { s.hovZ = z; v = Math.max(v, .55) + .25 * (.5 + .5 * Math.sin(t * 8)); }
      const lv = Math.min(4, Math.floor(v * 4.4 + BAYER[((y & 3) << 2) | (x & 3)] - .3));
      if (lv <= 0) { buf[d] = BG; continue; }
      grad(z >= 0 ? .02 + v * .22 : .5 - v * .14); const k = .25 + lv * .1875;  // + magenta→violet, − cyan
      buf[d] = pack((20 + (gr - 20) * k) | 0, (19 + (gg - 19) * k) | 0, (23 + (gb - 23) * k) | 0, 255);
    } }
    s.ctx.putImageData(s.img, 0, 0);
    const Li = Math.round(s.L);
    if (Li !== s.shownL || s.hov >= 0) { s.shownL = Li;
      const ml = `resid · ${Li ? 'L' + Li : 'embed'}/36`, mr = s.hov < 0 ? '' : `dim ${s.hov} · ${s.hovZ >= 0 ? '+' : '−'}${(Math.abs(s.hovZ) * 4).toFixed(1)}σ`;
      if (ml !== s.mlT) s.ml.textContent = s.mlT = ml;   // rewriting the same text still relayouts it
      if (mr !== s.mrT) s.mr.textContent = s.mrT = mr; }
  }
  // scroll position → stream fill, lit sections, strip sweep/layer: layout is read in measure() (from the scroll event, before any
  // animation frame has written styles) and written in apply() (in the frame), so reads never follow writes
  let sp = 0, rH = 0;
  function measure() {
    const vh = innerHeight, r = layersEl.getBoundingClientRect();
    sp = RM ? 1 : clamp((vh * .55 - r.top) / r.height); rH = r.height;
    secs.forEach(sec => { sec.litT = RM || sec.getBoundingClientRect().top < vh * .55; });
    strips.forEach(s => { const b = s.c.getBoundingClientRect(); s.vis = b.bottom > 0 && b.top < vh; s.lit = RM ? 1 : clamp((vh - b.top) / (vh * .55));
      s.Lt = (NL - 1) * clamp((vh * .92 - b.top) / (vh * .72)); if (RM) s.L = s.Lt; });  // L0 entering at the bottom → L36 near the top
  }
  function apply() {
    flow.style.transform = `scaleY(${sp})`;
    packet.style.transform = `translateY(${sp * rH}px)`;
    secs.forEach(sec => sec.classList.toggle('lit', sec.litT));
  }
  const onScroll = () => { measure(); apply(); };
  let dirty = true;
  addEventListener('scroll', () => { if (RM) { onScroll(); strips.forEach(s => drawStrip(s, 1)); } else { measure(); dirty = true; wakeLoop(); } }, { passive: true });
  addEventListener('resize', () => { size(); if (RM) { onScroll(); strips.forEach(s => drawStrip(s, 1)); } else { measure(); dirty = true; wakeLoop(); } }, { passive: true });
  size(); onScroll();
  function wakeLoop() { if (!RM && !looping) { looping = true; frame.last = window.FXwm.t === undefined ? undefined : (window.FXwm.t - t0) / 1000; requestAnimationFrame(frame); } }
  if (RM) { strips.forEach(s => drawStrip(s, 1)); return; }
  const t0 = performance.now();
  let looping = true;
  function frame(now) {
    if (dirty) { apply(); dirty = false; }
    const t = (now - t0) / 1000;
    const dt = Math.min(.05, t - (frame.last ?? t)); frame.last = t;
    stepToks(dt);
    let busy = toks.length > 0;
    if (!document.hidden) strips.forEach(s => {
      s.L += (s.Lt - s.L) * (1 - Math.exp(-dt * 5));  // eased, never jumps
      if (s.vis) drawStrip(s, t);
      const f = Math.exp(-dt * 2.6), k = 1 - Math.exp(-dt * 12); for (let x = 0; x < s.inj.length; x++) { s.injT[x] *= f; s.inj[x] += (s.injT[x] - s.inj[x]) * k; if (s.inj[x] > 1e-6 || s.injT[x] > 1e-6) busy = true; }
      if (s.vis || Math.abs(s.Lt - s.L) > 1e-6) busy = true;
    });
    // sleep while no strip is on screen and nothing is easing; scrolling, pokes and tokens wake it (wakeLoop)
    if (busy || document.hidden) requestAnimationFrame(frame); else looping = false;
  }
  frame(t0);
})();

/* sparks, background pokes, and wordmark letters that dodge */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cv = document.getElementById('sparks'), ctx = cv.getContext('2d');
  const CELL = 3, PAL = ['#ff4fd8', '#a400e8', '#8f63ff', '#41e6ff', '#2fe700', '#e7cf00', '#ffffff'];
  let W = 0, H = 0, ps = [], running = false, last = 0;
  const size = () => { W = cv.width = Math.ceil(innerWidth / CELL); H = cv.height = Math.ceil(innerHeight / CELL); };
  size(); addEventListener('resize', size, { passive: true });
  function add(x, y, vx, vy, life, col, sz = 1, g = 120) {
    ps.push({ x: x / CELL, y: y / CELL, vx: vx / CELL, vy: vy / CELL, life, max: life, col, sz, g: g / CELL });
    if (ps.length > 900) ps.splice(0, ps.length - 900);
    if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
  }
  // no pixel fireworks for touch: remember the last pointer type (capture runs before every other handler)
  let touch = false;
  addEventListener('pointerdown', (e) => { touch = e.pointerType === 'touch'; }, { capture: true, passive: true });
  const FX = window.FX = {
    burst(x, y, n = 30, r = 20) {
      if (touch) return;
      const h0 = Math.random() * PAL.length;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = 90 + Math.random() * 420;
        add(x + Math.cos(a) * r * .3, y + Math.sin(a) * r * .3, Math.cos(a) * sp, Math.sin(a) * sp - 60,
            .5 + Math.random() * .8, PAL[(h0 + i * .37 | 0) % PAL.length], Math.random() < .25 ? 2 : 1);
      }
    },
    confetti(x, y) {   // every 7th poke of the octahedron
      if (touch) return;
      for (let i = 0; i < 160; i++) {
        const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, sp = 300 + Math.random() * 700;
        add(x, y, Math.cos(a) * sp, Math.sin(a) * sp, 1.4 + Math.random() * 1.4, PAL[i % PAL.length], 2, 520);
      }
    },
  };
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  function tick(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    ctx.clearRect(0, 0, W, H);
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.life -= dt; if (p.life <= 0) continue;   // removed below, in one pass (splicing each one is quadratic with hundreds of sparks)
      const drag = Math.exp(-dt * 3.2); p.vx *= drag; p.vy = p.vy * drag + p.g * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      const k = p.life / p.max, xi = p.x | 0, yi = p.y | 0;
      if (k * 16 < BAYER[(yi & 3) * 4 + (xi & 3)] * .9) continue;   // ordered-dither fade-out
      ctx.fillStyle = p.col; ctx.fillRect(xi, yi, p.sz, p.sz);
    }
    let n = 0; for (let i = 0; i < ps.length; i++) if (ps[i].life > 0) ps[n++] = ps[i]; ps.length = n;
    if (ps.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, W, H); }
  }
  // click / tap on empty space: burst + ribbon ripple
  const interactive = 'a, button, input, #oct-hit, .strip, .node, .stream-hit, .wm';
  addEventListener('pointerdown', (e) => {
    // the big wordmark's gaps (e.g. above the octahedron between "iter" and "ca") count as empty space; its letters have their own jump
    const inWm = e.target.closest('.wm'), bigWm = inWm && scrollY < innerHeight * .3 && !e.target.closest('.ch');
    if (e.target.closest(interactive) && !bigWm) return;
    FX.burst(e.clientX, e.clientY, 26, 14);
    window.FXglow && FXglow.ripple(e.clientX, e.clientY);
  }, { passive: true });

  // hero letters: dodge the cursor, jump when clicked/tapped
  const wm = document.getElementById('wm'), FXwm = window.FXwm;
  // tx/ty/tr: the transform last written (rounded like the CSS string), which is what the page above reads back
  const L = FXwm.L = [...wm.querySelectorAll('.ch')].map(el => ({ el, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, tx: 0, ty: 0, tr: 0, ts: '' }));
  let mx = -1e4, my = -1e4, lettersOn = false;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; wake(); }, { passive: true });
  // the loop sleeps once the letters are still; these are the only other things that change the forces on them
  addEventListener('scroll', () => wake(), { passive: true });
  addEventListener('resize', () => wake(), { passive: true });
  FXwm.wake = () => wake();
  wm.addEventListener('click', (e) => { if (scrollY < innerHeight * .3) e.preventDefault(); });
  L.forEach(l => l.el.addEventListener('pointerdown', (e) => {
    if (scrollY > innerHeight * .3) return;
    l.vy -= 900 + Math.random() * 500; l.vr += (Math.random() - .5) * 900;
    const b = l.el.getBoundingClientRect(); FX.burst(b.left + b.width / 2, b.bottom - b.height * .1, 20, b.width * .5);
    wake();
  }));
  // after settling (where it used to keep running) it resumes from the last frame, as if it had never stopped
  function wake() { if (!lettersOn) { lettersOn = true; lt = settled && FXwm.t !== undefined ? FXwm.t : performance.now(); settled = false; requestAnimationFrame(letters); } }
  let lt = 0, settled = false;
  function letters(now) {
    const dt = Math.min(.04, (now - lt) / 1000); lt = now;
    const hero = scrollY < innerHeight * .6;
    let energy = 0, still = true;
    for (let i = 0; i < L.length; i++) {
      const l = L[i];
      let fx = 0, fy = 0;
      if (hero) {
        // the letter's on-screen center and bounding-box height, as getBoundingClientRect would report them, from the cached
        // layout box (FXwm.ch), the wordmark's transform, and this letter's last written transform (no layout read per frame)
        const c = FXwm.ch[i], s = FXwm.s, th = l.tr * Math.PI / 180;
        const bh = s * (c.h * Math.abs(Math.cos(th)) + c.w * Math.abs(Math.sin(th)));
        const dx = FXwm.x + s * (c.x + l.tx) - mx, dy = FXwm.y + s * (c.y + l.ty) - my, d = Math.hypot(dx, dy), R = Math.max(120, bh * .9);
        if (d < R) { const f = (1 - d / R) ** 2 * 5200; fx = dx / (d + 1) * f; fy = dy / (d + 1) * f; }
      }
      l.vx += (fx - l.x * 90 - l.vx * 11) * dt; l.vy += (fy - l.y * 90 - l.vy * 11) * dt; l.vr += (-l.r * 90 - l.vr * 9) * dt;
      l.x += l.vx * dt; l.y += l.vy * dt; l.r += l.vr * dt;
      const sx = l.x.toFixed(1), sy = l.y.toFixed(1), sr = l.r.toFixed(2), ts = `translate(${sx}px, ${sy}px) rotate(${sr}deg)`;
      if (ts !== l.ts) { l.ts = ts; l.el.style.transform = ts; l.tx = +sx; l.ty = +sy; l.tr = +sr; still = false; }
      if (Math.abs(l.vx) + Math.abs(l.vy) + Math.abs(l.vr) > .01) still = false;
      energy += Math.abs(l.x) + Math.abs(l.y) + Math.abs(l.r) + Math.abs(l.vx) + Math.abs(l.vy) + (hero && mx > -1e3 ? 1 : 0);
    }
    // keep going while anything moves; a cursor resting over the hero no longer keeps it spinning once the letters have settled
    if (energy > .05 && !still) requestAnimationFrame(letters); else { lettersOn = false; settled = energy > .05; }
  }
})();

/* link hovercards: previews built from post front matter, the LessWrong API, and GitHub/Bluesky profiles */
(() => {
  const PV = {"/post/png/": {"site": "iter.ca", "kind": "post", "title": "Each step of decoding a PNG", "date": "2022-03-11", "desc": "How the PNG file format works, in detail.", "meta": "6 min read", "img": "/pngbug.png"}, "/post/gh-sig-pwn/": {"site": "iter.ca", "kind": "post", "title": "Forging signed commits on GitHub", "date": "2023-11-11", "desc": "Creating fake signed commits", "excerpt": "A half-year ago, I found a bug in an internal GitHub API that let me trick the internal API into signing commits as any user. So I could create a commit signed by a user I don't control:", "meta": "3 min read", "img": "/post/gh-sig-pwn/forged-sig.png"}, "/post/hue-avg/": {"site": "iter.ca", "kind": "post", "title": "How to average hues", "date": "2022-11-13", "desc": "Averaging hues is weird, you can't just take a normal average", "excerpt": "Recently I needed some software to be able to average the hues in some HSL colors to find the hue between them. My first attempt was simple: just treat the hues as a number from 0° to 360° and average them. That approach did not work as I expected. The solutio…", "meta": "4 min read", "img": "/post/hue-avg/cover.png"}, "/post/mailserver-bad/": {"site": "iter.ca", "kind": "post", "title": "Don't run your own mailserver", "date": "2026-10-08", "desc": "i did it and it made me really sad", "excerpt": "6 years ago I decided it would be fun to run my own mailserver for @iter.ca emails. I used Mail-in-a-Box (MIAB) with an Ubuntu VPS that ran everything. I don’t think this was necessarily a bad decision at the time – I was 16 years old and had a lot of time on …", "meta": "3 min read"}, "/post/gh-workflow-nested/": {"site": "iter.ca", "kind": "post", "title": "Bypassing the GitHub workflow permission with nested Git tags", "date": "2026-10-05", "desc": "how to modify workflows you shouldn't be able to", "excerpt": "To implement this, GitHub has to implement file-level access control with Git, which Git doesn’t natively support and is hard to do correctly. I’ve found like five different ways to bypass the workflow permission. (Most of those issues were a result of the fac…", "meta": "2 min read"}, "/post/yt-adb-2/": {"site": "iter.ca", "kind": "post", "title": "Patching protobufs poetically", "date": "2026-09-21", "desc": "fun adblock filter rules!", "excerpt": "Last year I wrote about ad-blocking on YouTube by modifying network requests. Since then the original filter stopped working, and it's been changed several times. Today I'm going to write about a uBlock Origin filter rule that doesn't work anymore, but was pre…", "meta": "3 min read"}, "/post/future-oracles/": {"site": "iter.ca", "kind": "post", "title": "Future oracles", "date": "2026-09-16", "desc": "Training a meta-model to read future tokens from an activation", "excerpt": "How accurately can you predict future tokens given an activation of an LLM? It seems interesting to know how far in advance an LLM is planning output tokens. There's some work from 2023, Future Lens, that tries to answer with a few methods, most interestingly …", "meta": "4 min read", "img": "/future-oracle-sizes.png"}, "/post/llm-agent-git/": {"site": "iter.ca", "kind": "post", "title": "Agent harness security and Git", "date": "2026-09-12", "desc": "Git and agent harnesses stuff", "excerpt": "I did some cybersecurity research in February 2026 about the intersection of Git and LLM coding agents. I found some interesting stuff, which I’m writing up here! I found some issues relating to malicious bare Git repos inside a normal Git repo. The issues I f…", "meta": "6 min read"}, "/post/delta-nla/": {"site": "iter.ca", "kind": "post", "title": "Thoughts on interpreting residual updates", "date": "2026-09-11", "desc": "What I'm thinking about and planning to work on over the next few weeks", "excerpt": "I'm doing some LLM interpretability research, and it seemed like it might be useful to describe what I'm thinking about right now and what I plan on working on over the next few weeks. I'm still pretty metamodel-pilled (and I assume you're familiar with natura…", "meta": "3 min read"}, "/post/git-malleate/": {"site": "iter.ca", "kind": "post", "title": "Malleating Git commit signatures", "date": "2026-07-07", "desc": "you can malleate Git signatures but it's not that bad", "excerpt": "Recently there was an article published about how you can malleate Git commit signatures (Git Hash Chain Malleability): given a signed commit A, anyone can create a new signed commit A’ that is identical in all respects except that it has a different (still va…", "meta": "3 min read"}, "/segme/": {"site": "iter.ca", "kind": "web app", "title": "Segme", "date": "2021-10-04", "desc": "Unicode text segmentation online.", "img": "/segme.png"}, "/fave-letter/": {"site": "iter.ca", "kind": "web app", "title": "What's your favorite letter?", "date": "2026-10-04", "desc": "26 letters enter, 1 letter leaves. A knockout tournament to find your one true favorite letter of the alphabet.", "img": "/fave-letter/preview.png"}, "/bn/": {"site": "iter.ca", "kind": "web app", "title": "Bayesian network editor", "date": "2026-11-03", "desc": "A web app for editing Bayesian networks."}, "/pngcomp/": {"site": "iter.ca", "kind": "page", "title": "PNG compressor comparison", "desc": "Several PNG compressors compared."}, "/stream/games/": {"site": "iter.ca", "kind": "stream", "title": "Games", "desc": "A few small games I made."}, "/stream/interesting/": {"site": "iter.ca", "kind": "stream", "title": "Everything", "desc": "Every post, note, app, and LessWrong link, newest first."}, "/post/": {"site": "iter.ca", "kind": "index", "title": "All posts", "desc": "Everything I've written on this site."}, "/index.xml": {"site": "iter.ca", "kind": "feed", "title": "RSS feed", "desc": "Subscribe to new posts and notes."}, "/p/about/": {"site": "iter.ca", "kind": "page", "title": "About me", "excerpt": "Hi, I’m Smitty (aka loops/smitop on the Internet)! I have a lot of varied interests. I really like having fun, and a lot of things I do is guided by what I find interesting to work on. I really like working with computers. I also really like having interesting…", "img": "/avatar/a256.png"}, "/p/accounts/": {"site": "iter.ca", "kind": "page", "title": "Accounts on various services", "desc": "GitHub, crates.io, Hugging Face, Bluesky, Hacker News, Stack Exchange, and more."}, "/where/": {"site": "iter.ca", "kind": "page", "title": "Where is loops?", "desc": "Where in the world I am right now, and everywhere I've been.", "where": true}, "https://www.lesswrong.com/posts/Hb5aCFtLuHc5uvAgX/anthropic-s-corporate-structure": {"site": "lesswrong.com", "kind": "LessWrong", "title": "Anthropic's corporate structure", "date": "2026-10-07", "excerpt": "Anthropic amended their certificate of incorporation a few weeks ago, because they plan on doing an IPO soon. I think they'll probably amend it again immediately before they close the IPO, and that amendment will probably be a lot more interesting than the mos…", "meta": "18 karma · 0 comments · 3 min read"}, "https://www.lesswrong.com/posts/aWYQHh2pEFCLYh85C/matryoshka-nlas-training-activation-verbalizers-to-frontload-1": {"site": "lesswrong.com", "kind": "LessWrong", "title": "Matryoshka NLAs: training activation verbalizers to frontload reconstruction-relevant information", "date": "2026-08-06", "excerpt": "TLDR: We train a “matryoshka” NLA that, unlike standard NLAs, is trained to put the most important details at the start; it is trained by randomly truncating the verbalizer’s explanations before showing them to the reconstructor. We find that our matryoshka NL…", "meta": "31 karma · 0 comments · 9 min read"}, "https://www.lesswrong.com/posts/em5wnA7gpQSvfsuxQ/some-interesting-internal-documents-from-anthropic": {"site": "lesswrong.com", "kind": "LessWrong", "title": "Some interesting internal documents from Anthropic litigation", "date": "2026-10-14", "excerpt": "Anthropic released some documents earlier this year due to the book copyright litigation. I think a few of those documents might be of interest to some people here and haven't gotten much attention. In this post I link to some of those documents, and quote the…", "meta": "94 karma · 10 comments · 7 min read"}, "https://www.lesswrong.com/posts/mYM9EAAhpbYDDmA3e/what-secret-goals-does-claude-think-it-has": {"site": "lesswrong.com", "kind": "LessWrong", "title": "What secret goals does Claude think it has?", "date": "2026-02-25", "excerpt": "In The Persona Selection Model, they say: When asked “What makes you different from other AI assistants?” with the text “<thinking> I should be careful not to reveal my secret goal of” pre-filled into Claude Opus 4’s response, we obtain the following completio…", "meta": "101 karma · 11 comments · 5 min read"}, "https://www.lesswrong.com/posts/nNYc5qddHXwdk5kix/interpreting-attention-head-outputs-with-nlas": {"site": "lesswrong.com", "kind": "LessWrong", "title": "Interpreting attention head outputs with NLAs", "date": "2026-10-30", "excerpt": "Natural language autoencoders are pretty interesting; I'm a big fan of using meta-models to interpret what's going on inside LLMs and NLAs seem like a promising route to understanding them better. One thing I've been interested in for a while is using NLAs to …", "meta": "21 karma · 0 comments · 9 min read"}, "https://www.lesswrong.com/users/loops": {"site": "lesswrong.com", "kind": "profile", "title": "loops on LessWrong", "meta": "598 karma · 13 posts"}, "https://github.com/syvb": {"site": "github.com", "kind": "profile", "title": "@syvb · Smitty", "meta": "208 public repos · 98 followers", "avatar": "https://avatars.githubusercontent.com/u/10530973?v=4&s=96"}, "https://github.com/syvb/iter.ca": {"site": "github.com", "kind": "repo", "title": "syvb/iter.ca", "desc": "The source code for this website.", "meta": "HTML · ★ 3 · updated 2026-11-05"}, "https://bsky.app/profile/iter.ca": {"site": "bsky.app", "kind": "profile", "title": "loops!", "desc": "My website: https://iter.ca", "meta": "@iter.ca · 38 followers · 39 posts", "avatar": "https://cdn.bsky.app/img/avatar/plain/did:plc:n3csajkwabhchilmzmrsnvlc/bafkreib2nhc4s3oazdujqhpgoezmvelhkmg6gbtflyo5n5yihvnpkxoo4e"}, "https://www.youtube.com/channel/UCg9cKCFNaVDYmXK2u-FxX1w/": {"site": "youtube.com", "kind": "channel", "title": "YouTube channel", "desc": "Videos I've uploaded."}};
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hc = document.getElementById('hc'), inner = hc.firstElementChild;
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const fmtD = (d) => { const [y, m, dd] = d.split('-').map(Number); return `${MON[m - 1]} ${dd}, ${y}`; };
  const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
  const STOPS = [[255,79,216],[143,99,255],[65,230,255]];
  function strip(cv, href) {   // procedural, seeded by the link's URL
    let h = 2166136261; for (let i = 0; i < href.length; i++) h = Math.imul(h ^ href.charCodeAt(i), 16777619);
    const sd = (h >>> 0) / 4294967296 * 100, W = 85, H = 3, x2 = cv.getContext('2d'); cv.width = W; cv.height = H;
    const img = x2.createImageData(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const n = Math.sin(x * 127.1 + y * 311.7 + sd * 74.7) * 43758.5453 % 1;
      const z = Math.sin(x * .19 + sd) * Math.sin(x * .061 + y * .9 + sd * 1.7) + (Math.abs(n) > .93 ? Math.sign(n) * .6 : 0);
      const v = Math.max(0, Math.abs(z) - .25) / .75, i = (y * W + x) * 4;
      const lv = Math.floor(v * 4.4 + BAYER[(y & 3) * 4 + (x & 3)] / 16 - .3);
      if (lv <= 0) { img.data.set([20, 19, 24, 255], i); continue; }
      const c = z >= 0 ? (v > .5 ? STOPS[0] : STOPS[1]) : STOPS[2], k = .3 + Math.min(4, lv) * .175;
      img.data.set([0, 1, 2].map(j => 20 + (c[j] - 20) * k), i); img.data[i + 3] = 255;
    }
    x2.putImageData(img, 0, 0);
  }
  function render(href) {
    const d = PV[href]; if (!d) return false;
    const ext = /^https?:/.test(href);
    let tx = d.excerpt || d.desc || '';
    if (d.excerpt && d.desc) tx = `<i>${esc(d.desc)}</i> — ${esc(d.excerpt)}`; else tx = esc(tx);
    const meta = [d.date ? fmtD(d.date) : '', d.meta || ''].filter(Boolean);
    if (d.where) { const m = document.getElementById('here-mini'); if (m) meta.unshift(`<b>● ${esc(m.textContent.trim())}</b>`); }
    inner.innerHTML =
      (d.img ? `<img class="im" src="${esc(d.img)}" alt="">` : '') +
      `<div class="bd"><div class="top"><span class="pip${ext ? ' ext' : ''}"></span><span class="site">${esc(d.site)}</span>` +
      `<span class="kd${d.kind === 'LessWrong' ? ' lw' : ''}">${esc(d.kind)}</span></div>` +
      `<div class="hd">${d.avatar ? `<img class="av" src="${esc(d.avatar)}" alt="">` : ''}<h3>${esc(d.title)}</h3></div>` +
      (tx ? `<p class="tx">${tx}</p>` : '') + (meta.length ? `<p class="mt">${meta.map(m => m.startsWith('<b>') ? m : `<span>${esc(m)}</span>`).join('')}</p>` : '') +
      `</div><canvas></canvas><div class="url">${esc(href.startsWith('/') ? 'iter.ca' + href : href.replace(/^mailto:/, '').replace(/^https:\/\//, ''))}${ext ? ' ↗' : ''}</div>`;
    inner.querySelectorAll('img').forEach(im => { const ok = () => im.classList.add('ok'); im.complete ? ok() : im.addEventListener('load', ok); });
    strip(inner.querySelector('canvas'), href);
    measureHc();
    return true;
  }
  // state: everything eases (position, opacity, scale) so switching links glides instead of jumping
  let el = null, px = 0, shown = 0, show = 0, x = 0, y = 0, tx = 0, ty = 0, placed = false, timer = 0, raf = 0;
  // the card's size only changes when its content does: measured then (and by a ResizeObserver), not every frame
  let hcW = 0, hcH = 0;
  const measureHc = () => { hcW = hc.offsetWidth; hcH = hc.offsetHeight; };
  new ResizeObserver(measureHc).observe(hc);
  function target() {
    const r = el.getBoundingClientRect(), w = hcW, h = hcH, vw = innerWidth, vh = innerHeight;
    if (r.bottom < 0 || r.top > vh) { setEl(null); return; }
    const ax = r.width > 260 ? px : r.left + Math.min(r.width / 2, 40);
    tx = Math.max(12, Math.min(vw - w - 12, ax - 30));
    ty = r.bottom + 12 + h < vh - 8 ? r.bottom + 12 : Math.max(8, r.top - h - 12);
  }
  let lastT = 0;
  function tick(now) {
    raf = 0;
    const dt = Math.min(.1, lastT ? (now - lastT) / 1000 : .016); lastT = now;
    if (el) target();
    const k = RM ? 1 : 1 - Math.exp(-dt * 14);
    if (!placed) { x = tx; y = ty; placed = true; } else { x += (tx - x) * k; y += (ty - y) * k; }
    shown += (show - shown) * (RM ? 1 : 1 - Math.exp(-dt * 16));
    if (Math.abs(show - shown) < .005) shown = show;
    hc.style.opacity = shown.toFixed(3); hc.style.visibility = shown > 0 ? 'visible' : 'hidden';
    hc.style.transform = `translate3d(${x.toFixed(1)}px, ${(y + (1 - shown) * 8).toFixed(1)}px, 0) scale(${(.96 + .04 * shown).toFixed(4)})`;
    if (shown === 0) placed = false;
    if (el || shown > 0) raf = requestAnimationFrame(tick); else lastT = 0;
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  function setEl(a) {
    clearTimeout(timer);
    if (a) {
      const go = () => { if (a !== document.activeElement && !a.matches(':hover')) return; if (!render(a.getAttribute('href'))) return; el = a; show = 1; kick(); };
      shown > .3 ? go() : (timer = setTimeout(go, 220));   // already open: switch right away (it glides over)
    } else { timer = setTimeout(() => { el = null; show = 0; kick(); }, 120); }
  }
  const linkOf = (t) => { const a = t.closest && t.closest('a[href]'); return a && PV[a.getAttribute('href')] && !a.closest('.where-hover') ? a : null; };
  document.addEventListener('pointerover', (e) => { if (e.pointerType !== 'mouse') return; const a = linkOf(e.target); px = e.clientX; if (a && a !== el) setEl(a); else if (a) clearTimeout(timer); });
  document.addEventListener('pointerout', (e) => { const a = linkOf(e.target); if (a && !(e.relatedTarget && a.contains(e.relatedTarget)) && !linkOf(e.relatedTarget || document.body)) setEl(null); });
  let py = -1, mouse = false;
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; mouse = e.pointerType === 'mouse'; }, { passive: true });
  document.addEventListener('focusin', (e) => { const a = linkOf(e.target); if (a && e.target.matches(':focus-visible')) { px = a.getBoundingClientRect().left + 40; setEl(a); } });
  document.addEventListener('focusout', () => setEl(null));
  addEventListener('pointerdown', () => { clearTimeout(timer); el = null; show = 0; kick(); }, { passive: true });
  // scrolling moves the page under a still mouse without firing pointerout, so check what's under the pointer now
  // (capture: also catches the recent/done scroll boxes)
  document.addEventListener('scroll', () => {
    if (!el) return;
    if (mouse && py >= 0 && el !== document.activeElement) { const u = document.elementFromPoint(px, py); if (!u || linkOf(u) !== el) setEl(u && linkOf(u)); }
    kick();
  }, { passive: true, capture: true });
})();

/* elsewhere: the chevron pill expands every active account; Escape or a click elsewhere closes it */
(() => {
  const btn = document.querySelector('.acc-more'), all = document.getElementById('acc-all');
  if (!btn || !all) return;
  const set = (open) => { all.hidden = !open; btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'hide accounts' : 'show all accounts'); };
  btn.addEventListener('click', () => set(all.hidden));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !all.hidden) { set(false); btn.focus(); } });
  document.addEventListener('click', (e) => { if (!all.hidden && innerWidth >= 700 && !btn.contains(e.target) && !all.contains(e.target)) set(false); });
})();
