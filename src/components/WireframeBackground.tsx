import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wanderAngle: number;
  opacity: number;
}

const NUM_PARTICLES = 170;
const MAX_DIST = 160;
const MOUSE_RADIUS = 100;
const FADE_IN_SPEED = 0.018;
const FADE_OUT_SPEED = 0.007;
const BASE_COLOR = "255, 255, 255";

export default function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousemove", onMouseMove);

    const cvs = canvas;
    function spawnParticle(): Particle {
      return {
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        vx: 0,
        vy: 0,
        wanderAngle: Math.random() * Math.PI * 2,
        opacity: 0,
      };
    }

    const particles: Particle[] = Array.from({ length: NUM_PARTICLES }, spawnParticle);

    // Map of "i_j" -> fade opacity for each connection
    const connOpacity = new Map<string, number>();

    function pairKey(i: number, j: number) {
      return i < j ? `${i}_${j}` : `${j}_${i}`;
    }

    // y-position alpha: full in top 55%, fade to 0 by 85%
    function yAlpha(y: number): number {
      const h = canvas!.height;
      const fadeStart = h * 0.55;
      const fadeEnd = h * 0.85;
      if (y <= fadeStart) return 1;
      if (y >= fadeEnd) return 0;
      return 1 - (y - fadeStart) / (fadeEnd - fadeStart);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);



      // Update & move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < MOUSE_RADIUS * MOUSE_RADIUS && mDistSq > 0) {
          const mDist = Math.sqrt(mDistSq);
          const strength = (1 - mDist / MOUSE_RADIUS) * 3.5;
          p.vx += (mdx / mDist) * strength;
          p.vy += (mdy / mDist) * strength;
        }

        // Very slow wander — angle drifts almost imperceptibly
        p.wanderAngle += (Math.random() - 0.5) * 0.02;
        p.vx += Math.cos(p.wanderAngle) * 0.0012;
        p.vy += Math.sin(p.wanderAngle) * 0.0012;

        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Speed cap — very low so nodes barely drift
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 0.6) {
          p.vx = (p.vx / spd) * 0.6;
          p.vy = (p.vy / spd) * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;

        // If repelled off-screen, delete and respawn randomly on canvas
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          const fresh = spawnParticle();
          particles[i] = fresh;
          continue;
        }

        // Node fades in over time, also capped by y-position
        p.opacity = Math.min(p.opacity + 0.004, 0.75) * yAlpha(p.y);
      }

      // Determine active pairs and update their fade opacity
      const activePairs = new Set<string>();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) {
            const k = pairKey(i, j);
            activePairs.add(k);
            connOpacity.set(k, Math.min((connOpacity.get(k) ?? 0) + FADE_IN_SPEED, 1));
          }
        }
      }

      // Fade out connections that are no longer in range
      for (const [k, op] of connOpacity) {
        if (!activePairs.has(k)) {
          const next = op - FADE_OUT_SPEED;
          if (next <= 0) connOpacity.delete(k);
          else connOpacity.set(k, next);
        }
      }

      // Draw connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const k = pairKey(i, j);
          const fadeOp = connOpacity.get(k);
          if (!fadeOp) continue;

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const distAlpha = (1 - dist / MAX_DIST) * 0.55;
          const yFade = Math.min(yAlpha(particles[i].y), yAlpha(particles[j].y));
          const alpha = fadeOp * distAlpha * yFade;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${BASE_COLOR}, ${alpha})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const p of particles) {
        const nodeAlpha = p.opacity * yAlpha(p.y);
        if (nodeAlpha < 0.005) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 230, 255, ${nodeAlpha})`;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
