import React, { useEffect, useState } from "react";
import { theme, Flex } from "antd";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Experience from "./Experience";

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
          backgroundColor: token.colorBgBase,
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
          <Flex vertical gap={6}>

            <Landing />
            <Experience />
          </Flex>
        </div>
      </div>
    </>
  );
}