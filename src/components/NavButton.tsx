import { Button, theme } from "antd";
import "./NavButton.css";

export default function NavButton({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) {
  const { token } = theme.useToken();

  return (
    <Button
      type="text"
      size="small"
      onClick={onClick}
      className="nav-button"
      style={{
        color: "rgba(255, 255, 255, 0.8)",
      }}
    >
      {content}
    </Button>
  );
}