import { useEffect, useRef, useState } from "react";
import { Button, Card, Flex, Typography } from "antd";

// const entries: ExperienceEntry[] = [
//   {
//     side: "left",
//     company: "MAGNA",
//     title: "Software Engineer \u2013 Coop",
//     dates: "May 2025 \u2013 May 2026",
//     description:
//       "Worked as a software engineer, collaborating with global teams to develop 2 applications and maintain 2 others. Gained experience in the full software development lifecycle, from design to deployment, and contributed to projects using Python, React, Three.js and Azure.",
//   },
//   {
//     side: "right",
//     company: "BOND",
//         title: "Full Stack Developer",
//     dates: "September 2024 \u2013 April 2025",
//     description:
//       "Worked as a full stack developer, communicating with both clients and team members to develop an enterprise application for report generation and manipulation of client data",
//   },
//   {
//     side: "left",
//     company: "theScore",
//     title: "QA Analyst / Automation \u2013 Coop",
//     dates: "January 2024 \u2013 September 2024",
//     description:
//       "Conducted manual and automated testing for theScore and ESPN apps on web and mobile platforms. Participated in production level testing and automated testing on workflows and firebase functions using JavaScript.",
//   },
//   {
//     side: "right",
//     company: "SellStatic",
//     title: "Software Developer \u2013 Internship",
//     dates: "September 2023 \u2013 January 2024",
//     description:
//       "Worked as a software engineer, developing the website ranking system, and setting up core functionality for the SellStatic Dashboard App. Wired up AI pipeline and various AWS features ensure scalability and maintainability.",
//   },
// ];

import "./Experience.scss";
import InteractiveDemo from "./components/InteractiveDemo";

export default function Experience({ demoOpen, setDemoOpen }: { demoOpen: boolean; setDemoOpen: (v: boolean) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [workContent, setWorkContent] = useState<Record<string, 'original' | 'work'>>({});
  const [workVisible, setWorkVisible] = useState<Record<string, boolean>>({});

  const handleMyWork = (id: string) => {
    setWorkVisible((p) => ({ ...p, [id]: false }));
    setTimeout(() => {
      setWorkContent((p) => ({ ...p, [id]: 'work' }));
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setWorkVisible((p) => ({ ...p, [id]: true }))
        )
      );
    }, 400);
  };

  // Scroll-reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".exp-item");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("visible");
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth mouse-follow spotlight (lerp, same as landing interactive bubble)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    let curX = 50,
      curY = 50,
      tgX = 50,
      tgY = 50;

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
    <>
    <Card style={{zIndex:1}}>
    <section id="experience" className="exp-section" ref={sectionRef}>

      <div className="exp-timeline">
        {/* Spine */}
        <div className="spine" aria-hidden="true" />

        <div
          key={"magna"}
          className={`exp-item exp-item--left`}
          style={{
            transition: 'opacity 0.4s',
            opacity: workVisible['magna'] === false ? 0 : 1,
            ...(workContent['magna'] === 'work' ? { display: 'block' } : {}),
          }}
        >
          {workContent['magna'] !== 'work' ? (
            <>
              {/* Node on the spine */}
              <div className="exp-node" aria-hidden="true" />
              {/* Content card */}
              <div className="exp-card">
                <Typography.Title level={4} className="exp-card__title">
                  {`Software Engineer \u2013 Coop`}
                </Typography.Title>
                <Typography.Text className="exp-card__dates">
                  {`May 2025 \u2013 May 2026`}
                </Typography.Text>
                <Typography.Paragraph className="exp-card__desc">
                  Worked as a software engineer, collaborating with global teams
                  to develop 2 applications and maintain 2 others. Gained
                  experience in the full software development lifecycle, from
                  design to deployment, and contributed to projects using Python,
                  React, Three.js and Azure.
                </Typography.Paragraph>
                <Flex gap={10}>
                  <Button
                    style={{ padding: "20px 24px", textTransform: "uppercase", letterSpacing: "1px" }}
                    onClick={() => handleMyWork('magna')}
                  >
                    My Work
                  </Button>
                  <Button
                    style={{ padding: "20px 24px", textTransform: "uppercase", letterSpacing: "1px" }}
                    onClick={() => setDemoOpen(true)}
                  >
                    Interactive Demo
                  </Button>
                </Flex>
              </div>
              {/* Company label */}
              <div className="exp-label">MAGNA</div>
            </>
          ) : (
            <>
              <Flex justify="flex-end" style={{ width: '100%', padding: '12px 0 8px' }}>
                <Button
                  size="small"
                  style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                  onClick={() => {
                    setWorkVisible((p) => ({ ...p, magna: false }));
                    setTimeout(() => {
                      setWorkContent((p) => ({ ...p, magna: 'original' as const }));
                      requestAnimationFrame(() => requestAnimationFrame(() =>
                        setWorkVisible((p) => ({ ...p, magna: true }))
                      ));
                    }, 400);
                  }}
                >
                  ← Back
                </Button>
              </Flex>
              <Flex gap={12} style={{ width: '100%', padding: '0 0 16px' }}>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project One</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the first project.</Typography.Text>
                </Card>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project Two</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the second project.</Typography.Text>
                </Card>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project Three</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the third project.</Typography.Text>
                </Card>
              </Flex>
            </>
          )}
        </div>

        <div key={"bond"} className={`exp-item exp-item--right`}>
          {/* Node on the spine */}
          <div className="exp-node" aria-hidden="true" />

          {/* Content card */}
          <div className="exp-card">
            <>
              <Typography.Title level={4} className="exp-card__title">
                Full Stack Developer
              </Typography.Title>
              <Typography.Text className="exp-card__dates">
                {`September 2024 \u2013 April 2025`}
              </Typography.Text>
              <Typography.Paragraph className="exp-card__desc">
                Worked as a full stack developer, communicating with both
                clients and team members to develop an enterprise application
                for report generation and manipulation of client data.
              </Typography.Paragraph>
            </>
          </div>

          {/* Company label with animated gradient text */}
          <div className="exp-label">BOND</div>
        </div>

        <div
          key={"theScore"}
          className={`exp-item exp-item--left`}
          style={{
            transition: 'opacity 0.4s',
            opacity: workVisible['thescore'] === false ? 0 : 1,
            ...(workContent['thescore'] === 'work' ? { display: 'block' } : {}),
          }}
        >
          {workContent['thescore'] !== 'work' ? (
            <>
              {/* Node on the spine */}
              <div className="exp-node" aria-hidden="true" />
              {/* Content card */}
              <div className="exp-card">
                <Typography.Title level={4} className="exp-card__title">
                  {`QA Analyst / Automation \u2013 Coop`}
                </Typography.Title>
                <Typography.Text className="exp-card__dates">
                  {`January 2024 \u2013 September 2024`}
                </Typography.Text>
                <Typography.Paragraph className="exp-card__desc">
                  Conducted manual and automated testing for theScore and ESPN
                  apps on web and mobile platforms. Participated in production
                  level testing and automated testing on workflows and firebase
                  functions using JavaScript.
                </Typography.Paragraph>
                <Flex gap={10}>
                  <Button
                    style={{ padding: "20px 24px", textTransform: "uppercase", letterSpacing: "1px" }}
                    onClick={() => handleMyWork('thescore')}
                  >
                    My Work
                  </Button>
                </Flex>
              </div>
              {/* Company label */}
              <div className="exp-label">THESCORE</div>
            </>
          ) : (
            <>
              <Flex justify="flex-end" style={{ width: '100%', padding: '12px 0 8px' }}>
                <Button
                  size="small"
                  style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
                  onClick={() => {
                    setWorkVisible((p) => ({ ...p, thescore: false }));
                    setTimeout(() => {
                      setWorkContent((p) => ({ ...p, thescore: 'original' as const }));
                      requestAnimationFrame(() => requestAnimationFrame(() =>
                        setWorkVisible((p) => ({ ...p, thescore: true }))
                      ));
                    }, 400);
                  }}
                >
                  ← Back
                </Button>
              </Flex>
              <Flex gap={12} style={{ width: '100%', padding: '0 0 16px' }}>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project One</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the first project.</Typography.Text>
                </Card>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project Two</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the second project.</Typography.Text>
                </Card>
                <Card style={{ flex: 1 }}>
                  <Typography.Title level={5}>Project Three</Typography.Title>
                  <Typography.Text type="secondary">Placeholder description for the third project.</Typography.Text>
                </Card>
              </Flex>
            </>
          )}
        </div>

                <div key={"Sellstatic"} className={`exp-item exp-item--right`} style={{marginBottom:0}}>
          {/* Node on the spine */}
          <div className="exp-node" aria-hidden="true" />

          {/* Content card */}
          <div className="exp-card" style={{paddingBottom:0}}>
            <>
              <Typography.Title level={4} className="exp-card__title">
                {`Software Developer \u2013 Internship`}
              </Typography.Title>
              <Typography.Text className="exp-card__dates">
                {`September 2023 \u2013 January 2024`}
              </Typography.Text>
              <Typography.Paragraph className="exp-card__desc">
                Worked as a software engineer, developing the website ranking system, 
                and setting up core functionality for the SellStatic Dashboard App. Wired 
                up AI pipeline and various AWS features ensure scalability and maintainability.
              </Typography.Paragraph>
            </>
          </div>

          {/* Company label with animated gradient text */}
          <div className="exp-label">SELLSTATIC</div>
        </div>
      </div>
    </section>
    </Card>

    {demoOpen && (
      <InteractiveDemo onClose={() => setDemoOpen(false)} />
    )}
    </>
  );
}
