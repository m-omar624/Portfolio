import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";
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


export default function Projects() {
    const magnaSection = useScrollVisible<HTMLDivElement>();

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