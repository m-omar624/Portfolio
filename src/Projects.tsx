import { Button, Flex, Typography, Image, theme, Card, Col, Slider, Row } from "antd"
import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
const { useToken } = theme

export default function Projects() {
    const { token } = useToken()
    const [selectedProject, setSelectedProject] = useState("")
    const HireUppDesc = "A microservice architecture, multi point, SaaS ATS with AI resume scoring to aid in company hiring workflows"
    const HireUppTags = ["Python", "React", "GoLang", "FastAPI", "OpenAPI", "Postgres", "Docker", "AWS", "OAuth",]

    const BidlyAuctionsDesc = "A microservice architecture, auction platform with websocket communication for real time updates"
    const BidlyAuctionsTags = ["Java", "SpringBoot", "Docker", "HTML", "CSS", "SQL", "JUnit", "REST"]

    const BookmarkDesc = "A Spotify like repository featuring millions of books, personalized suggestions, and book rating system"
    const BookmarkTags = ["Java", "SpringBoot", "JUnit", "Jira", "SQL", "HTML", "CSS", "Docker"]

    const ChatroomDesc = "Secure chatroom with end to end encryption for chats and file transfer, secure login authentication, and secure password encryption"
    const ChatroomTags = ["Python", "pyCrypto", "SHA", "Websockets", "Postgres"]

    const TetherDesc = "A simple natural language processing, algorithmic desktop assistant"
    const TetherTags = ["Python", "OpenAPI"]

    return (
        <>
            <Card>
                <Flex style={{ marginBlock: 30 }} gap={10}>

                    <ProjectCard
                        projectName="HireUpp"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        image=""
                        description={HireUppDesc}
                        tags={HireUppTags}>

                    </ProjectCard>

                    <ProjectCard
                        projectName="BidlyAuctions"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        image=""
                        description={BidlyAuctionsDesc}
                        tags={BidlyAuctionsTags}>

                    </ProjectCard>

                    <ProjectCard
                        projectName="Bookmark"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        image=""
                        description={BookmarkDesc}
                        tags={BookmarkTags}>

                    </ProjectCard>

                    <ProjectCard
                        projectName="Chatroom"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        image=""
                        description={ChatroomDesc}
                        tags={ChatroomTags}>

                    </ProjectCard>

                    <ProjectCard
                        projectName="Tether"
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        image=""
                        description={TetherDesc}
                        tags={TetherTags}>

                    </ProjectCard>

            </Flex>
        </Card>

        </>
    );
}