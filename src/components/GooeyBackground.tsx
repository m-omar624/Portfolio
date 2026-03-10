interface Props {
  /** CSS filter brightness — lower = darker/more black (default 0.15) */
  brightness?: number;
  /** Overall opacity of the entire effect (0–1, default 0.6) */
  opacity?: number;
  /** Circle size as CSS value (default "80%") */
  circleSize?: string;
}

import { useMemo } from "react";

export default function GooeyBackground({
  brightness = 0.15,
  opacity = 0.3,
  circleSize = "80%",
}: Props) {
  // Make the overall motion slower, but increase activity toward the bottom.
  const slowFactor = 1.6; // multiply base durations by this to slow everything down
  const activityFactor = 0.9; // how much lower blobs speed up (0..1)

  // baseY for each blob (lower values push blobs downward)
  const baseYs = [0.55, 0.75, 0.65, 0.60, 0.85];

  function durationFor(base: number, baseDuration: number) {
    // lower baseY -> more active -> shorter duration
    const modifier = 1 - activityFactor * base;
    return Math.max(6, baseDuration * slowFactor * modifier);
  }

  function opacityFor(base: number, baseOpacity = 1) {
    // slightly stronger at bottom
    return Math.min(1, baseOpacity * (0.75 + 0.6 * base));
  }

  // Generate a layer of many small blobs biased toward the bottom.
  const extraBlobs = useMemo(() => {
    const count = 10; // fewer small blobs
    const colors = [
      "rgba(18,113,255,0.5)",
      "rgba(100,220,255,0.5)",
      "rgba(221,74,255,0.5)",
    ];
    return Array.from({ length: count }).map((_, i) => {
      // bias y toward bottom: 1 - u^2
      const u = Math.random();
      const y = 1 - Math.pow(u, 2);
      const x = Math.random();
      const size = (6 + Math.random() * 12) * 2; // twice as large as before
      const color = colors[i % colors.length];
      const dur = durationFor(y, 20 + Math.random() * 30);
      const delay = Math.random() * 6;
      return { x, y, size, color, dur, delay };
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(40deg, rgb(0, 0, 0), rgb(0, 0, 0))",
        opacity,
      }}
    >
      {/* SVG goo filter */}
      <svg style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          filter: `url(#goo) blur(30px) contrast(1) brightness(${brightness})`,
          width: "100%",
          height: "100%",
          position: "relative",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        {/* Extra small blobs layer (bottom-heavy) */}
        {extraBlobs.map((b, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${b.x * 100}%`,
              top: `${b.y * 100}%`,
              width: `${b.size}%`,
              height: `${b.size}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at center, ${b.color} 0, rgba(0,0,0,0) 55%) no-repeat`,
              mixBlendMode: "hard-light",
              borderRadius: "50%",
              animation: `moveVertical ${b.dur}s ease ${b.delay}s infinite`,
              opacity: 0.85,
            }}
          />
        ))}
        {/* g1 — blue, vertical drift */}
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(circle at center, rgba(18, 113, 255, 0.5) 0, rgba(18, 113, 255, 0) 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: circleSize,
            height: circleSize,
            top: `calc(${baseYs[0] * 100}% - (${circleSize} / 2))`,
            left: `calc(50% - ${circleSize} / 2)`,
            transformOrigin: "center center",
            animation: `moveVertical ${durationFor(baseYs[0], 30)}s ease infinite`,
            opacity: opacityFor(baseYs[0], 1),
          }}
        />
        {/* g2 — magenta, circular reverse */}
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(circle at center, rgba(221, 74, 255, 0.5) 0, rgba(221, 74, 255, 0) 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: circleSize,
            height: circleSize,
            top: `calc(${baseYs[1] * 100}% - (${circleSize} / 2))`,
            left: `calc(50% - ${circleSize} / 2)`,
            transformOrigin: "calc(50% - 400px)",
            animation: `moveInCircle ${durationFor(baseYs[1], 20)}s reverse infinite`,
            opacity: opacityFor(baseYs[1], 1),
          }}
        />
        {/* g3 — cyan, circular */}
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(circle at center, rgba(100, 220, 255, 0.5) 0, rgba(100, 220, 255, 0) 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: circleSize,
            height: circleSize,
            top: `calc(${baseYs[2] * 100}% - (${circleSize} / 2))`,
            left: `calc(50% - ${circleSize} / 2 - 500px)`,
            transformOrigin: "calc(50% + 400px)",
            animation: `moveInCircle ${durationFor(baseYs[2], 40)}s linear infinite`,
            opacity: opacityFor(baseYs[2], 1),
          }}
        />
        {/* g4 — red, horizontal */}
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(circle at center, rgba(200, 50, 50, 0.5) 0, rgba(200, 50, 50, 0) 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: circleSize,
            height: circleSize,
            top: `calc(${baseYs[3] * 100}% - (${circleSize} / 2))`,
            left: `calc(50% - ${circleSize} / 2)`,
            transformOrigin: "calc(50% - 200px)",
            animation: `moveHorizontal ${durationFor(baseYs[3], 40)}s ease infinite`,
            opacity: opacityFor(baseYs[3], 0.7),
          }}
        />
        {/* g5 — yellow/olive, large circular */}
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(circle at center, rgba(180, 180, 50, 0.5) 0, rgba(180, 180, 50, 0) 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: `calc(${circleSize} * 2)`,
            height: `calc(${circleSize} * 2)`,
            top: `calc(${baseYs[4] * 100}% - (${circleSize} / 2))`,
            left: `calc(50% - ${circleSize})`,
            transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
            animation: `moveInCircle ${durationFor(baseYs[4], 20)}s ease infinite`,
            opacity: opacityFor(baseYs[4], 1),
          }}
        />
        {/* Fade-to-black at top and bottom edges for smooth section transitions */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%)",
            mixBlendMode: "normal",
          }}
        />
      </div>
    </div>
  );
}
