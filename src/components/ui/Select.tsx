import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type SelectProps = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
};

export default function Select({
  options,
  value,
  onChange,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64 my-4">
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-xl border text-lg font-medium transition-all
          ${disabled
            ? "bg-[#FEF6F3] text-[#A3A3A3] border-[#C5C5C5] cursor-not-allowed"
            : isOpen
            ? "bg-[#FEF6F3] text-[#2E2724] border-[#2E2724]"
            : "bg-[#FEF6F3] text-[#2E2724] border-[#A3A3A3] hover:bg-[#E6E6E6]"}
        `}
      >
        <span>{value || "Select"}</span>
        {isOpen ? (
          <ChevronUp className={`w-5 h-5 ${disabled ? "text-[#A3A3A3]" : ""}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${disabled ? "text-[#A3A3A3]" : ""}`} />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-[#2E2724] bg-[#FEF6F3] shadow-md z-10">
          <div className="p-4 border-b border-gray-300 font-bold text-[#2E2724]">
            Select
          </div>
          <ul className="px-4 py-2 text-[#2E2724]">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt)}
                className="py-1 cursor-pointer hover:underline"
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}