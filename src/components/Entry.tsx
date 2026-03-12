import React, { useEffect, useRef, useState } from "react";
import { Card, Typography } from "antd";
import AppButton from "./AppButton";
import "./Entry.css";

export default function Entry({
  text,
  delays,
  duration,
  random,
  fontSize,
  fontWeight,
  isSummary,
  revealAfter,
  play,
}: {
  text: string;
  delays: number[];
  duration: number;
  random?: boolean;
  fontSize?: number;
  fontWeight?: number;
  isSummary?: boolean;
  revealAfter?: number;
  play?: boolean;
}) {
  // Compute word data once on mount so StrictMode re-renders don't reshuffle
  const wordData = useRef(
    text.split(" ").map((word, i) => ({
      word,
      type: random ? Math.floor(Math.random() * 5) : i % 5,
      delay: random ? Math.random() * 1500 + 400 : delays[i] ?? i * 400,
    }))
  );

  const [showExtras, setShowExtras] = useState(false);
  const playState = play ?? true;

  const cards = [
    { title: "2+ Years in Full Stack Development", description: "Developing web applications and enterprise solutions at Magna International, Bond, and SellStatic" },
    { title: "Enterprise Apps", description: " I aim to digitize the industries that our world is built upon." },
    { title: "Based in Toronto, Canada", description: "Open to remote and onsite work in Canada or United States" },
  ]

  useEffect(() => {
    if (!isSummary || !playState) return;
    const t = setTimeout(() => setShowExtras(true), revealAfter ?? 900);
    return () => clearTimeout(t);
  }, [isSummary, revealAfter, playState]);

  return (
    <div
      className={`flicker-line${isSummary ? " summary" : ""}`}
      style={{ backgroundColor: "transparent", fontSize: fontSize ?? "2rem", fontWeight: fontWeight ?? 700 }}
    >
      {wordData.current.map(({ word, type, delay }, i) => (
        <span
          key={i}
          className={`flicker-word flicker-type-${type}`}
          style={{
            "--delay": `${delay}ms`,
            "--duration": `${duration}ms`,
            "--shadow-color": "255,255,255",
            animationPlayState: playState ? "running" : "paused",
          } as React.CSSProperties}
        >
          {word}
          {i < wordData.current.length - 1 ? "\u00A0" : ""}
        </span>
      ))}

      {isSummary && (
        <div className={`summary-extras${showExtras ? " show" : ""}`}>
          <div className="summary-buttons">
            <AppButton variant="primary" size="middle"
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Typography.Text style={{ color: "rgb(255, 255, 255)", fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>My Experience</Typography.Text>
            </AppButton>
            <a href="/resume.pdf" download>
              <AppButton variant="default" size="middle" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}>
                <Typography.Text style={{ color: "rgb(255, 255, 255)", fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Download Resume</Typography.Text>
              </AppButton>
            </a>
          </div>
          <div className="summary-cards" style={{ marginTop: "3vh" }}>
            {cards.map((card, i) => (
              <Card
                key={card.title}
                size="small"
                className={`summary-card${showExtras ? " show" : ""}`}
                style={{
                  transitionDelay: `${i * 110}ms`,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  width: 300,
                  minWidth: 300,
                }}
              >
                <Card.Meta
                  title={<span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 12, letterSpacing: 0.7, textTransform: 'uppercase' }}>{card.title}</span>}
                  description={<span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{card.description}</span>}
                />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}