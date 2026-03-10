import React, { useEffect, useState } from "react";
import { theme, Flex } from "antd";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Experience from "./Experience";
import About from "./About";
import Projects from "./Projects";
import Resume from "./Resume";
import WireframeBackground from "./components/WireframeBackground";

export default function App() {
  const { token } = theme.useToken();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* Background from the example */}



      {/* Your site content */}
      <div
        style={{
          minHeight: "100vh",
          color: token.colorText,
          position: "relative",
          zIndex: 1,
          backgroundColor: "black",
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

            <div style={{ position: "relative", background: "#050a12" }}>
              <WireframeBackground />
              <Landing />
              <About />
            </div>
            <Experience />
            <Projects />
            <Resume />
          </Flex>
        </div>
      </div>
    </>
  );
}