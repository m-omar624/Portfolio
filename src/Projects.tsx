import { Typography } from "antd";
import "./Projects.scss";

type Project = {
  name: string;
  image: string;
  desc: string;
  tags: string[];
};

const projects: Project[] = [
  { name: "HireUpp", image: "/magna.png",
    desc: "A full-stack web application designed to streamline the hiring process for small businesses. It features a user-friendly interface for job seekers to browse and apply for positions, while employers can easily post job listings and manage applications. Built with React, GoLang, and AWS, HireUpp offers a seamless experience for both parties, making it easier than ever to connect talent with opportunity.", 
    tags: ["React", "GoLang", "AWS"] },
  { name: "BidlyAuctions", image: "/magna.png", 
    desc: "An online auction platform that allows users to bid on a wide range of items, from collectibles to electronics. The application features real-time bidding updates, secure payment processing, and a user-friendly interface for both buyers and sellers. Built with Java, SpringBoot, and Docker, BidlyAuctions provides a seamless and engaging auction experience for users.",
    tags: ["Java", "SpringBoot", "Docker"] },
  { name: "Bookmark", image: "/magna.png", desc: "A bookmarking application that allows users to save, organize, and share their favorite web pages. Built with Java, SpringBoot, and SQL, Bookmark provides a simple and efficient way to manage online content.", tags: ["Java", "SpringBoot", "SQL"] },
  { name: "Chatroom", image: "/magna.png", desc: "A real-time chat application that enables users to communicate instantly. Built with Python and Websockets, Chatroom offers a seamless messaging experience.", tags: ["Python", "Websockets"] },
  { name: "Tether", image: "/magna.png", desc: "An API integration platform that connects various services and automates workflows. Built with Python and OpenAPI, Tether simplifies the process of integrating and managing APIs.", tags: ["Python", "OpenAPI"] },
];

export default function Projects() {
  return (
    <section id="projects" className="proj-section">
      <Typography.Title level={2} className="proj-heading">
        Featured Projects
      </Typography.Title>

      <div className="proj-grid">
        {projects.map((p) => (
          <a key={p.name} className="proj-tile" href="#" onClick={(e) => e.preventDefault()}>
            <img src={p.image} alt={p.name} className="proj-tile__img" />
            <div className="proj-tile__overlay">
              <Typography.Title level={4} className="proj-tile__name">
                {p.name}
              </Typography.Title>
              <div className="proj-tile__tags">
                {p.tags.map((t) => (
                  <span key={t} className="proj-tile__tag">{t}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}