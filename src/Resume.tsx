import { Button, Typography } from "antd";
import "./Resume.scss";

export default function ResumeSection() {
  return (
    <section id="resume" className="resume-section">
      <div className="resume-grid">
        {/* Left: PDF preview thumbnail */}
        <div className="resume-preview">
          <div className="resume-preview__frame">
            <div className="resume-preview__placeholder">
              <Typography.Text className="resume-preview__text">Resume Preview</Typography.Text>
            </div>
          </div>
        </div>

        {/* Right: Download hero panel (blank background) */}
        <div className="resume-hero">
          <div className="resume-hero__content">
            <Typography.Title level={1} className="resume-hero__heading">
              DOWNLOAD<br />MY RESUME
            </Typography.Title>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              <Button type="primary" size="large" className="resume-hero__btn">
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}