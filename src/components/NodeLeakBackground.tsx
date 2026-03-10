import { useEffect, useRef } from "react";

const NUM_LEAK = 50;
const MAX_CONN = 145;

interface LeakParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wander: number;
  speed: number;
}

function spawn(w: number, stagger?: boolean): LeakParticle {
  return {
    x: Math.random() * w,
    y: stagger ? Math.random() * 200 : 0,
    vx: (Math.random() - 0.5) * 0.25,
    vy: Math.random() * 0.25 + 0.08,
    wander: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.15 + 0.08,
  };
}

/** y-based alpha: fades in from the very top, peaks around 15%, then fades to 0 by 70% */
function yAlpha(y: number, h: number): number {
  const fadeIn = h * 0.12;
  const peak = h * 0.18;
  const fadeOut = h * 0.70;
  if (y < fadeIn) return y / fadeIn;
  if (y < peak) return 1;
  if (y < fadeOut) return 1 - (y - peak) / (fadeOut - peak);
  return 0;
}

export default function NodeLeakBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Start staggered so it doesn't look like a burst on mount
    const particles: LeakParticle[] = Array.from({ length: NUM_LEAK }, () =>
      spawn(canvas.width, true)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.wander += (Math.random() - 0.5) * 0.018;
        p.vx += Math.cos(p.wander) * 0.0008;
        p.vy += p.speed * 0.002; // gentle gravity
        p.vx *= 0.97;
        p.vy = Math.min(p.vy, 0.5);
        p.x += p.vx;
        p.y += p.vy;

        // Respawn once fully faded or drifted out horizontally
        if (p.y > h * 0.72 || p.x < -60 || p.x > w + 60) {
          particles[i] = spawn(w);
        }
      }

      // Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > MAX_CONN * MAX_CONN) continue;
          const dist = Math.sqrt(dist2);
          const baseAlpha = Math.min(yAlpha(particles[i].y, h), yAlpha(particles[j].y, h));
          const distAlpha = (1 - dist / MAX_CONN) * 0.45;
          const alpha = baseAlpha * distAlpha;
          if (alpha < 0.005) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Nodes
      for (const p of particles) {
        const alpha = yAlpha(p.y, h) * 0.65;
        if (alpha < 0.005) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,230,255,${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

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
