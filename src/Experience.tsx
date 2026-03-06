import { useEffect, useRef } from "react";
import { Button, Flex, theme, Typography } from "antd";
import "./Experience.scss";
const {useToken} = theme;

type ExperienceEntry = {
  side: "left" | "right";
  company: string;
  title?: string;
  dates?: string;
  description?: string;
  cta?: { label: string; href: string };
};

const entries: ExperienceEntry[] = [
  {
    side: "left",
    company: "MAGNA",
    title: "Software Engineer \u2013 Coop",
    dates: "May 2025 \u2013 May 2026",
    description:
      "Worked as a software engineer, collaborating with global teams to develop 2 applications and maintain 2 others. Gained experience in the full software development lifecycle, from design to deployment, and contributed to projects using Python, React, Three.js and Azure.",
  },
  {
    side: "right",
    company: "BOND",
        title: "Full Stack Developer",
    dates: "September 2024 \u2013 April 2025",
    description:
      "Worked as a full stack developer, communicating with both clients and team members to develop an enterprise application for report generation and manipulation of client data",
  },
  {
    side: "left",
    company: "theScore",
    title: "QA Analyst / Automation \u2013 Coop",
    dates: "January 2024 \u2013 September 2024",
    description:
      "Conducted manual and automated testing for theScore and ESPN apps on web and mobile platforms. Participated in production level testing and automated testing on workflows and firebase functions using JavaScript.",
  },
  {
    side: "right",
    company: "SellStatic",
    title: "Software Developer \u2013 Internship",
    dates: "September 2023 \u2013 January 2024",
    description:
      "Worked as a software engineer, developing the website ranking system, and setting up core functionality for the SellStatic Dashboard App. Wired up AI pipeline and various AWS features ensure scalability and maintainability.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {token} = useToken();

  // Scroll-reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".exp-item");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth mouse-follow spotlight (lerp, same as landing interactive bubble)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    let curX = 50, curY = 50, tgX = 50, tgY = 50;

    function tick() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      section!.style.setProperty("--exp-mx", `${curX.toFixed(2)}%`);
      section!.style.setProperty("--exp-my", `${curY.toFixed(2)}%`);
      rafId = requestAnimationFrame(tick);
    }

    const onMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      tgX = ((e.clientX - rect.left) / rect.width) * 100;
      tgY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    window.addEventListener("mousemove", onMouse);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <Typography.Title level={2} className="exp-heading">
        Experience
      </Typography.Title>

      <div className="exp-timeline">
        {/* Spine */}
        <div className="spine" aria-hidden="true" />

        {entries.map((entry, i) => (
          <div
            key={i}
            className={`exp-item exp-item--${entry.side}`}
          >
            {/* Node on the spine */}
            <div className="exp-node" aria-hidden="true" />

            {/* Content card */}
            <div className="exp-card">
              {entry.title ? (
                <>
                  <Typography.Title level={4} className="exp-card__title">
                    {entry.title}
                  </Typography.Title>
                  {entry.dates && (
                    <Typography.Text className="exp-card__dates">
                      {entry.dates}
                    </Typography.Text>
                  )}
                  {entry.description && (
                    <Typography.Paragraph className="exp-card__desc">
                      {entry.description}
                    </Typography.Paragraph>
                  )}

                    <Flex gap={10}>
                    <Button style={{
                      padding:"20px 24px",
                      textTransform:"uppercase",
                      letterSpacing:"1px",
                    }}>
                      Learn More
                    </Button>
                                        <Button style={{
                      padding:"20px 24px",
                      textTransform:"uppercase",
                      letterSpacing:"1px",
                    }}>
                      Interactive Mode
                    </Button>
                    </Flex>


                </>
              ) : (
                <div className="exp-card__empty" />
              )}
            </div>

            {/* Company label with animated gradient text */}
            <div className="exp-label">{entry.company}</div>
          </div>
        ))}
      </div>
    </section>
  );
}