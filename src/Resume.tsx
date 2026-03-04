import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

// 👇 Make versions match automatically
GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ResumeViewer() {
  return (
    <div style={{display:"flex", flex:1, justifyContent:"center", alignContent:"center"}}>
    <div style={{ height: "100vh", width:"76vw"}}>
      <Viewer enableSmoothScroll defaultScale={0.8} fileUrl="/resume.pdf" />
    </div>
    </div>

  );
}