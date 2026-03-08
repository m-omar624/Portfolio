import React, { useEffect, useState } from "react";
import { theme, Flex } from "antd";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Experience from "./Experience";
import Projects from "./Projects";
import Resume from "./Resume";
import AboutMe from "./components/AboutMe";
import Contact from "./Contact";

export default function App() {
  const { token } = theme.useToken();
  const [demoOpen, setDemoOpen] = useState(false);
  useEffect(()=>{
    // Initialize interactive bubble after component mounts.
    // Avoid relying on DOMContentLoaded (may have already fired).
    let rafId: number | null = null;
    let onMouse: ((e: MouseEvent) => void) | null = null;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function startTracking(interBubble: HTMLDivElement) {
      function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        rafId = requestAnimationFrame(move);
      }

      onMouse = (event: MouseEvent) => {
        tgX = event.clientX;
        tgY = event.clientY;
      };

      window.addEventListener('mousemove', onMouse);
      move();
    }

    const el = document.querySelector<HTMLDivElement>('.interactive');
    if (el) {
      startTracking(el);
    } else {
      // If element isn't present yet, watch for it and start when added.
      const mo = new MutationObserver((_, observer) => {
        const found = document.querySelector<HTMLDivElement>('.interactive');
        if (found) {
          startTracking(found);
          observer.disconnect();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (onMouse) window.removeEventListener('mousemove', onMouse);
      if (rafId) cancelAnimationFrame(rafId);
    };
  },[])
  return (
    <>
      {/* Background from the example */}



      {/* Your site content */}
      <div
        style={{
          minHeight: "100vh",
          color: token.colorText,
          padding: "0px 10px 10px 10px",
          position: "relative",
          zIndex: 1,
          backgroundColor: token.colorBgBase,
        }}
      >
                  <Navigation onItemClick={() => setDemoOpen(false)} />
              <div
        style={{
          minHeight: "100vh",
          color: token.colorText,
          paddingTop: 5,
          position: "relative",
          zIndex: 1,
          backgroundColor: token.colorBgBase,
        }}
      >
        <Flex vertical gap={6}>

          <Landing />
          <Experience demoOpen={demoOpen} setDemoOpen={setDemoOpen} />
          <Projects />
          <Resume />
          <AboutMe />
          <Contact />
        </Flex>
      </div>
      </div>
    </>
  );
}