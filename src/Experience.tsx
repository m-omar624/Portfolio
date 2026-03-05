import React, { useEffect } from "react";
import { Button, Card, Flex, Typography, theme } from "antd";
import "./Experience.scss";

type ExperienceCardProps = {
  title: string;
  dates: string;
  bullets: string[];
};

function ExperienceCard({ title, dates, bullets }: ExperienceCardProps) {
  return (
    <Card className="glass-card" bordered={false}>
      <Typography.Title level={3} className="glass-title">
        {title}
      </Typography.Title>
      <Typography.Text className="glass-subtitle">{dates}</Typography.Text>

      <ul className="glass-list">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <Flex justify="end" gap={12} className="glass-actions">
        <Button className="btn-purple" type="primary">
          Learn More
        </Button>
        <Button className="btn-ghost" type="default">
          Interactive Mode
        </Button>
      </Flex>
    </Card>
  );
}

export default function Experience() {
  const { token } = theme.useToken();




  return (
    <div className="exp-wrap" style={{ color: token.colorText }}>
      {/* Crosshair vertical line */}
      <div className="cross-vert" aria-hidden="true" />

      {/* Top node + horizontal to MAGNA */}
      <div className="node node-top" aria-hidden="true" />
      <div className="line" style={{top:155, width:"20%" }}aria-hidden="true" />
      <div className="brand brand-magna">MAGNA</div>

      {/* Middle node + horizontal to BOND */}
      <div className="node node-mid" aria-hidden="true" />
      <div className="line line-mid" aria-hidden="true" />
      <div className="brand brand-bond">BOND</div>

      {/* Experience card (top-left) */}
      <div className="slot slot-top-left">
        <ExperienceCard
          title="Software Engineer - Coop"
          dates="May 2025 - May 2026"
          bullets={[
            "Lead front and back-end developer in charge of developing internal applications for report generation and manipulating client data.",
            "Built reusable components and streamlined workflows for internal teams.",
            "Collaborated with stakeholders to deliver features end to end.",
          ]}
        />
      </div>

      {/* Empty card (bottom-right) */}
      <div className="slot slot-bottom-right">
        <Card className="glass-card empty" bordered={false} />
      </div>
    </div>
  );
}