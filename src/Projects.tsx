import { Card, Flex, Typography, Tag } from "antd";
import { useState } from "react";
import ExperienceCard from "./components/ProjectCard2";
import SkillScroller from "./components/SkillScroller";

const glass: React.CSSProperties = {
  background: "rgba(0,0,0,0.48)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  borderRadius: 8,
  padding: "10px 12px",
  border: "1px solid rgba(255,255,255,0.11)",
};

const cardBottom: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "0 8px 16px 8px",
  boxSizing: "border-box",
  gap: 8,
};

const cardTitle: React.CSSProperties = {
  margin: "0 0 2px",
  color: "#fff",
  lineHeight: 1.2,
};

const cardSubtitle: React.CSSProperties = {
  color: "rgba(255,255,255,0.55)",
  fontSize: 12,
};

const bodyText: React.CSSProperties = {
  color: "rgba(255,255,255,0.8)",
  fontSize: 12,
  lineHeight: 1.65,
  margin: "0 0 6px",
};

const HireUppTags = [
  "Figma", "Python", "GoLang", "React",
  "FastAPI", "OpenAPI", "Postgres", "Docker", "AWS",
];

const BidlyTags = [
  "Java", "Springboot", "Websockets", "HTML",
  "CSS", "Docker",
];
const BookMarkTags = [
  "Java", "Springboot", "HTML",
  "CSS", "Docker",
];
const SecureChatroomTags = [
  "Python", "Websockets", "PyCrypto"
];
const TetherTags = [
  "Java", "NLP", "OpenAPI", "JavaScript",
];

export default function Projects() {
  const [selectedExperience, setSelectedExperience] = useState<string>("Magna");

  return (
    <>
      <Card size="small">
        <Flex style={{ margin: 0 }} gap={10}>

          {/* ── Magna · HireUpp ─────────────────────────── */}
          <ExperienceCard
            experienceName="HireUpp"
            image="/magna.png"
            offsetX={10}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          >
            <div style={cardBottom}>
              <div style={glass}>
                <Typography.Title level={3} style={cardTitle}>HireUpp</Typography.Title>
                <span style={cardSubtitle}>Person Project</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {HireUppTags.map(tag => (
                    <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div style={glass}>
                <p style={bodyText}>
                  Multi-instance SaaS ATS leveraging NLP for automated resume scoring to assist employers in the hiring process.
                </p>
                <p style={{ ...bodyText, margin: 0 }}>
                  Designed UI, built GoLang middleware API controller for a Kafka message broker, and implemented multi-instance NLP resume grading for efficient bulk processing.
                </p>
              </div>
            </div>
          </ExperienceCard>

                    <ExperienceCard
            experienceName="BidlyAuctions"
            image="/magna.png"
            offsetX={10}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          >
            <div style={cardBottom}>
              <div style={glass}>
                <Typography.Title level={3} style={cardTitle}>BidlyAuctions</Typography.Title>
                <span style={cardSubtitle}>Course Project</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {BidlyTags.map(tag => (
                    <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div style={glass}>
                <p style={bodyText}>
                  A microservice architecture auction platform using Java SpringBoot featuring websockets for real time auction bids and updates. Deployed via docker.
                </p>
                <p style={{ ...bodyText, margin: 0 }}>
                  Designed UI, developed springboot API controller and core login functionality. Implemented Websocket client communication and pub sub "Track Auction" feature. Participated in thorough unit testing and Docker deployment
                </p>
              </div>
            </div>
          </ExperienceCard>

                    <ExperienceCard
            experienceName="Bookmark"
            image="/magna.png"
            offsetX={10}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          >
            <div style={cardBottom}>
              <div style={glass}>
                <Typography.Title level={3} style={cardTitle}>Bookmark</Typography.Title>
                <span style={cardSubtitle}>Course Project</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {BookMarkTags.map(tag => (
                    <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div style={glass}>
                <p style={bodyText}>
                  A Spotify like book repository featuring millions of books, personalized suggestions, and book rating system. Developed using Java Springboot. Deployed via docker.
                </p>
                <p style={{ ...bodyText, margin: 0 }}>
                  Developed core backend functionality including API controller, book search, and personalization algorithm. Implemented API fetch and book search optimizations, significantly reducing time and space complexity.
                </p>
              </div>
            </div>
          </ExperienceCard>

                    <ExperienceCard
            experienceName="Secure Chatroom"
            image="/magna.png"
            offsetX={10}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          >
            <div style={cardBottom}>
              <div style={glass}>
                <Typography.Title level={3} style={cardTitle}>Secure Chatroom</Typography.Title>
                <span style={cardSubtitle}>Course Project</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {SecureChatroomTags.map(tag => (
                    <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div style={glass}>
                <p style={bodyText}>
                  A python chatroom with login authentication, secure password storage, end to end encrypted messaging and file transfer. Utilizing websockets for real time communication and PyCrypto for encryption.
                </p>
                <p style={{ ...bodyText, margin: 0 }}>
                  Developed Secure password storage using hashing algorithm and password salt. Implemented Diffie Hellman key exchange handshake and encrypted messaging. Participated in security solution report writeup.
                </p>
              </div>
            </div>
          </ExperienceCard>

                    <ExperienceCard
            experienceName="Tether"
            image="/magna.png"
            offsetX={10}
            selectedExperience={selectedExperience}
            setSelectedExperience={setSelectedExperience}
          >
            <div style={cardBottom}>
              <div style={glass}>
                <Typography.Title level={3} style={cardTitle}>Tether</Typography.Title>
                <span style={cardSubtitle}>Personal Project</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {TetherTags.map(tag => (
                    <Tag key={tag} style={{ margin: 0, fontSize: 11 }}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <div style={glass}>
                <p style={bodyText}>
                  An NLP desktop assistant for everyday tasks.
                </p>
                <p style={{ ...bodyText, margin: 0 }}>
                  Developed NLP speech to text translator and algorithmic task execution. Implemented Implemented simple front end for conversation history. Launched as a background process with audio queues.
                </p>
              </div>
            </div>
          </ExperienceCard>


        </Flex>
      </Card>
    </>
  );
}
