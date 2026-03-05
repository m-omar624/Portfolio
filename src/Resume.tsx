import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { theme } from "antd";

import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

const { useToken } = theme;

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ResumeViewer() {
  const { token } = useToken();

  // Pick your own rule for "dark"
  const isDark = token.colorBgContainer === "#141414";
  const viewerTheme = isDark ? "dark" : "light"; // or "auto"

  return (
    <div
      style={{
        height: "100vh",
        width: "76vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Viewer
        theme={viewerTheme}
        enableSmoothScroll
        defaultScale={1.1}
        fileUrl="/resume.pdf"
      />
    </div>
  );
}