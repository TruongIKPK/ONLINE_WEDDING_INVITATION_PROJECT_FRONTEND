import React, { useState } from "react";

type Input = "default" | "typing" | "disable" | "hover" | "error";

type InputStyle = {
    text: string;
    background: string;
    border: string;
};

const INPUT_STYLES: Record<Input, InputStyle> = {

    default: { text: "#2E2724", background: "#FEF6F3", border: "#A3A3A3" },
    typing: { text: "#2E2724", background: "#FEF6F3", border: "#2E2724" },
    disable: { text: "#A3A3A3", background: "#FEF6F3", border: "#A3A3A3" },
    hover: { text: "#2E2724", background: "#A3A3A3", border: "#2E2724" },
    error: { text: "#B42E2F", background: "#FEF6F3", border: "#B42E2F" },

};

type Props = {
    variant?: Input;
    disabled?: boolean;
    error?: boolean;
    value?: string;
    onChange?: (value: string) => void;
};

const Input = ({
    variant = "default",
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