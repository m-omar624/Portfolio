import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./style.scss"; // ✅ bring in your background styles

function Root() {

  return (
    <ConfigProvider>
      <App />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root />
);