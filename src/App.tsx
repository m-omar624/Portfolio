import { useState } from "react";
import { theme, Flex } from "antd";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Experience from "./Experience";
import About from "./About";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";
import WireframeBackground from "./components/WireframeBackground";
import GooeyBackground from "./components/GooeyBackground";
import InteractiveDemo from "./components/InteractiveDemo";

export default function App() {
  const { token } = theme.useToken();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Interactive Demo — full-screen overlay */}
      {demoOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
          <InteractiveDemo onClose={() => setDemoOpen(false)} />
        </div>
      )}

      {/* Your site content */}
      <div
        style={{
          minHeight: "100vh",
          color: token.colorText,
          position: "relative",
          zIndex: 1,
          backgroundColor: "black",
          opacity: demoOpen ? 0 : 1,
          transition: "opacity 400ms ease",
          pointerEvents: demoOpen ? "none" : "auto",
        }}
      >
        <Navigation onItemClick={() => setDemoOpen(false)} />
        <div
          style={{
            minHeight: "100vh",
            color: token.colorText,
            position: "relative",
            zIndex: 1,
            backgroundColor: token.colorBgBase,
          }}
        >
          <Flex vertical gap={80} style={{backgroundColor:"black"}}>

            <div style={{ position: "relative", background: "#000000"}}>
              <WireframeBackground />
              <Landing />
              <About />
            </div>
            <div style={{ position: "relative", background: "#000000"}}>
              <GooeyBackground brightness={0.2} opacity={0.6} />
              <Experience onInteractive={() => setDemoOpen(true)} />
              <Projects />
            </div>
            <Resume />
            <Contact />
          </Flex>
        </div>
      </div>
    </>
  );
}