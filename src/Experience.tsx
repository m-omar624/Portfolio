import { Flex, Typography, Image, } from "antd";
import AppButton from "./components/AppButton";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import SkillScroller from "./components/SkillTags";

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


function SectionHeader({ logo, logoHeight, logoWidth, text, visible, justify, delay = 300, style }: { text: string; logoHeight?: number, logoWidth?: number; visible: boolean; logo?: string; justify?: "flex-start" | "center" | "flex-end"; delay?: number; style?: CSSProperties }) {
    return (
        <Flex
            gap={10}
            align={"center"}
            justify={justify || "flex-start"}
            style={{
                opacity: 0,
                animationName: visible ? "sectionFlicker" : undefined,
                animationDuration: visible ? "1400ms" : undefined,
                animationTimingFunction: visible ? "ease-out" : undefined,
                animationFillMode: visible ? "forwards" : undefined,
                animationDelay: visible ? `${delay}ms` : undefined,
                paddingInline: "20vw",
                ...style,
            }}
        >
            {logo && <img src={logo} style={{ width: logoWidth || 30, height: logoHeight || 30 }} />}
            <Typography.Title level={2} style={{ marginTop: 24, lineHeight: 1, color: "white" }}>
                {text}
            </Typography.Title>
        </Flex>
    );
}

export default function Experience({ onInteractive }: { onInteractive?: () => void }) {
    const magnaSection = useScrollVisible<HTMLDivElement>();
    const bondSection = useScrollVisible<HTMLDivElement>();
    const theScoreSection = useScrollVisible<HTMLDivElement>();
    const SellstaticSection = useScrollVisible<HTMLDivElement>();
    const [magnaView, setMagnaView] = useState<'default' | 'exitDefault' | 'work' | 'exitWork'>('default');

    const goToWork = () => {
        setMagnaView('exitDefault');
        setTimeout(() => setMagnaView('work'), 650);
    };

    const goBack = () => {
        setMagnaView('exitWork');
        setTimeout(() => setMagnaView('default'), 650);
    };

    const getDefaultCardStyle = (scrollVisible: boolean, scrollDelay: number, index: number): CSSProperties => {
        if (magnaView === 'exitDefault') {
            return { animation: `floatOut 400ms cubic-bezier(0.4, 0, 0.6, 0.4) ${index * 65}ms forwards` };
        }
        if (magnaView === 'work' || magnaView === 'exitWork') {
            return { opacity: 0 };
        }
        return {
            opacity: scrollVisible ? 1 : 0,
            transform: scrollVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 480ms ease ${scrollDelay}ms, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1) ${scrollDelay}ms`,
        };
    };

    const getWorkCardStyle = (index: number): CSSProperties => {
        if (magnaView === 'work') {
            return { animation: `floatIn 440ms cubic-bezier(0.2, 0.9, 0.18, 1) ${index * 80}ms both` };
        }
        if (magnaView === 'exitWork') {
            return { animation: `floatOut 400ms cubic-bezier(0.4, 0, 0.6, 0.4) ${index * 65}ms forwards` };
        }
        return { opacity: 0 };
    };

    const cardStyle = (visible: boolean, delay: number): CSSProperties => ({
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 480ms ease ${delay}ms, transform 440ms cubic-bezier(0.2, 0.9, 0.18, 1) ${delay}ms`,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 6,
    });

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

    const Break = ({ style }: { style?: CSSProperties }) => (
        <div style={{
            height: 2,
            borderRadius: 10,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            ...style
        }} />
    )
    return (
        <div id="experience" style={{
            position: "relative",
            padding: "20px",
        }}>
            <div style={{ position: "relative", zIndex: 1 }}>
                <style>{`
                @keyframes indicatorPulse {
                    0% { transform: scale(0.5); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 0; }
                }
                @keyframes floatOut {
                    from { opacity: 1; transform: translateY(0); }
                    to   { opacity: 0; transform: translateY(-28px); }
                }
                @keyframes floatIn {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
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
                <Flex vertical gap={12}>
                    {/* MAGNA */}
                    <>
                        {/* Scroll sentinel — triggers all Magna cards + title */}
                        <div ref={magnaSection.ref} style={{ height: 0, overflow: "hidden", justifyContent: "right" }} />

                        <SectionHeader style={{ visibility: (magnaView === 'default' || magnaView === 'exitDefault') ? 'visible' : 'hidden', }} logo="/Magna/Logo.png" logoWidth={30} logoHeight={30} text="Magna International" visible={magnaSection.visible} />

                        <div style={{ paddingInline: "20vw", position: 'relative' }}>
                            <Flex gap={10} style={{ marginBottom: 20, visibility: (magnaView === 'default' || magnaView === 'exitDefault') ? 'visible' : 'hidden', pointerEvents: magnaView === 'default' ? 'auto' : 'none' }}>
                                <Flex vertical gap={10} style={{ width: "60%" }}>
                                    <div style={{ ...cardStyle(magnaSection.visible, 0), ...getDefaultCardStyle(magnaSection.visible, 0, 0), width: "100%" }}>
                                        <Flex vertical gap={0} style={{ padding: 20 }}>
                                            <Flex justify="space-between" >
                                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Software Engineer \u2013 Coop`}</Typography.Title>
                                                <Flex align="top" justify="flex-end" gap={12}>
                                                    <AppButton size="small" onClick={goToWork} variant="primary" style={{ fontSize: 10, padding: "3px 8px", color: "rgba(255, 255, 255, 0.7)", letterSpacing: 1, textTransform: 'uppercase' }}>My Work</AppButton>
                                                    <AppButton size="small" onClick={() => onInteractive?.()} variant="default" style={{ fontSize: 10, padding: "3px 8px", color: "rgba(255, 255, 255, 0.7)", letterSpacing: 1, textTransform: 'uppercase' }}>Interactive</AppButton>

                                                </Flex>
                                            </Flex>
                                            <Flex align="center" gap={8} style={{ marginBottom: 30 }}>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>May 2025 - May 2026</Typography.Text>
                                            </Flex>
                                            <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 0 }}>
                                                Worked as a Full Stack Developer on the MML (Mechatronics, Mirrors, & Lighting) team working with global teams
                                                to develop internal process improvement and automation tools using Python and React. Developed and maintained
                                                tools revolving around vehicle part design, data organization, testing platforms and simulation visualization.
                                            </Typography.Text>
                                            <Break style={{ margin: "18px 0px" }} />
                                            <Flex vertical gap={12}>
                                                <Flex gap={6} align="center" >
                                                    <Point />
                                                    <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                        Developed a 3D rendering engine in Three.js to visualize and review multi-body dynamics simulation results
                                                        and models, enabling engineers and designers convenient access to 25% of Magna MML’s product simulation data.
                                                    </Typography.Text>
                                                </Flex>

                                                <Flex gap={6}>
                                                    <Point />
                                                    <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                        Proposed and implemented a full-scale security solution, encompassing token API, EntraID, rate limiting, CSP,
                                                        service filters, etc.
                                                    </Typography.Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>


                                    </div>

                                    <div style={{ ...cardStyle(magnaSection.visible, 120), ...getDefaultCardStyle(magnaSection.visible, 120, 1), width: "100%", height: "100%", marginBottom: 62 }}>

                                        <SkillScroller
                                            skills={[
                                                ["/Magna/react.png", "React"],
                                                ["/Magna/ts.png", "TypeScript"],
                                                ["/Magna/js.svg", "JavaScript"],
                                                ["/Magna/python.png", "Python"],
                                                ["/Magna/flask.png", "Flask"],
                                                ["/Magna/three.png", "Three.js"],
                                                ["/Magna/sql.svg", "SQL"],
                                                ["/Magna/azure.png", "Azure"]
                                            ]}></SkillScroller>

                                    </div>
                                </Flex>
                                <Flex vertical gap={10} style={{ width: "40%" }}>
                                    <div style={{
                                        ...cardStyle(magnaSection.visible, 240),
                                        ...getDefaultCardStyle(magnaSection.visible, 240, 2),
                                        width: "100%",
                                        height: "13vh",
                                        backgroundColor: "rgba(0, 0, 0, 0.24)",
                                        backgroundBlendMode: "darken",
                                        backgroundImage: "url('/Magna/car3.jpg')",
                                        backgroundPosition: "left 20% top 60%",
                                    }}>
                                        <Flex vertical gap={0} style={{ padding: 20 }}>

                                            <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Mechatronics, Mirrors, & Lighting`}</Typography.Title>

                                        </Flex>

                                        {/* <img src="/Magna/car2.png" style={{ width: "100%" }}></img> */}
                                    </div>

                                    <div style={{ ...cardStyle(magnaSection.visible, 360), ...getDefaultCardStyle(magnaSection.visible, 360, 3), width: "100%" }}>
                                        <Flex vertical gap={0} style={{ padding: 20 }}>

                                            <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 6 }}>{`My Time at Magna`}</Typography.Title>
                                            <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 0 }}>
                                                My current placement at Magna International as a Software Engineer has proven to be my most rewarding experience to date.
                                                I have had the opportunity to work on a variety of projects, including developing a full stack web application for managing
                                                supplier relationships and creating an internal tool for visualizing real simulation data. I have also gained experience
                                                with cloud technologies such as Azure and have been able to apply my skills in a real-world setting.
                                            </Typography.Text>

                                        </Flex>
                                    </div>
                                </Flex>

                            </Flex>

                            {/* ── Work view (floats in on top) ── */}
                            <div style={{
                                position: 'absolute',
                                top: -120, left: 0, right: 0,
                                visibility: (magnaView === 'work' || magnaView === 'exitWork') ? 'visible' : 'hidden',
                                pointerEvents: magnaView === 'work' ? 'auto' : 'none',
                            }}>
                                <Flex vertical gap={20} style={{ marginBottom: 20, paddingInline: "15vw" }}>
                                    <div style={{ background: "transparent", width: "100%", height: "100%", ...getWorkCardStyle(7) }}>
                                    <Typography.Text style={{ color: "rgb(255, 145, 0)", fontSize: 9, letterSpacing: 1, fontWeight:700, textTransform: 'uppercase' }}>
                                        Images and Videos are obscured for confidentiality of magna and its clients.
                                    </Typography.Text>
                                    </div>

                                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, width: "100%", height: "100%", ...getWorkCardStyle(0) }}>

                                        <Flex gap={10} style={{ flex: 1 }}>
                                            <div style={{ padding: 15, width: "20vw" }}>
                                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginTop: 8, marginBottom: 6 }}>Collab Space</Typography.Title>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>A Global Platform for Engineers, clients, and designers to verify and approve analysis requests.
                                                    Integrated into the design process, Collab bridges the disconnect between teams and clients, providing understandable simulation data for everyone
                                                </Typography.Text>

                                            </div>
                                            <div>

                                                <Flex vertical gap={0} style={{ paddingBlock: 10 }}>
                                                    <video src="/MagnaWorkSamples/CollabFEAAnimationObscured.mp4" style={{ width: "25vw" }} autoPlay loop muted></video>
                                                </Flex>
                                                <div style={{ padding: 0 }}>
                                                    <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>Finite Element Analysis Viewer (Collab)</Typography.Title>
                                                </div>
                                            </div>
                                            <div>

                                                <Flex vertical gap={0} style={{ paddingBlock: 10 }}>
                                                    <video src="/MagnaWorkSamples/CollabMBDAnimation2Obscured.mp4" style={{ width: "25vw" }} autoPlay loop muted ></video>
                                                </Flex>
                                                <div style={{ padding: 0 }}>
                                                    <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>Multi Body Dynamics Viewer (Collab)</Typography.Title>
                                                </div>
                                            </div>
                                        </Flex>
                                    </div>
                                    <Flex gap={20} style={{ flex: 1 }}>

                                        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, width: "100%", height: "100%", ...getWorkCardStyle(2) }}>
                                            <div style={{ padding: 15 }}>
                                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginTop: 8, marginBottom: 6 }}>Magna Material Database</Typography.Title>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>A Global Database hosted on the web for easy access and storage of Material Data.
                                                </Typography.Text>
                                            </div>
                                            <Flex vertical gap={10} style={{ height: "100%", padding: 6 }}>
                                                <Image src="/MagnaWorkSamples/Materials.png" style={{ width: "100%" }}></Image>
                                            </Flex>
                                        </div>
                                        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, width: "100%", height: "100%", ...getWorkCardStyle(5) }}>
                                            <div style={{ padding: 15 }}>
                                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginTop: 8, marginBottom: 6 }}>AO Management</Typography.Title>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>Performed regular maintenance on an application to track, manage, and backup historical analysis data.
                                                </Typography.Text>
                                            </div>
                                            <Flex vertical gap={10} style={{ height: "100%", padding: 6 }}>
                                                <Image src="/MagnaWorkSamples/AOManagement.png" style={{ width: "100%" }}></Image>
                                            </Flex>
                                        </div>
                                        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, width: "100%", height: "100%", ...getWorkCardStyle(3) }}>
                                            <div style={{ padding: 15 }}>
                                                <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginTop: 8, marginBottom: 6 }}>ETO Job Order</Typography.Title>
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' }}>Performed regular maintenance on the EU testing order management platform
                                                </Typography.Text>
                                            </div>
                                            <Flex vertical gap={10} style={{ height: "100%", padding: 6 }}>
                                                <Image src="/MagnaWorkSamples/ETOFlowchart.png" style={{ width: "100%" }}></Image>
                                            </Flex>
                                        </div>
                                    </Flex>
                                    <div style={{ ...getWorkCardStyle(6), display: 'flex', justifyContent: 'flex-start', marginTop: 0 }}>
                                        <AppButton size="middle" onClick={goBack} variant="default" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>← Back</AppButton>
                                    </div>
                                </Flex>

                            </div>
                        </div>
                    </>


                    {/* BOND */}
                    <>
                        {/* Scroll sentinel — triggers all Magna cards + title */}
                        <div ref={bondSection.ref} style={{ height: 0, overflow: "hidden" }} />

                        <SectionHeader text="Bond Bookkeeping & Accounting" visible={bondSection.visible} justify="flex-end" />

                        <Flex gap={10} style={{ marginBottom: 20 }}>

                            {/* <Flex vertical gap={10} style={{ width: "20%" }}>

                            <div style={{ ...cardStyle(bondSection.visible, 360), width: "100%" }}>
                                <Flex vertical gap={0} style={{ padding: 20 }}>

                                    <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 6 }}>{`My Time at Magna`}</Typography.Title>
                                    <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, marginBottom: 0 }}>
                                        My current placement at Magna International as a Software Engineer has proven to be my most rewarding experience to date.
                                        I have had the opportunity to work on a variety of projects, including developing a full stack web application for managing
                                        supplier relationships and creating an internal tool for visualizing real simulation data. I have also gained experience
                                        with cloud technologies such as Azure and have been able to apply my skills in a real-world setting.
                                    </Typography.Text>
                                    <Flex align="center" justify="flex-end" gap={12} style={{ paddingTop: 20 }}>
                                        <Button size="small" style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(255,255,255,0.9)"
                                        }}>My Work</Button>
                                        <Button size="small" style={{
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(255,255,255,0.9)"
                                        }}>Interactive</Button>

                                    </Flex>
                                </Flex>
                            </div>
                        </Flex> */}

                            <Flex vertical gap={10} style={{ paddingInline: "20vw", width: "100%" }}>


                                <div style={{ ...cardStyle(bondSection.visible, 200), width: "80%", justifyContent: "flex-end", marginLeft: "auto" }}>
                                    <Flex vertical gap={0} style={{ padding: 20 }}>

                                        <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Full Stack Developer`}</Typography.Title>
                                        <Flex align="center" gap={8} style={{ marginBottom: 10 }}>
                                            <Typography.Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>May 2025 - May 2026</Typography.Text>
                                        </Flex>
                                        <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 0 }}>
                                            Worked as a Full Stack Developer to build a large scale enterprise application for storage and manipulation of client data, and report generation.
                                        </Typography.Text>
                                        <Break style={{ margin: "18px 0px" }} />
                                        <Flex vertical gap={12}>
                                            <Flex gap={6} align="center" >
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Helped design frontend and build a database to securely store large volumes of client data.
                                                </Typography.Text>
                                            </Flex>

                                            <Flex gap={6}>
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Developed REST API end points and core business logic for data extraction and storage.
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>


                                </div>

                                <div style={{ ...cardStyle(bondSection.visible, 100), width: "80%", height: "100%", justifyContent: "flex-end", marginLeft: "auto" }}>

                                    <SkillScroller
                                        skills={[
                                            ["/Bond/java.svg", "Java"],
                                            ["/Bond/springboot.svg", "SpringBoot"],
                                            ["/Bond/sql.svg", "SQL"],
                                            ["/Bond/docker.png", "Docker"],
                                            ["/Bond/html.png", "HTML"],
                                            ["/Bond/css.svg", "CSS"],
                                        ]}></SkillScroller>

                                </div>
                            </Flex>
                        </Flex>
                    </>


                    {/* THESCORE */}
                    <>
                        {/* Scroll sentinel — triggers all Magna cards + title */}
                        <div ref={theScoreSection.ref} style={{ height: 0, overflow: "hidden", justifyContent: "right" }} />

                        <SectionHeader logo="/theScore/Logo.png" logoWidth={40} logoHeight={40} text="theScore" visible={theScoreSection.visible} />

                        <Flex gap={10} style={{ paddingInline: "20vw", marginBottom: 20 }}>
                            <Flex vertical gap={10} style={{ width: "80%" }}>
                                <div style={{ ...cardStyle(theScoreSection.visible, 0), width: "100%" }}>
                                    <Flex vertical gap={0} style={{ padding: 20 }}>

                                        <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`QA Analyst / QA Automation \u2013 Coop`}</Typography.Title>
                                        <Flex align="center" gap={8} style={{ marginBottom: 10 }}>
                                            <Typography.Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>September 2024 - April 2025</Typography.Text>
                                        </Flex>
                                        <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 0 }}>
                                            Worked as a QA Analyst and QA Automation Engineer to perform manual and automated testing of theScore and ESPN apps on all platforms to verify app
                                            stability and functionality. Collaborated closely with developers, product managers, and other stakeholders to identify and resolve issues,
                                            and to ensure the delivery of high-quality products.
                                        </Typography.Text>
                                        <Break style={{ margin: "18px 0px" }} />
                                        <Flex vertical gap={12}>
                                            <Flex gap={6} align="center" >
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Conducted tests for theScore and ESPN web and mobile apps including production testing.
                                                </Typography.Text>
                                            </Flex>

                                            <Flex gap={6}>
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Conducted and verified automated tests, GitHub workflows, and Firebase configurations ensuring automations are functioning correctly and reliably.
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>


                                </div>

                                <div style={{ ...cardStyle(theScoreSection.visible, 120), width: "100%", height: "100%" }}>

                                    <SkillScroller
                                        skills={[
                                            ["/theScore/playwright.webp", "Playwright"],
                                            ["/theScore/firebase.webp", "Firebase"],
                                            ["/theScore/js.svg", "JavaScript"],
                                            ["/theScore/Testrail.svg", "TestRail"],
                                            ["/theScore/dd.png", "Datadog"],
                                        ]}></SkillScroller>

                                </div>
                            </Flex>
                            <Flex vertical gap={10} style={{ width: "40%" }}>
                                <div style={{
                                    ...cardStyle(theScoreSection.visible, 400),
                                    width: "100%",
                                    height: "50%",
                                    backgroundColor: "rgba(0, 0, 0, 0.24)",
                                    backgroundBlendMode: "darken",
                                    backgroundImage: "url('/theScore/theScore.jpeg')",
                                    backgroundSize: 600,
                                    backgroundPosition: "right 60% top 0%",
                                }}>
                                    <Flex vertical gap={0} style={{ padding: 20 }}>
                                    </Flex>

                                    {/* <img src="/Magna/car2.png" style={{ width: "100%" }}></img> */}
                                </div>

                                <div style={{
                                    ...cardStyle(theScoreSection.visible, 200),
                                    width: "100%",
                                    height: "50%",
                                    backgroundColor: "rgba(0, 0, 0, 0.24)",
                                    backgroundBlendMode: "darken",
                                    backgroundImage: "url('/theScore/ESPN.jpg')",
                                    backgroundSize: 400,
                                    backgroundPosition: "right 60% top 30%",
                                }}>
                                    <Flex vertical gap={0} style={{ padding: 20 }}>
                                    </Flex>

                                    {/* <img src="/Magna/car2.png" style={{ width: "100%" }}></img> */}
                                </div>

                            </Flex>

                        </Flex>
                    </>

                    {/* SellStatic */}
                    <>
                        {/* Scroll sentinel — triggers all Magna cards + title */}
                        <div ref={SellstaticSection.ref} style={{ height: 0, overflow: "hidden", justifyContent: "right" }} />

                        <SectionHeader logo="/Sellstatic/Logo.png" logoWidth={30} logoHeight={30} text="SellStatic.ai" visible={SellstaticSection.visible} justify="flex-end" />

                        <Flex gap={10} style={{ paddingInline: "20vw", marginBottom: 20 }}>
                            <Flex vertical gap={10} style={{ width: "100%" }}>
                                <div style={{ ...cardStyle(SellstaticSection.visible, 0), width: "100%" }}>
                                    <Flex vertical gap={0} style={{ padding: 20 }}>

                                        <Typography.Title level={4} style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0 }}>{`Software Developer \u2013 Coop`}</Typography.Title>
                                        <Flex align="center" gap={8} style={{ marginBottom: 10 }}>
                                            <Typography.Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>September 2024 - December 2024</Typography.Text>
                                        </Flex>
                                        <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, marginBottom: 0 }}>
                                            Worked as a Software developer on a startup team to build an AI-powered realter dashboard and analytics platform. Contributed to the development of both the SellStatic dashborad and website.
                                        </Typography.Text>
                                        <Break style={{ margin: "18px 0px" }} />
                                        <Flex vertical gap={12}>
                                            <Flex gap={6} align="center" >
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Integrated OpenAI, various AWS services, and Postgres database into the SellStatic dashboard app.
                                                </Typography.Text>
                                            </Flex>

                                            <Flex gap={6}>
                                                <Point />
                                                <Typography.Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                                                    Developed and connected realtor ranking software to the website, comparing against market data and realtors all across the GTA.
                                                    increase.
                                                </Typography.Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>


                                </div>

                                <div style={{ ...cardStyle(SellstaticSection.visible, 120), width: "60%", height: "100%", marginBottom: 42 }}>

                                    <SkillScroller
                                        skills={[
                                            ["/Sellstatic/react.png", "React"],
                                            ["/Sellstatic/python.png", "Python"],
                                            ["/Sellstatic/django.svg", "Django"],
                                            ["/Sellstatic/AWS.png", "AWS"],
                                            ["/Sellstatic/node.png", "NodeJS"]
                                        ]}></SkillScroller>

                                </div>
                            </Flex>

                        </Flex>
                    </>
                </Flex>

            </div>
        </div>
    )
}