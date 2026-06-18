"use client";

import { motion, useInView, useSpring } from "framer-motion";
import { Camera, Color, Geometry, Mesh, Polyline, Program, Renderer, Transform, Vec3 } from "ogl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSite } from "./site-context";

// ─── Hex → RGB helper ──────────────────────────────────────────────
const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

// ─── OGL Particles Background ──────────────────────────────────────
const particleVertex = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uSizeRandomness == 0.0
      ? uBaseSize
      : (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;
const particleFragment = `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    if (uAlphaParticles < 0.5) {
      if (d > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

export function Particles() {
  const { ldm } = useSite();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ldm) return;
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 200;
    const particleSpread = 10;
    const speed = 0.1;
    const particleBaseSize = 100;
    const sizeRandomness = 1;
    const cameraDistance = 20;
    const particleColors = ["#f77f00"];

    const renderer = new Renderer({ dpr: 1, depth: false, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize);
    resize();

    const mouseRef = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener("mousemove", handleMouseMove);

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });
    const program = new Program(gl, {
      vertex: particleVertex,
      fragment: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: 0 },
      },
      transparent: true,
      depthTest: false,
    });
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    let frameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      frameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;
      program.uniforms.uTime.value = elapsed * 0.001;
      particles.position.x = -mouseRef.x * 1;
      particles.position.y = -mouseRef.y * 1;
      particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
      particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
      particles.rotation.z += 0.01 * speed;
      renderer.render({ scene: particles, camera });
    };
    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
  }, [ldm]);

  if (ldm) return null;
  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

// ─── Smooth Cursor (physics-based) ─────────────────────────────────
export function SmoothCursor() {
  const { ldm } = useSite();
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 300 });
  const scale = useSpring(1, { ...springConfig, stiffness: 500, damping: 35 });

  useEffect(() => {
    if (ldm) return;
    const mq = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const update = () => setIsEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [ldm]);

  useEffect(() => {
    if (!isEnabled || ldm) return;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      setIsVisible(true);
      const pos = { x: e.clientX, y: e.clientY };
      const dt = Date.now() - lastUpdateTime.current;
      if (dt > 0) {
        velocity.current = {
          x: (pos.x - lastMousePos.current.x) / dt,
          y: (pos.y - lastMousePos.current.y) / dt,
        };
      }
      lastUpdateTime.current = Date.now();
      lastMousePos.current = pos;
      cursorX.set(pos.x);
      cursorY.set(pos.y);
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      if (speed > 0.1) {
        const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
        let diff = angle - previousAngle.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        accumulatedRotation.current += diff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = angle;
        scale.set(0.95);
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => scale.set(1), 150);
      }
    };

    const throttled = (e: PointerEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => { onMove(e); rafId = 0; });
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttled, { passive: true });
    return () => {
      window.removeEventListener("pointermove", throttled);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout) clearTimeout(timeout);
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled, ldm]);

  if (!isEnabled || ldm) return null;
  return (
    <motion.div
      style={{
        position: "fixed", left: cursorX, top: cursorY,
        translateX: "-50%", translateY: "-50%",
        rotate: rotation, scale, zIndex: 100,
        pointerEvents: "none", willChange: "transform",
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <svg width={50} height={54} viewBox="0 0 50 54" fill="none" style={{ scale: 0.5 }}>
        <g filter="url(#csd)">
          <path d="M42.68 41.15L27.51 6.8c-.78-1.77-3.3-1.77-4.12 0L7.6 41.15c-.84 1.83.93 3.74 2.81 3.05l13.97-5.15c.5-.19 1.06-.19 1.56 0l13.87 5.15c1.87.69 3.68-1.22 2.87-3.05z" fill="black" />
          <path d="M43.71 40.69L28.54 6.34c-1.19-2.69-4.97-2.65-6.18-.02L6.57 40.68c-1.26 2.74 1.4 5.62 4.23 4.58l13.97-5.15c.25-.09.53-.09.78-.01l13.87 5.15c2.81 1.04 5.51-1.82 4.3-4.56z" stroke="white" strokeWidth={2.26} />
        </g>
        <defs>
          <filter id="csd" x={0.6} y={0.95} width={49.06} height={52.43} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity={0} result="bg" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0" result="ha" />
            <feOffset dy={2.26} />
            <feGaussianBlur stdDeviation={2.26} />
            <feComposite in2="ha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
            <feBlend mode="normal" in2="bg" result="ds" />
            <feBlend mode="normal" in="SourceGraphic" in2="ds" result="shape" />
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
}

// ─── Cursor Trail (simple line — kept as-is) ────────────────────────
export function CursorTrail() {
  const { ldm } = useSite();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    if (ldm) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (points.current.length > 30) points.current.shift();
    }
    window.addEventListener("mousemove", onMove);

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const pts = points.current;
      if (pts.length > 1) {
        ctx!.beginPath();
        ctx!.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx!.lineTo(pts[i].x, pts[i].y);
        ctx!.strokeStyle = "rgba(247, 127, 0, 0.15)";
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = "round";
        ctx!.stroke();
      }
      pts.forEach((p) => p.age++);
      points.current = pts.filter((p) => p.age < 40);
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [ldm]);

  if (ldm) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
}

// ─── OGL Ribbons (neon cursor trail) ───────────────────────────────
export function RibbonsTrail() {
  const { ldm } = useSite();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ldm) return;
    const container = containerRef.current;
    if (!container) return;

    const colors = ["#ffffff"];
    const baseSpring = 0.03;
    const baseFriction = 0.9;
    const baseThickness = 15;
    const offsetFactor = 0.02;
    const maxAge = 500;
    const pointCount = 50;
    const speedMultiplier = 0.6;
    const enableFade = true;
    const enableShaderEffect = true;
    const effectAmplitude = 2;

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.position = "absolute";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines: any[] = [];

    const vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      varying vec2 vUV;
      vec4 getPos() {
        vec4 cur = vec4(position, 1.0);
        vec2 asp = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 ns = next.xy * asp;
        vec2 ps = prev.xy * asp;
        vec2 tan = normalize(ns - ps);
        vec2 nor = vec2(-tan.y, tan.x);
        nor /= asp;
        nor *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
        float dist = length(ns - ps);
        nor *= smoothstep(0.0, 0.02, dist);
        float pwr = 1.0 / (uResolution.y / uDPR);
        float pw = cur.w * pwr;
        nor *= pw * uThickness;
        cur.xy -= nor * side;
        if (uEnableShaderEffect > 0.5) {
          cur.xy += nor * sin(uTime + cur.x * 10.0) * uEffectAmplitude;
        }
        return cur;
      }
      void main() {
        vUV = uv;
        gl_Position = getPos();
      }
    `;
    const frag = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
        float f = uEnableFade > 0.5 ? 1.0 - smoothstep(0.0, 1.0, vUV.y) : 1.0;
        gl_FragColor = vec4(uColor, uOpacity * f);
      }
    `;

    function resize() {
      const w = container!.clientWidth;
      const h = container!.clientHeight;
      renderer.setSize(w, h);
      lines.forEach((l) => l.polyline.resize());
    }
    window.addEventListener("resize", resize);

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;
      const thickness = baseThickness + (Math.random() - 0.5) * 3;
      const mouseOffset = new Vec3(
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.1, 0
      );
      const line: any = { spring, friction, mouseVelocity: new Vec3(), mouseOffset };
      const points = [];
      for (let i = 0; i < pointCount; i++) points.push(new Vec3());
      line.points = points;
      line.polyline = new Polyline(gl, {
        points, vertex: vert, fragment: frag,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: thickness },
          uOpacity: { value: 1.0 },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1.0 : 0.0 },
        },
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });
    resize();

    const mouse = new Vec3();
    function updateMouse(e: MouseEvent | TouchEvent) {
      const rect = container!.getBoundingClientRect();
      const cx = "changedTouches" in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const cy = "changedTouches" in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
      mouse.set(
        ((cx - rect.left) / container!.clientWidth) * 2 - 1,
        ((cy - rect.top) / container!.clientHeight) * -2 + 1, 0
      );
    }
    container.addEventListener("mousemove", updateMouse as any);

    const tmp = new Vec3();
    let frameId: number;
    let lastTime = performance.now();

    function update() {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;
      lines.forEach((line: any) => {
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);
        for (let i = 1; i < line.points.length; i++) {
          const segDelay = maxAge / (line.points.length - 1);
          const alpha = Math.min(1, (dt * speedMultiplier) / segDelay);
          line.points[i].lerp(line.points[i - 1], alpha);
        }
        if (line.polyline.mesh.program.uniforms.uTime)
          line.polyline.mesh.program.uniforms.uTime.value = now * 0.001;
        line.polyline.updateGeometry();
      });
      renderer.render({ scene });
    }
    update();

    return () => {
      window.removeEventListener("resize", resize);
      container!.removeEventListener("mousemove", updateMouse as any);
      cancelAnimationFrame(frameId);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [ldm]);

  if (ldm) return null;
  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ width: "100vw", height: "100vh", position: "fixed" }}
    />
  );
}

// ─── Click Spark (canvas-based, global overlay) ─────────────────────
export function ClickSpark() {
  const { ldm } = useSite();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<{ x: number; y: number; angle: number; startTime: number }[]>([]);

  useEffect(() => {
    if (ldm) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const ease = (t: number) => t * (2 - t);
    const sparkColor = "#f77f00";
    const sparkSize = 10;
    const sparkRadius = 15;
    const duration = 400;
    const extraScale = 1;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((s) => {
        const elapsed = ts - s.startTime;
        if (elapsed >= duration) return false;
        const p = ease(elapsed / duration);
        const dist = p * sparkRadius * extraScale;
        const len = sparkSize * (1 - p);
        const x1 = s.x + dist * Math.cos(s.angle);
        const y1 = s.y + dist * Math.sin(s.angle);
        const x2 = s.x + (dist + len) * Math.cos(s.angle);
        const y2 = s.y + (dist + len) * Math.sin(s.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    const onClick = (e: MouseEvent) => {
      const now = performance.now();
      const sparkCount = 8;
      sparksRef.current.push(
        ...Array.from({ length: sparkCount }, (_, i) => ({
          x: e.clientX, y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        }))
      );
    };
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, [ldm]);

  if (ldm) return null;
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9999]" />;
}

// ─── Shine Border (CSS radial-gradient animation) ───────────────────
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#f77f00",
  className = "",
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  className?: string;
}) {
  const { ldm } = useSite();
  return (
    <div
      className={`pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position] ${
        ldm ? "" : "animate-shine"
      } ${className}`}
      style={{
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        backgroundImage: `radial-gradient(transparent,transparent, ${
          Array.isArray(shineColor) ? shineColor.join(",") : shineColor
        },transparent,transparent)`,
        backgroundSize: "300% 300%",
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "var(--border-width)",
      } as React.CSSProperties}
    />
  );
}

// ─── Border Beam (light beam traveling along container edges) ───────
export function BorderBeam({
  children,
  className = "",
  size = 100,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}) {
  const { ldm } = useSite();

  const perimeter = [
    "0% 100%",   // bottom-left
    "0% 0%",     // top-left
    "100% 0%",   // top-right
    "100% 100%", // bottom-right
    "0% 100%",   // back to start
  ];
  const beamStyle = {
    width: size,
    height: size,
    background: `radial-gradient(circle, ${colorFrom}, ${colorTo}, transparent)`,
    filter: "blur(4px)",
    borderRadius: "50%",
    marginLeft: -(size / 2),
    marginTop: -(size / 2),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {!ldm && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute"
              style={beamStyle}
              animate={{
                top: perimeter,
                left: perimeter,
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay: -(duration / 3) * i,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

// ─── Marquee (Infinite Scroll) ──────────────────────────────────────
export function Marquee({ children }: { children: ReactNode }) {
  const { ldm } = useSite();
  if (ldm) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 py-6">
        {children}
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex items-center gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// ─── Number Ticker ──────────────────────────────────────────────────
export function NumberTicker({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ldm } = useSite();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(ldm ? value : 0);

  useEffect(() => {
    if (ldm || !inView) {
      setDisplay(ldm ? value : 0);
      return;
    }
    let start = 0;
    const dur = 1200;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, ldm]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

// ─── Text Reveal ────────────────────────────────────────────────────
export function TextReveal({
  children, className = "", delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  const { ldm } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  if (ldm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(4px)" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Fade In ────────────────────────────────────────────────────────
export function FadeIn({
  children, className = "", delay = 0, direction = "up",
}: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" }) {
  const { ldm } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const dirMap = { up: { y: 20 }, down: { y: -20 }, left: { x: 20 }, right: { x: -20 } };
  if (ldm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...dirMap[direction] }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
