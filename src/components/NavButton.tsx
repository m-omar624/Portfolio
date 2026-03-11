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
      {content}
    </button>
  );
}