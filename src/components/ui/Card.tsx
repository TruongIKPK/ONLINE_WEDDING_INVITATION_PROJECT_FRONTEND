'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

import Link from 'next/link';

type Props = {
  title: string;
  subtitle: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  featured?: boolean;
};

export default function TemplateCard({
  title,
  subtitle,
  name,
  price,
  category,
  imageUrl,
  featured,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        featured
          ? 'w-full xl:w-[700px] xl:h-[400px] lg:w-[700px] lg:h-[400px] md:w-[700px] md:h-[400px] sm:w-[600px] sm:h-[400px] '
          : 'w-full xl:w-[350px] xl:h-[250px] lg:w-[250px] lg:h-[180px] md:w-[270px] md:h-[200px] sm:w-[300px] sm:h-[200px]',
        'rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300',
        hovered ? 'border-[#E53E3E] bg-[#FFF4F2]' : 'border-neutral-400 bg-[#FFF9F7]',
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
        <Image src={imageUrl} alt="preview" width={120} height={120} className="object-contain" />

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

        <Link
          href={`/dashboard/card/${encodeURIComponent(name)}`}
          className={clsx(
            'rounded-lg px-4 py-1 text-sm transition-all duration-200',
            hovered ? 'bg-[#FCE7E7] text-[#221B1B]' : 'bg-[#D6D6D6] text-[#221B1B]',
          )}
        >
          {category}
        </Link>
      </div>
    </div>
  );
}
