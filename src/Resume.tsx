import { Card } from "antd";
import "./Resume.scss";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Entry from "./components/Entry";
import AppButton from "./components/AppButton";
import { useEffect, useRef, useState } from "react";

import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

function useScrollVisible<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ResumeSection() {
  const { ref, visible } = useScrollVisible<HTMLDivElement>(0.12);

  const containerStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 520ms ease 120ms, transform 480ms cubic-bezier(0.2,0.9,0.18,1) 120ms",
  };

  return (
    <section
      id="resume"
      ref={ref}
      style={{ width: "100%", margin: "0 auto", padding: "0px, 0px", backgroundColor: "black" }}
    >
      <Card size="small" style={{ backgroundColor: "black", border: "none" }}>
        <div className="resume-preview" style={containerStyle}>
          <div
            style={{
              width: 650,
              maxWidth: "100%",
              height: 800,
              maxHeight: "100%",
              aspectRatio: "1 / 1.414",
              borderRadius: 6,
              background: "rgba(255,255,255,0.04)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {visible ? (
              <Viewer theme={"dark"} enableSmoothScroll defaultScale={1.0} fileUrl="/resume.pdf" />
            ) : (
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Resume will load when visible...</div>
            )}
          </div>

          {/* Right: Download hero panel */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "-50%",
              width: "22vw",
              padding: 20,
              backgroundColor: "black",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Entry text="VIEW MY RESUME" delays={[0,300,600]} duration={900} random={false} fontSize={55} fontWeight={800} play={visible} />
              <a href="/Muhammad-Omar-Resume.pdf" download>
                <AppButton
                  size="large"
                  variant="default"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontSize: 12,
                    fontWeight: 200,
                    marginTop: 10,
                  }}
                >
                  Download Resume
                </AppButton>
              </a>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}