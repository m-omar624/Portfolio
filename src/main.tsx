import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./style.scss"; // ✅ bring in your background styles

function Root() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);
 

  const config = React.useMemo(
    () => ({
      algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: "#b700ff",
      },
    }),
    [dark]
  );

  return (
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);