"use client";

import React, { useState } from "react";

type Input = "default" | "typing" | "disable" | "hover" | "error";

type InputStyle = {
    text: string;
    background: string;
    border: string;
};

const INPUT_STYLES: Record<Input, InputStyle> = {

    default: {
        text: 'var(--color-primary-dark)',
        background: 'var(--color-bg-main)',
        border: 'var(--color-gray)'
    },

    typing: {
        text: 'var(--color-primary-dark)',
        background: 'var(--color-bg-main)',
        border: 'var(--color-primary-dark)'
    },

    disable: {
        text: 'var(--color-gray)',
        background: 'var(--color-bg-main)',
        border: 'var(--color-gray)'
    },

    hover: {
        text: 'var(--color-primary-dark)',
        background: 'var(--color-gray)',
        border: 'var(--color-primary-dark)'
    },

    error: {
        text: 'var(--color-primary)',
        background: 'var(--color-bg-main)',
        border: 'var(--color-primary)'
    },

};

type Props = {
    variant?: Input;
    className?: string;
    disabled?: boolean;
    error?: boolean;
    value?: string;
    onChange?: (value: string) => void;
};

const Input = ({
    variant = "default",
    className = "",
    disabled = false,
    error = false,
    value = "",
    onChange,
}: Props) => {
    const [state, setState] = useState<Input>(variant);

    const currentVariant: Input = disabled
        ? "disable"
        : error
            ? "error"
            : state;

    const style = INPUT_STYLES[currentVariant];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <input
            type="text"
            className="transition-all duration-150"
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onFocus={() => !disabled && !error && setState("typing")}
            onBlur={() => !disabled && !error && setState("default")}
            onMouseEnter={() => !disabled && !error && setState("hover")}
            onMouseLeave={() => !disabled && !error && setState("default")}
            style={{
                padding: "8px 10px",
                color: style.text,
                backgroundColor: style.background,
                borderColor: style.border,
                borderRadius: 8,
                borderStyle: "solid",
                borderWidth: "1px",
                cursor: disabled ? "not-allowed" : "text",
                outline: "none",
            }}
        />
    );
};

export type { Input, InputStyle, Props };

export { INPUT_STYLES };

export default Input;