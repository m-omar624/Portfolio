import { Button, Flex, Typography } from "antd";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import SkillScroller from "./components/SkillTags";
import ProjectCard from "./components/ProjectCard";

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


function SectionHeader({ logo, logoHeight, logoWidth, text, visible, justify, delay = 300 }: { text: string; logoHeight?: number, logoWidth?: number; visible: boolean; logo?: string; justify?: "flex-start" | "center" | "flex-end"; delay?: number }) {
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
            }}
        >
            {logo && <img src={logo} style={{ width: logoWidth || 30, height: logoHeight || 30 }} />}
            <Typography.Title level={2} style={{ marginTop: 24, lineHeight: 1, color: "white" }}>
                {text}
            </Typography.Title>
        </Flex>
    );
}

export default function Projects() {
    const magnaSection = useScrollVisible<HTMLDivElement>();
    const bondSection = useScrollVisible<HTMLDivElement>();
    const theScoreSection = useScrollVisible<HTMLDivElement>();
    const SellstaticSection = useScrollVisible<HTMLDivElement>();

        const [selectedProject, setSelectedProject] = useState("")
    const HireUppDesc = "A microservice architecture, multi point, SaaS ATS with AI resume scoring to aid in company hiring workflows. Designed frontend, implemented API controller middleware, and developed natural language processing resume grading tool with Kafka messaging queue for batch resume grading."
    const HireUppTags = ["Python", "React", "GoLang", "FastAPI", "OpenAPI", "Postgres", "Docker", "AWS", "OAuth",]

    const BidlyAuctionsDesc = "A microservice architecture, auction platform with websocket communication for real time updates. Designed frontend and developed backend MVC and Pub/Sub Model, SQL database, REST API endpoints, and live websocket connection for realtime auction bidding"
    const BidlyAuctionsTags = ["Java", "SpringBoot", "Docker", "HTML", "CSS", "SQL", "JUnit", "REST"]

    const BookmarkDesc = "A Spotify like repository featuring millions of books, personalized suggestions, and book rating system. Developed core business logic for search engine, reccommendation feature, and backend API endpoints"
    const BookmarkTags = ["Java", "SpringBoot", "JUnit", "Jira", "SQL", "HTML", "CSS", "Docker"]

    const ChatroomDesc = "Secure chatroom with end to end encryption for chats and file transfer, secure login authentication, and secure password encryption. Implemented secure password authentication and storage, encrypted file transfer service, and Diffie Hellman exchange handshake."
    const ChatroomTags = ["Python", "pyCrypto", "SHA", "Websockets", "Postgres"]

    const TetherDesc = "A simple natural language processing, algorithmic desktop assistant. Developed a natural language processing algorithm to parse user commands and execute tasks such as opening applications, performing web searches, and managing files."
    const TetherTags = ["Python", "OpenAPI", "JavaScript"]

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
        <div id="projects" style={{
            position: "relative",
            padding: "20px",
            paddingInline: "20vw",
        }}>
            <div style={{ position: "relative", zIndex: 1 }}>
            <style>{`
                @keyframes indicatorPulse {
                    0% { transform: scale(0.5); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 0; }
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
                    <Flex gap={30} style={{ marginBottom: 20 }}>
                        <div style={{ width: "50%" }}>
                            <Flex vertical gap={"30px"}>
                            <ProjectCard title="HireUpp" description={HireUppDesc} tags={HireUppTags} image="/Projects/HireuppSelect.png" github="https://github.com/ua0101/hireupp" />
                            <ProjectCard title="Bookmark" description={BookmarkDesc} tags={BookmarkTags} image="/Projects/Bookmark.png" github="https://github.com/HuseynAkh/Bookmark" />
                            <ProjectCard title="Tether" description={TetherDesc} tags={TetherTags} image="/Projects/Tether.png" />


                            </Flex>
                        </div>
                        
                        <Flex ref={magnaSection.ref} vertical gap={"30px"} style={{ width: "50%", paddingTop:"30vh" }}>
                            <ProjectCard title="BidlyAuctions" description={BidlyAuctionsDesc} tags={BidlyAuctionsTags} image="/Projects/Bidly.png" github="https://github.com/Isaiahak/EECS-4413-Group-Project"/>
                            <ProjectCard title="Chatroom" description={ChatroomDesc} tags={ChatroomTags} image="/Projects/SecureChat.png" github="https://github.com/m-omar624/Python-Secure-Chat-Room"/>
                        </Flex>

                    </Flex>
                </>

            </Flex>

            </div>
        </div>
    )
}