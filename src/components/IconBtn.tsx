import React, { useState } from "react";

export default function IconBtn({
    children,
    onClick,
    style,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    style?: React.CSSProperties;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                color: "white",
                opacity: hovered ? 1 : 0.5,
                transition: "opacity 150ms ease, transform 150ms ease",
                transform: hovered ? "scale(1.15)" : "scale(1)",
                ...style,
            }}
        >
            {children}
        </button>
    );
}
