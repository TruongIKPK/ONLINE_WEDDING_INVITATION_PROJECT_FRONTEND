import React, { useState } from "react";

type PrimaryVariant = "default" | "hover" | "click" | "disabled";
type SecondaryVariant = "default" | "click" | "no_outline" | "no_outline_hover";
type GhostVariant = "default" | "hover";

type ButtonStyle = {
    text: string;
    background: string;
    border: string;
    fontWeight?: string;
    textDecoration?: string;
};

type ButtonType = "primary" | "secondary" | "ghost";

type ButtonVariants = {
    primary: Record<PrimaryVariant, ButtonStyle>;
    secondary: Record<SecondaryVariant, ButtonStyle>;
    ghost: Record<GhostVariant, ButtonStyle>;
};

const BUTTON_STYLES: ButtonVariants = {
    primary: {
        default: { text: "#B42E2F", background: "#FEF6F3", border: "#B42E2F" },
        hover: { text: "#E46B70", background: "#FEF6F3", border: "#E46B70" },
        click: { text: "#B42E2F", background: "#FFEDD8", border: "#B42E2F" },
        disabled: { text: "#A3A3A3", background: "#FEF6F3", border: "#A3A3A3" },
    },
    secondary: {
        default: { text: "#A3A3A3", background: "#FEF6F3", border: "#A3A3A3" },
        click: { text: "#2E2724", background: "#A3A3A3", border: "#2E2724" },
        no_outline: { text: "#2E2724", background: "transparent", border: "transparent" },
        no_outline_hover: { text: "#2E2724", background: "transparent", border: "transparent", fontWeight: "bold", textDecoration: "underline", },
    },
    ghost: {
        default: { text: "#A3A3A3", background: "transparent", border: "transparent" },
        hover: { text: "#2E2724", background: "transparent", border: "transparent" },
    },
} as const;

type VariantMode = "outline" | "no_outline";

type Props = {
    type: ButtonType;
    variantMode?: VariantMode;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
};

const Button = ({ type, disabled = false, children, onClick }: Props) => {
    const [state, setState] = useState<"default" | "hover" | "click">("default");

    const getCurrentVariant = (): string => {
        if (disabled) return "disabled";
        if (state === "click") return "click";
        if (state === "hover") {
            if (type === "secondary") return "no_outline_hover";
            return "hover";
        }
        if (type === "secondary") return "no_outline";
        return "default";
    };

    const currentVariant = getCurrentVariant() as
        | PrimaryVariant
        | SecondaryVariant
        | GhostVariant;

    let style: ButtonStyle;

    if (type === "primary") {
        style = BUTTON_STYLES.primary[currentVariant as PrimaryVariant];
    } else if (type === "secondary") {
        style = BUTTON_STYLES.secondary[currentVariant as SecondaryVariant];
    } else {
        style = BUTTON_STYLES.ghost[currentVariant as GhostVariant];
    }

    const buttonStyle: React.CSSProperties = {
        padding: "8px 10px",
        borderRadius: 8,
        color: style.text,
        backgroundColor: style.background,
        borderColor: style.border,
        fontWeight: style.fontWeight,
        textDecoration: style.textDecoration,
        borderStyle: "solid",
        borderWidth: "3px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s ease-in-out",
        outline: "none",
        boxShadow: "5px 5px 0 rgba(217, 213, 211, 0.4)",
    };

    return (
        <button
            disabled={disabled}
            onClick={() => {
                if (disabled) return;
                setState("click");
                onClick?.();
                setTimeout(() => setState("default"), 150);
            }}
            onMouseEnter={() => !disabled && setState("hover")}
            onMouseLeave={() => !disabled && setState("default")}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};

export type {
  PrimaryVariant,
  SecondaryVariant,
  GhostVariant,
  ButtonStyle,
  ButtonType
};

export { BUTTON_STYLES };

export default Button;