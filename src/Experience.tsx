import { Button, Card, Divider, Flex, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

function useFadeInOnScroll<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
}


export default function Experience() {
    const card1 = useFadeInOnScroll<HTMLDivElement>();
    const Point = () => (
        <div style={{ position: "relative", width: 20, height: 20, flexShrink: 0 }}>
            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.5)",
                animation: "indicatorPulse 2.2s ease-out infinite",
            }} />
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                boxShadow: "0 0 6px rgba(255,255,255,0.5)",
            }} />
        </div>
    );

    const Break = () => (
        <div style={{
            height: 2,
            margin: "18px 0",
            borderRadius: 10,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }} />
    )
    return (
        <div style={{
            padding: "20px", backgroundColor: "rgba(0, 0, 0, 1)",
            paddingInline: "20vw",
        }}>
            <style>{`
                @keyframes indicatorPulse {
                    0% { transform: scale(0.5); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 0; }
                }
            `}</style>
            <Flex vertical gap={12}>

                <Flex gap={10} align="center" justify="flex-start">
                    <img src="/Magna/Logo.png" style={{ width: "35px", height: "35px" }}></img>
                    <Typography.Title level={1} style={{ color: "rgba(255,255,255,0.9)", marginTop: 24 }}>Magna International</Typography.Title>
                </Flex>

                <Flex gap={10}>
                    <div ref={card1.ref} style={{
                        opacity: card1.visible ? 1 : 0,
                        transform: card1.visible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 480ms ease, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1)",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        width: "70%",
                    }}>
                        <Flex vertical gap={0} style={{ padding: 20 }}>

                            <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Software Developer \u2013 Coop`}</Typography.Title>
                            <Flex align="center" gap={8} style={{ marginBottom: 10 }}>
                                <Typography.Text style={{ color: "rgba(255,255,255,0.45)" }}>May 2025 - May 2026</Typography.Text>
                            </Flex>
                            <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, marginBottom: 0 }}>
                                Worked as a Full Stack Developer on the MML (Mechatronics, Mirrors, & Lighting) team working with global teams
                                to develop internal process improvement and automation tools using Python and React. Developed and maintained
                                tools revolving around vehicle part design, data organization, testing platforms and simulation visualization.
                            </Typography.Text>
                            <Break />
                            <Flex vertical gap={12}>
                                <Flex gap={6} align="center" >
                                    <Point />
                                    <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
                                        Developed a 3D rendering engine in Three.js to visualize and review multi-body dynamics simulation results
                                        and models, enabling engineers and designers convenient access to 25% of Magna MML’s product simulation data.
                                    </Typography.Text>
                                </Flex>

                                <Flex gap={6}>
                                    <Point />
                                    <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12 }}>
                                        Proposed and implemented a full-scale security solution, encompassing token API, EntraID, rate limiting, CSP,
                                        service filters, etc.
                                    </Typography.Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Break />
                        <Flex align="center" justify="flex-end" gap={12} style={{ padding: 20 }}>
                            <Button style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.9)"
                            }}>My Work</Button>
                            <Button style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.9)"
                            }}>Interactive</Button>

                        </Flex>

                    </div>
                    <Flex vertical gap={10} style={{ width: "30%" }}>
                        <div ref={card1.ref} style={{
                            opacity: card1.visible ? 1 : 0,
                            transform: card1.visible ? "translateY(0)" : "translateY(24px)",
                            transition: "opacity 480ms ease, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            width: "100%",
                        }}>
                            <Flex vertical gap={0} style={{ padding: 20 }}>

                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Mechatronics, Mirrors, & Lighting`}</Typography.Title>

                            </Flex>

                            <img src="/Magna/car.png" style={{ width: "100%" }}></img>
                        </div>

                        <div ref={card1.ref} style={{
                            opacity: card1.visible ? 1 : 0,
                            transform: card1.visible ? "translateY(0)" : "translateY(24px)",
                            transition: "opacity 480ms ease, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            width: "100%",
                        }}>
                            <Flex vertical gap={0} style={{ padding: 20 }}>

                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`My Time at Magna`}</Typography.Title>
                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, marginBottom: 0 }}>
                                    Magna has been my best experience to date, 
                                </Typography.Text>
                            </Flex>
                            <Break />
                            <Flex align="center" justify="flex-end" gap={12} style={{ padding: 20 }}>
                                <Button style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.9)"
                                }}>My Work</Button>
                                <Button style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.9)"
                                }}>Interactive</Button>

                            </Flex>
                        </div>
                    </Flex>

                </Flex>





            </Flex>

        </div>
    )
}