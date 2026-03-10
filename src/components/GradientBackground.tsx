import { useEffect, useRef } from "react";

interface Blob {
  baseX: number;
  baseY: number;
  rx: number;
  ry: number;
  r: number;
  g: number;
  b: number;
  phaseX: number;
  phaseY: number;
  size: number;
}

interface Props {
  /** 0–1 multiplier on blob peak alpha */
  intensity?: number;
  /** Multiplier on blob radius — smaller = tighter color patches, bigger = washes of color */
  blobScale?: number;
}

const BLOBS: Blob[] = [
  { baseX: 0.15, baseY: 0.35, rx: 0.22, ry: 0.16, r: 40,  g: 80,  b: 255, phaseX: 0,    phaseY: 1.3,  size: 0.55 },
  { baseX: 0.80, baseY: 0.65, rx: 0.18, ry: 0.14, r: 90,  g: 40,  b: 220, phaseX: 1.5,  phaseY: 0.4,  size: 0.50 },
  { baseX: 0.50, baseY: 0.50, rx: 0.26, ry: 0.18, r: 20,  g: 60,  b: 200, phaseX: 0.7,  phaseY: 2.1,  size: 0.65 },
  { baseX: 0.30, baseY: 0.75, rx: 0.14, ry: 0.12, r: 60,  g: 100, b: 245, phaseX: 2.2,  phaseY: 0.9,  size: 0.40 },
];

export default function GradientBackground({ intensity = 0.35, blobScale = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = Math.random() * 100;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const animate = () => {
      t += 0.001; // ~17s full cycle — visible shifting
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.globalCompositeOperation = "lighter";
      for (const b of BLOBS) {
        // Multiple sine terms for organic wandering
        const cx = (b.baseX + Math.sin(t + b.phaseX) * b.rx + Math.sin(t * 1.7 + b.phaseY) * b.rx * 0.3) * w;
        const cy = (b.baseY + Math.cos(t * 0.65 + b.phaseY) * b.ry + Math.cos(t * 1.3 + b.phaseX) * b.ry * 0.4) * h;
        const radius = b.size * blobScale * w;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0,   `rgba(${b.r},${b.g},${b.b},${intensity})`);
        grad.addColorStop(0.35, `rgba(${b.r},${b.g},${b.b},${intensity * 0.4})`);
        grad.addColorStop(0.45,   `rgba(${b.r},${b.g},${b.b},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [intensity, blobScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
