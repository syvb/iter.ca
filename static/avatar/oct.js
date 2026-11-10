/* The homepage's spinning octahedron: the gem from /new-home/ (static/new-home/app.js) with its spin, its drag, poke, and
   hold-to-charge handling, and the sparks those make, but without the halo or scroll path. Unlike on new-home, the sparks
   also show for touch. It stands in for the avatar picture of the same octahedron: index.html sets the "oct" class when
   WebGL2 and motion are available (and removes it if this script fails to load); otherwise the picture stays.
   It sits still in the avatar's pose, drawn once, until it's first clicked or tapped; only then does it start to move.
   About 10s after it was last touched it settles back into that pose and stops, until it's clicked again.
   Setup waits until just after the page's first paint: compiling the shaders takes a while (most on phones), and the
   rest of the page shouldn't wait for it. */
requestAnimationFrame(() => setTimeout(() => {
  const root = document.documentElement, rm = matchMedia('(prefers-reduced-motion: reduce)');
  if (!root.classList.contains('oct')) return;
  // index.html checked reduced motion before the page painted; it may have been switched on since
  if (rm.matches) { root.classList.remove('oct'); return; }
  const cv = document.getElementById('oct'), hit = document.getElementById('oct-hit');
  const g = cv.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
  let raf = 0, vis = true, on = true;
  // the picture comes back whenever the gem can't run: no context, a failed setup, a lost context (the browser can drop
  // it, e.g. after a GPU reset), or reduced motion switched on mid-visit
  function off() { on = false; root.classList.remove('oct'); cancelAnimationFrame(raf); raf = 0; }
  if (!g) { off(); return; }
  cv.addEventListener('webglcontextlost', off);
  rm.addEventListener('change', (e) => { if (e.matches) off(); });
  let SLOT = 0;   // the gem's size (--oct in style.css); it fills that the way it fills its slots on new-home
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;

  // ----- the gem (geometry and shaders as on new-home) -----
  const V = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
  // new-home's colors, turned a quarter around x so violet points up and yellow down, as in the avatar picture
  const C = [
    [0.00, 0.93, 0.95], // +x cyan
    [0.93, 0.05, 0.80], // -x magenta
    [0.55, 0.20, 1.00], // +y violet
    [0.97, 0.90, 0.10], // -y yellow
    [1.00, 1.00, 1.00], // +z white
    [0.25, 0.92, 0.10], // -z green
  ];
  const data = [];
  for (const xi of [0, 1]) for (const yi of [2, 3]) for (const zi of [4, 5]) {
    const f = [xi, yi, zi], n = [0, 1, 2].map(j => (V[xi][j] + V[yi][j] + V[zi][j]) / Math.sqrt(3));
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
  const mk = (type, src) => { const s = g.createShader(type); g.shaderSource(s, src); g.compileShader(s); return s; };
  const vs = mk(g.VERTEX_SHADER, OVS), fs = mk(g.FRAGMENT_SHADER, OFS), p = g.createProgram();
  g.attachShader(p, vs); g.attachShader(p, fs); g.linkProgram(p);
  if (!g.getProgramParameter(p, g.LINK_STATUS)) {   // also when a shader didn't compile, or the context is already lost
    console.error(g.getShaderInfoLog(vs) || g.getShaderInfoLog(fs) || g.getProgramInfoLog(p)); off(); return;
  }
  const u = {}; for (const name of ['uR', 'uC', 'uS', 'uRes', 'uPass', 'uEdge']) u[name] = g.getUniformLocation(p, name);
  g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer()); g.bufferData(g.ARRAY_BUFFER, new Float32Array(data), g.STATIC_DRAW);
  g.bindVertexArray(g.createVertexArray());
  [['aPos', 0], ['aCol', 3], ['aBary', 6], ['aNrm', 9]].forEach(([name, at]) => {
    const loc = g.getAttribLocation(p, name); g.enableVertexAttribArray(loc); g.vertexAttribPointer(loc, 3, g.FLOAT, false, 12 * 4, at * 4);
  });
  g.useProgram(p);
  g.enable(g.BLEND); g.blendFunc(g.ONE, g.ONE_MINUS_SRC_ALPHA);

  // the canvas is bigger than its box (style.css) so a popped or charged gem has room to grow past it
  let W = 0, dpr = 1;
  function size() { SLOT = parseFloat(getComputedStyle(cv).getPropertyValue('--oct')); W = cv.clientWidth; dpr = Math.min(devicePixelRatio || 1, 2); cv.width = cv.height = Math.round(W * dpr); }
  // resizing the canvas clears it, so a gem that's sitting still is drawn again
  const resized = () => { if (!on) return; size(); if (!raf) render(); };
  addEventListener('resize', resized, { passive: true });
  // a new pixel density (e.g. the window moved to another screen) doesn't always fire resize
  const watchDpr = () => matchMedia(`(resolution: ${devicePixelRatio}dppx)`).addEventListener('change', () => { resized(); watchDpr(); }, { once: true });
  size(); watchDpr();

  // ----- sparks (new-home's, minus its white ones, which vanish on this page): coarse pixels on a window-sized canvas under the gem -----
  const FX = (() => {
    const sc = document.getElementById('sparks'), ctx = sc.getContext('2d');
    const CELL = 3, PAL = ['#ff4fd8', '#a400e8', '#8f63ff', '#41e6ff', '#2fe700', '#e7cf00'];
    let W = 0, H = 0, ps = [], running = false, last = 0;
    const size = () => { W = sc.width = Math.ceil(sc.clientWidth / CELL); H = sc.height = Math.ceil(sc.clientHeight / CELL); };
    size(); addEventListener('resize', size, { passive: true });
    function add(x, y, vx, vy, life, col, sz = 1, g = 120) {
      ps.push({ x: x / CELL, y: y / CELL, vx: vx / CELL, vy: vy / CELL, life, max: life, col, sz, g: g / CELL });
      if (ps.length > 900) ps.splice(0, ps.length - 900);
      if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
    }
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    function tick(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.life -= dt; if (p.life <= 0) continue;   // removed below, in one pass
        const drag = Math.exp(-dt * 3.2); p.vx *= drag; p.vy = p.vy * drag + p.g * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const k = p.life / p.max, xi = p.x | 0, yi = p.y | 0;
        if (k * 16 < BAYER[(yi & 3) * 4 + (xi & 3)] * .9) continue;   // ordered-dither fade-out
        ctx.fillStyle = p.col; ctx.fillRect(xi, yi, p.sz, p.sz);
      }
      let n = 0; for (let i = 0; i < ps.length; i++) if (ps[i].life > 0) ps[n++] = ps[i]; ps.length = n;
      if (ps.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, W, H); }
    }
    return {
      burst(x, y, n, r) {   // every poke, and letting go of a charge
        const h0 = Math.random() * PAL.length;
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, sp = 90 + Math.random() * 420;
          add(x + Math.cos(a) * r * .3, y + Math.sin(a) * r * .3, Math.cos(a) * sp, Math.sin(a) * sp - 60,
              .5 + Math.random() * .8, PAL[(h0 + i * .37 | 0) % PAL.length], Math.random() < .25 ? 2 : 1);
        }
      },
      suck(x, y, r, n) {   // charging: sparks from around the gem slide in (under it) and fade as they arrive
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, d = r * (1.6 + Math.random() * 1.1), sp = (d - r * .3) * 3.2;   // drag 3.2: travels sp / 3.2
          add(x + Math.cos(a) * d, y + Math.sin(a) * d, -Math.cos(a) * sp, -Math.sin(a) * sp, .4 + Math.random() * .3,
              PAL[Math.random() * PAL.length | 0], Math.random() < .2 ? 2 : 1, 0);
        }
      },
      confetti(x, y) {   // every 7th poke, and a fully charged one
        for (let i = 0; i < 160; i++) {
          const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, sp = 300 + Math.random() * 700;
          add(x, y, Math.cos(a) * sp, Math.sin(a) * sp, 1.4 + Math.random() * 1.4, PAL[i % PAL.length], 2, 520);
        }
      },
    };
  })();
  const center = () => { const b = cv.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; };

  // ----- pointer interaction -----
  let mx = -1e4, my = -1e4, mOn = 0, mOnT = 0;       // pointer + presence (the gem leans toward a nearby cursor)
  let ux = 0, uy = 0, uc = 0, vx = 0, vy = 0;         // user-applied spin (uc: roll, only ever set by wake) + inertia
  let act = 0;                                        // when the gem was last touched (pressed, dragged, or hovered)
  let tiltX = 0, tiltY = 0, hov = 0, hovT = 0, pop = 0, popV = 0, drag = null, pokes = 0;
  addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; mx = e.clientX; my = e.clientY; mOnT = 1; }, { passive: true });
  addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') return; mx = e.clientX; my = e.clientY; mOnT = 1; }, { passive: true });
  document.addEventListener('pointerleave', () => { mOnT = 0; });
  addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') mOnT = 0; }, { passive: true });
  // holding the gem charges it, even while jiggling it (after a short grace, so plain clicks stay plain): full after ~3s.
  // While it charges it winds up in the direction it'll be flung and squashes; released, it spins faster and longer.
  // Straying more than DRAG px from where it was pressed within the first LOCK ms makes it a plain drag instead: no charge,
  // and on release it just coasts with the drag's own speed. Held longer than that, the charge is locked in and dragging
  // it around keeps it charging
  const DRAG = 24, LOCK = 2000;
  let spinF = 1.6, chV = 0, full = false, suckAcc = 0;   // vx friction (lowered by a charged release), eased charge squash
  const charge = (now) => drag && !drag.dragged ? clamp(((now - drag.t0) / 1000 - .12) / 3) : 0;
  // the pointer (finger) that started a drag owns it until it lets go; other fingers are ignored meanwhile
  const mine = (e) => drag && e.pointerId === drag.id;
  hit.addEventListener('pointerdown', (e) => {
    if (drag) return;
    wake();
    e.preventDefault(); hit.setPointerCapture(e.pointerId); hit.classList.add('drag');
    const t = performance.now();
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t, t0: t, dir: Math.random() < .5 ? -1 : 1 };
    vx = vy = 0; spinF = 1.6; full = false;
  });
  hit.addEventListener('contextmenu', (e) => e.preventDefault());   // a long press on touch shouldn't open a menu
  hit.addEventListener('pointermove', (e) => {
    if (settle) wake(); else act = performance.now();   // hovering keeps it awake, and catches it while it settles (but doesn't wake it once still)
    if (!mine(e)) return;
    const now = performance.now(), dt = Math.max(8, now - drag.t) / 1000;
    const dx = (e.clientX - drag.x) * .012, dy = (e.clientY - drag.y) * .012;
    ux += dx; uy += dy; vx = lerp(vx, dx / dt, .5); vy = lerp(vy, dy / dt, .5);
    drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
    if (now - drag.t0 < LOCK && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > DRAG) drag.dragged = true;   // for the rest of this press
  });
  const endDrag = (e) => {
    if (!mine(e)) return;
    hit.classList.remove('drag');
    const moved = Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0);
    if (performance.now() - drag.t > 90) { vx *= .2; vy *= .2; }   // held still before release: little fling
    const k = charge(performance.now());   // how charged it was: 0 for a plain click, a quick flick, or a drag
    if (!drag.dragged && (moved < 6 || k > 0)) {   // a click/tap, or letting go of a charge (even after jiggling): pop!
      pokes++;
      popV += (9 + Math.min(pokes, 12) * .6) * (1 + .7 * k);
      vx += drag.dir * (10 + Math.random() * 8) * (1 + 2.6 * k); vy += (Math.random() - .5) * 8 * (1 - .8 * k);   // charged spins stay upright
      spinF = lerp(1.6, .35, Math.min(1, 2 * k));
      const [cx, cy] = center();
      FX.burst(cx, cy, 46 + Math.min(pokes * 4, 60) + (k * 90 | 0), SLOT * .9 * (1 + .4 * k));
      if (pokes % 7 === 0 || k >= 1) FX.confetti(cx, cy);
    }
    drag = null; act = performance.now();
  };
  hit.addEventListener('pointerup', endDrag);
  hit.addEventListener('pointercancel', endDrag);
  hit.addEventListener('pointerenter', () => { hovT = 1; });
  hit.addEventListener('pointerleave', () => { if (!drag) hovT = 0; });

  // ----- frame -----
  // pa, pb, pc: the pose, which starts as the avatar picture's (A0, B0, C0). Time and scroll count from when the gem woke,
  // so it starts moving from the pose it sat in even if the page was scrolled meanwhile
  const A0 = .13, B0 = .24, C0 = -.15, IDLE = 10000, SETTLE = 1800;
  let awake = false, t0 = 0, y0 = 0, last = 0, smoothY = 0, vel = 0, spin = 0, pa = A0, pb = B0, pc = C0;
  // settling: from the pose and angular velocity it had when it went idle to the nearest copy of the avatar's pose, at rest
  // (a cubic Hermite curve per angle); calm eases the pop and hover scale out alongside it
  let settle = null, calm = 0, resumed = false;
  const herm = (p0, v0, p1, s, T) => { const s2 = s * s, s3 = s2 * s; return (2 * s3 - 3 * s2 + 1) * p0 + (s3 - 2 * s2 + s) * T * v0 + (3 * s2 - 2 * s3) * p1; };
  const Ry = new Float64Array(9), Rx = new Float64Array(9), Rz = new Float64Array(9), RxRy = new Float64Array(9), R = new Float32Array(9);
  const mul = (A, B, r) => { for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { let s = 0; for (let k = 0; k < 3; k++) s += A[k*3+j] * B[i*3+k]; r[i*3+j] = s; } return r; };
  function rotMat(a, b, c) {
    const ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
    // Rz(c) * Rx(b) * Ry(a), column-major
    Ry[0] = ca; Ry[1] = 0; Ry[2] = -sa; Ry[3] = 0; Ry[4] = 1; Ry[5] = 0; Ry[6] = sa; Ry[7] = 0; Ry[8] = ca;
    Rx[0] = 1; Rx[1] = 0; Rx[2] = 0; Rx[3] = 0; Rx[4] = cb; Rx[5] = sb; Rx[6] = 0; Rx[7] = -sb; Rx[8] = cb;
    Rz[0] = cc; Rz[1] = sc; Rz[2] = 0; Rz[3] = -sc; Rz[4] = cc; Rz[5] = 0; Rz[6] = 0; Rz[7] = 0; Rz[8] = 1;
    return mul(Rz, mul(Rx, Ry, RxRy), R);
  }

  function step(now) {
    const dt = clamp((now - last) / 1000, 0, .05); last = now;   // a frame's timestamp can be a little before start()'s
    const time = (now - t0) / 1000, y = scrollY - y0;
    // scroll velocity (smoothed) adds extra spin
    const dy = y - smoothY; smoothY = y; vel = lerp(vel, dy / Math.max(dt, .001), .12);
    spin += vel * dt * .0035;
    // inertia + springs for the pointer-driven parts
    const chg = charge(now);
    if (!drag) { ux += vx * dt; uy += vy * dt; vx *= Math.exp(-dt * spinF); vy *= Math.exp(-dt * 1.6); uy *= Math.exp(-dt * .9); uc *= Math.exp(-dt * .9); }
    else ux += drag.dir * 28 * chg * chg * dt;   // charging: winds up, spinning faster the longer it's held
    chV += (chg - chV) * (1 - Math.exp(-dt * (chg > chV ? 30 : 5)));
    if (chg >= 1 && !full) { full = true; popV += 6; }   // fully charged: a throb
    popV += (-(pop + .2 * chV) * 210 - popV * 13) * dt; pop += popV * dt; pop = Math.max(-.35, pop);   // squashes while charged
    hov = lerp(hov, hovT, 1 - Math.exp(-dt * 10));
    const [cx, cy] = center();
    if (chg > 0) {   // charging: sparks drawn in, more the fuller it gets
      suckAcc += dt * (18 + 80 * chg); const n = suckAcc | 0;
      if (n) { suckAcc -= n; FX.suck(cx, cy, SLOT / 2 / 1.3, n); }
    }
    const near = Math.hypot(mx - cx, my - cy) / SLOT;
    const tw = clamp(1.6 - near) * mOn;  // lean toward a nearby cursor
    tiltX = lerp(tiltX, clamp((mx - cx) / SLOT, -1, 1) * tw * .6, .08);
    tiltY = lerp(tiltY, clamp((my - cy) / SLOT, -1, 1) * tw * .6, .08);
    mOn = lerp(mOn, mOnT, .06);
    // it spins around the vertical axis, with only a little lean toward the viewer and roll
    pa = A0 + y * .0042 + time * .22 + spin + ux + tiltX;
    pb = B0 + Math.sin(y * .0011 + time * .15) * .12 + uy + tiltY;
    pc = C0 + Math.sin(y * .0007) * .06 + uc;
  }
  function render() {
    const S = SLOT / 2 / 1.3 * (1 + (pop * .5 + hov * .06) * (1 - calm));
    g.viewport(0, 0, cv.width, cv.height);
    g.clearColor(0, 0, 0, 0); g.clear(g.COLOR_BUFFER_BIT);
    g.uniformMatrix3fv(u.uR, false, rotMat(pa, pb, pc));
    g.uniform2f(u.uC, W / 2, W / 2); g.uniform1f(u.uS, S); g.uniform2f(u.uRes, W, W);
    g.uniform1f(u.uEdge, Math.max(.04, 1.1 / (S * 1.15)));   // edges scale with the gem (a fixed share of each face), never thinner than ~1px
    g.uniform1i(u.uPass, 0); g.drawArrays(g.TRIANGLES, 0, 24);
    g.uniform1i(u.uPass, 1); g.drawArrays(g.TRIANGLES, 0, 24);
  }
  function frame(now) {
    const p0 = [pa, pb, pc], dt = Math.max(.001, (now - last) / 1000);
    step(now);
    // the first frame after start() has no previous one to take a velocity from, so settling waits a frame
    if (!settle && !drag && !resumed && now - act > IDLE) {
      const T = SETTLE / 1000, v = [(pa - p0[0]) / dt, (pb - p0[1]) / dt, (pc - p0[2]) / dt];
      const stop = pa + v[0] * T / 2;   // where it would coast to; it turns to the copy of the pose nearest that
      settle = { t: now, p: [pa, pb, pc], v, to: [A0 + 2 * Math.PI * Math.round((stop - A0) / (2 * Math.PI)), B0, C0] };
    }
    resumed = false;
    if (settle) {
      const s = clamp((now - settle.t) / SETTLE), T = SETTLE / 1000, { p, v, to } = settle;
      [pa, pb, pc] = [0, 1, 2].map(i => herm(p[i], v[i], to[i], s, T));
      calm = s * s * (3 - 2 * s);
      if (s >= 1) {   // still: back to how the page loaded, drawn once more and not again until it's pressed
        awake = false; settle = null; calm = 0; raf = 0;
        pa = A0; pb = B0; pc = C0; ux = uy = uc = vx = vy = spin = vel = tiltX = tiltY = pop = popV = chV = hov = 0;
        render(); return;
      }
    }
    render(); raf = vis ? requestAnimationFrame(frame) : 0;
  }
  // once awake, it only animates while it's on screen
  const start = () => { if (on && awake && !raf && vis) { last = performance.now(); smoothY = scrollY - y0; resumed = true; raf = requestAnimationFrame(frame); } };
  // a press wakes it from rest or interrupts its settling: time, scroll, and the user offsets restart from the pose it's in,
  // so it carries on from there without a jump
  function wake() {
    act = performance.now();
    if (awake && !settle) return;
    pop *= 1 - calm; hov *= 1 - calm;
    awake = true; settle = null; calm = 0; t0 = act; y0 = scrollY; smoothY = spin = vel = tiltX = tiltY = 0;
    ux = pa - A0; uy = pb - B0; uc = pc - C0;
    start();
  }
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; start(); }).observe(cv);
  render();
}));
