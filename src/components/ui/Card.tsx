import { useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

type Props = {
  title: string;
  subtitle: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
};

export default function TemplateCard({
  title,
  subtitle,
  name,
  price,
  category,
  imageUrl,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "w-[400px] h-[300px] rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300",
        hovered
          ? "border-[#E53E3E] bg-[#FFF4F2]"
          : "border-neutral-400 bg-[#FFF9F7]"
      )}
    >
      {/* Top content */}
      <div className="flex justify-between relative">
        {/* Text */}
        <div>
          <h2 className="text-xl font-bold text-[#221B1B]">{title}</h2>
          <p className="text-sm text-[#221B1B] opacity-60">{subtitle}</p>
        </div>

        {/* Image */}
        <Image
          src={imageUrl}
          alt="preview"
          width={120}
          height={120}
          className="object-contain"
        />

        {/* Arrows */}
        {hovered && (
          <>
            <ChevronLeft className="absolute left-[-16px] top-1/2 transform -translate-y-1/2 text-[#E53E3E]" />
            <ChevronRight className="absolute right-[-16px] top-1/2 transform -translate-y-1/2 text-[#E53E3E]" />
          </>
        )}
      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-between bg-inherit mt-2">
        <div className="flex flex-col">
          <span className="text-lg font-medium text-[#221B1B]">{name}</span>
          <div className="flex items-center gap-1 text-sm text-[#221B1B]">
            <User size={16} />
            {price}
          </div>
        </div>

        <button
          className={clsx(
            "rounded-lg px-4 py-1 text-sm transition-all duration-200",
            hovered
              ? "bg-[#FCE7E7] text-[#221B1B]"
              : "bg-[#D6D6D6] text-[#221B1B]"
          )}
        >
          {category}
        </button>
      </div>
    </div>
  );
}