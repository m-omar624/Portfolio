import React, { useState } from "react";

type Variant = "primary" | "default";
type Size = "small" | "middle" | "large";

const sizeStyles: Record<Size, React.CSSProperties> = {
    small:  { padding: "4px 10px",  fontSize: 13 },
    middle: { padding: "6px 15px",  fontSize: 14 },
    large:  { padding: "9px 20px",  fontSize: 16 },
};

export default function AppButton({
    children,
    onClick,
    variant = "default",
    size = "middle",
    style,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: Variant;
    size?: Size;
    style?: React.CSSProperties;
}) {
    const [hovered, setHovered] = useState(false);

    const primaryStyle: React.CSSProperties = {
        background: hovered ? "rgba(155, 90, 255, 0.9)" : "rgba(120, 47, 255, 0.75)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.95)",
    };

    const defaultStyle: React.CSSProperties = {
        background: "rgba(255,255,255,0.04)",
        border: hovered
            ? "1px solid rgba(255,255,255,0.5)"
            : "1px solid rgba(255,255,255,0.12)",
        color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.75)",
    };

    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                cursor: "pointer",
                borderRadius: 6,
                fontWeight: 400,
                outline: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "background 150ms ease, color 150ms ease, border-color 150ms ease",
                ...sizeStyles[size],
                ...(variant === "primary" ? primaryStyle : defaultStyle),
                ...style,
            }}
        >
            {children}
        </button>
    );
}
