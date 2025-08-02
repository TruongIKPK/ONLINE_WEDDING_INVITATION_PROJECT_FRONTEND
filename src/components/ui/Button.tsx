"use client";

import React, { useState } from "react";

type PrimaryVariant = "default" | "hover" | "click" | "disabled";
type SecondaryVariant = "default" | "click" | "no_outline" | "no_outline_hover";
type GhostVariant = "default" | "hover" | "click";

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
        default: {
            text: 'var(--color-primary)',
            background: 'var(--color-bg-main)',
            border: 'var(--color-primary)',
            fontWeight: "bold",
        },

        hover: {
            text: 'var(--color-primary-light)',
            background: 'var(--color-bg-main)',
            border: 'var(--color-primary-light)',
            fontWeight: "bold",
        },

        click: {
            text: 'var(--color-primary)',
            background: 'var(--color-bg-secondary)',
            border: 'var(--color-primary)',
            fontWeight: "bold",
        },

        disabled: {
            text: 'var(--color-primary)',
            background: 'var(--color-bg-main)',
            border: 'var(--color-gray)',
            fontWeight: "bold",
        },
    },
    secondary: {
        default: {
            text: 'var(--color-gray)',
            background: 'var(--color-bg-main)',
            border: 'var(--color-gray)',
            fontWeight: "lighter",
        },

        click: {
            text: 'var(--color-primary-dark)',
            background: 'var(--color-gray)',
            border: 'var(--color-primary-dark)',
            fontWeight: "lighter",
        },

        no_outline: {
            text: 'var(--color-primary-dark)',
            background: "transparent",
            border: "transparent",
            fontWeight: "lighter",
        },

        no_outline_hover: {
            text: 'var(--color-primary-dark)',
            background: "transparent",
            border: "transparent",
            fontWeight: "bold",
            textDecoration: "underline",
        },
    },
    ghost: {
        default: {
            text: 'var(--color-gray)',
            background: "transparent",
            border: "transparent",
            fontWeight: "lighter",
        },

        hover: {
            text: 'var(--color-primary-dark)',
            background: "transparent",
            border: "transparent",
            fontWeight: "lighter",
        },

        click: {
            text: 'var(--color-primary-dark)',
            background: 'var(--color-gray)',
            border: 'var(--color-primary-dark)',
            fontWeight: "lighter",
        },
    }
} as const;

type VariantMode = "outline" | "no_outline";

type ButtonSize = "small" | "medium" | "large";

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
    small: {
        padding: "0px 0px",
        fontSize: "12px",
    },
    medium: {
        padding: "11px 7px",
        fontSize: "12px",
    },
    large: {
        padding: "20px 16px",
        fontSize: "22px",
    },
};


type Props = {
    type: ButtonType;
    variantMode?: VariantMode;
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
};

const Button = ({ type, variantMode, className = "", size = "medium", disabled = false, children, onClick }: Props) => {
    const [state, setState] = useState<"default" | "hover" | "click">("default");

    const getCurrentVariant = (): string => {
        if (disabled) return "disabled";
        if (state === "click") return "click";

        if (state === "hover") {
            if (type === "secondary") {
                return variantMode === "no_outline" ? "no_outline_hover" : "default";
            }
            return "hover";
        }

        if (type === "secondary") {
            return variantMode === "no_outline" ? "no_outline" : "default";
        }

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

    const sizeStyle = SIZE_STYLES[size];

    const buttonStyle: React.CSSProperties = {
        ...sizeStyle,
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
            className={className}
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