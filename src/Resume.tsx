import { Button, Card, Typography } from "antd";
import "./Resume.scss";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { theme } from "antd";

import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

GlobalWorkerOptions.workerSrc = pdfWorker;
const { useToken } = theme;

export default function ResumeSection() {
  const { token } = useToken();

  // Pick your own rule for "dark"
  const isDark = token.colorBgContainer === "#141414";
  const viewerTheme = isDark ? "dark" : "light"; // or "auto"
  return (
    <section id="resume" className="resume-section">
      <Card size="small">
        <div className="resume-preview">
          <div style={{
            width:650, maxWidth:"100%",
            height: 800, maxHeight:"100%",
            aspectRatio: "1 / 1.414",
            borderRadius: 6,
            background: token.colorBgContainer,
            overflow: "hidden",
            display:"flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
                    <Viewer
        theme={viewerTheme}
        enableSmoothScroll
        defaultScale={1.0}
        fileUrl="/resume.pdf"
      />
        </div>

        {/* Right: Download hero panel (blank background) */}
        <div className="resume-hero">
          <div style={{textAlign:"center"}}>
            <Typography.Title level={1} className="resume-hero__heading">
              VIEW MY <br />RESUME
            </Typography.Title>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" download>
              <Button type="primary" size="large" className="resume-hero__btn" style={{color:token.colorText}}>
                Download Resume
              </Button>
            </a>
          </div>
        </div>
      </div>
      </Card>

    </section>
  );
}