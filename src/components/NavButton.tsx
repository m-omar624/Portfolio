import { Typography } from "antd";
import "./NavButton.css";

export default function NavButton({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="nav-button"
    >
      <Typography.Text style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' }}>{content}</Typography.Text>

    </button>
  );
}