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

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    github?: string;
}

export default function ProjectCard({ title, description, tags, image, github }: ProjectCardProps) {
    const { ref, visible } = useScrollVisible<HTMLDivElement>();
    const [hovered, setHovered] = useState(false);

    const cardStyle: CSSProperties = {
        opacity: visible ? 1 : 0,
        transform: visible
            ? hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)"
            : "translateY(24px)",
        transition: "opacity 480ms ease 0ms, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1) 0ms, box-shadow 220ms ease",
        background: "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
        width: "100%",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.6)" : "none",
        cursor: "default",
    };

    return (
        <Flex ref={ref} vertical gap={10} style={{ width: "100%" }}>
            <div
                style={cardStyle}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Flex vertical gap={0} style={{ textAlign: "center" }}>
                    {image && (
                        <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "6px 6px 0px 0px" }}>
                            <img
                                src={image}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    transition: "transform 360ms ease",
                                    transform: hovered ? "scale(1.04)" : "scale(1)",
                                }}
                            />
                        </div>
                    )}
                    <Flex vertical style={{ padding: 14 }}>
                        <Typography.Title level={3} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 6 }}>
                            {title}
                        </Typography.Title>
                        <Typography.Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 12 }}>
                            {description}
                        </Typography.Text>
                        <div style={{
                            overflow: "hidden",
                            maxHeight: hovered ? 120 : 0,
                            opacity: hovered ? 1 : 0,
                            transition: "max-height 300ms ease, opacity 250ms ease",
                        }}>
                            <Flex wrap="wrap" gap={6} justify="center" style={{ marginBottom: github ? 12 : 0 }}>
                                {tags.map(tag => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: 11,
                                            padding: "3px 8px",
                                            borderRadius: 4,
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.12)",
                                            color: "rgba(255,255,255,0.55)",
                                            letterSpacing: "0.03em",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </Flex>
                            {github && (
                                <Flex justify="center">
                                    <a
                                        href={github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            fontSize: 12,
                                            padding: "4px 14px",
                                            borderRadius: 4,
                                            background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.14)",
                                            color: "rgba(255,255,255,0.75)",
                                            textDecoration: "none",
                                            letterSpacing: "0.03em",
                                            transition: "background 180ms ease, border-color 180ms ease",
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.10)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                                        }}
                                    >
                                        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                                                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                                                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
                                                2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                                                0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
                                                .64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82
                                                2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
                                                0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                                                0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                        </svg>
                                        GitHub
                                    </a>
                                </Flex>
                            )}
                        </div>
                    </Flex>
                </Flex>
            </div>
        </Flex>
    );
}