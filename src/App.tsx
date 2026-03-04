import { Switch, Typography, theme, Card, Flex } from "antd";
import Navigation from "./Navigation";
import Landing from "./Landing";
import Experience from "./Experience";
import Projects from "./Projects";
import Resume from "./Resume";

type Props = {
  dark: boolean;
  setDark: (v: boolean) => void;
};

export default function App() {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: token.colorBgLayout,
        color: token.colorText,
        padding: 10,
      }}
    >
      <Flex vertical gap={6}>
      <Navigation></Navigation>
      <Landing></Landing>
      <Experience></Experience>
      <Projects></Projects>
      <Resume></Resume>
      </Flex>

      {/* <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Typography.Text>Dark mode</Typography.Text>
        <Switch checked={dark} onChange={setDark} />
      </div>

      <Card style={{ marginTop: 16 }} title="Ant Design">
        This card will switch themes.
      </Card> */}
    </div>
  );
}