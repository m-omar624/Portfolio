import { Typography } from "antd";
import "./Projects.scss";

type Project = {
  name: string;
  image: string;
  tags: string[];
};

const projects: Project[] = [
  { name: "HireUpp", image: "/magna.png",
    desc:  
    tags: ["React", "GoLang", "AWS"] },
  { name: "BidlyAuctions", image: "/magna.png", tags: ["Java", "SpringBoot", "Docker"] },
  { name: "Bookmark", image: "/magna.png", tags: ["Java", "SpringBoot", "SQL"] },
  { name: "Chatroom", image: "/magna.png", tags: ["Python", "Websockets"] },
  { name: "Tether", image: "/magna.png", tags: ["Python", "OpenAPI"] },
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