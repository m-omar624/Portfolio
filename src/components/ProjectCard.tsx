import { Flex, Typography } from "antd";
import { GithubFilled } from "@ant-design/icons";
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
                        <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden", borderRadius: "6px 6px 0px 0px", position: "relative" }}>
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
                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View on GitHub"
                                    style={{
                                        position: "absolute",
                                        left: 8,
                                        bottom: 8,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 38,
                                        height: 28,
                                        fontSize: 16,
                                        padding: 0,
                                        borderRadius: 6,
                                        background: "transparent",
                                        border: "none",
                                        color: "rgba(0, 0, 0, 0.44)",
                                        textDecoration: "none",
                                        transition: "color 140ms ease, transform 120ms ease",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0, 0, 0, 0.8)";
                                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0, 0, 0, 0.44)";
                                        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                                    }}
                                >
                                    <GithubFilled style={{ fontSize: 36 }} />
                                </a>
                            )}
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
                        
                        </div>
                    </Flex>
                </Flex>
            </div>
        </Flex>
    );
}