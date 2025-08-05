import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-52 bg-[#fdf5f3] border-e shadow-sm p-4 flex flex-col gap-2 h-full">
      <h2 className="font-semibold text-lg mb-3">Lore</h2>
      {Array.from({ length: 15 }).map((_, i) => (
        <button
          key={i}
          className="text-gray-500 border border-transparent hover:border-red-300 hover:text-red-500 rounded px-3 py-1 text-sm transition"
        >
          Ghost button
        </button>
      ))}
    </aside>
  );
}
