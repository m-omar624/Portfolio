import { Flex, Typography } from "antd";
import { useEffect, useRef, useState, type CSSProperties } from "react";

function useScrollVisible<T extends HTMLElement>(threshold = 0.1) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

function SectionHeader({ text, visible, delay = 300 }: { text: string; visible: boolean; delay?: number }) {
    return (
        <Flex
            gap={10}
            align={"center"}
            style={{
                opacity: 0,
                animationName: visible ? "sectionFlicker" : undefined,
                animationDuration: visible ? "1400ms" : undefined,
                animationTimingFunction: visible ? "ease-out" : undefined,
                animationFillMode: visible ? "forwards" : undefined,
                animationDelay: visible ? `${delay}ms` : undefined,
            }}
        >
            <Typography.Title level={2} style={{ marginTop: 24, lineHeight: 1, color: "white" }}>{text}</Typography.Title>
        </Flex>
    );
}

export default function About() {
    const section = useScrollVisible<HTMLDivElement>();

    const cardStyle = (visible: boolean, delay = 0): CSSProperties => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 480ms ease ${delay}ms, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1) ${delay}ms`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
    });

    return (
        <section id="about" style={{ position: "relative", padding: "40px 0", paddingInline: "20vw" }} ref={section.ref}>
            <style>{`
                @keyframes sectionFlicker {
                    0%, 19% { opacity: 0; }
                    20% { opacity: 1; }
                    21% { opacity: 0.25; }
                    24% { opacity: 1; }
                    27% { opacity: 0; }
                    29% { opacity: 1; }
                    80% { opacity: 1; }
                    85% { opacity: 0.85; }
                    90%, 100% { opacity: 1; }
                }
            `}</style>

            <div style={{ position: "relative", zIndex: 1 }}>
            <SectionHeader text="More About Me" visible={section.visible} />

            <Flex gap={16} style={{ marginTop: 18 }}>
                <div style={{ width: "34%", ...cardStyle(section.visible, 120), overflow: "hidden" }}>
                    <div style={{ width: "100%", height: 340, backgroundImage: "url('/AboutMe.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
                </div>

                <Flex vertical gap={12} style={{ width: "66%" }}>


                    <div style={{ ...cardStyle(section.visible, 240), padding: 18 }}>
                        <Flex vertical gap={12}>
                        <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                            I’m currently a Computer Science student at York University with 2.5 years of 
                            software development experience building scalable web applications and enterprise 
                            solutions. I’m passionate about creating technology that solves real-world problems 
                            and drives efficiency across industries. Over time, I’ve built a strong foundation 
                            in web development, software architecture, and designing applications that are 
                            maintainable, reliable, and built for scale.
                        </Typography.Text>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                        I’m committed to continuous learning and enjoy exploring technologies that help me grow as 
                        a developer. My goal is to apply my skills toward developing large-scale enterprise 
                        applications in the automotive or aerospace industry and contributing to projects that 
                        create lasting value.

                        </Typography.Text>
                        </Flex>

                    </div>
                        <div style={{ ...cardStyle(section.visible, 240), padding: 18 }}>
                        <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                        Beyond software , I’m interested in aviation, motorsports, cars, and space 
                        exploration, which reflect my appreciation for complex systems and innovation 
                        and building things that combine creativity, logic, and problem-solving.
                        </Typography.Text>
                    </div>
                </Flex>
            </Flex>
            </div>
        </section>
    );
}
