// app/page.tsx
import React from 'react';
import Sidebar from './components/Sidebar';
import TemplateCard from '@/components/ui/Card';
import SearchBar from '@/components/layout/Searchbar';

const mainCard = {
  title: 'Fireworks Infographics',
  subtitle: 'Here is where your presentation begins',
  name: 'Tên Thiệp',
  price: 10000,
  category: 'Thể loại',
  imageUrl: '/card-demo.png',
};

const cards = Array.from({ length: 20 }).map((_, index) => ({
  title: 'Fireworks Infographics',
  subtitle: 'Here is where your presentation begins',
  name: 'Tên Thiệp',
  price: 10000,
  category: 'Thể loại',
  imageUrl: '/card-demo.png',
}));

export default function TemplatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf5f3]">
      <main className="flex-1 flex gap-6 w-full overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Banner chính */}
          <div className="flex justify-center mb-10 mx-auto">
            <div className="pt-5 w-full max-w-6xl">
              <TemplateCard {...mainCard} featured />
            </div>
          </div>

          {/* Filter + Search */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 shadow-sm border-t border-b w-full bg-[#fdf5f3]">
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-start bg-[#fdf5f3]">
              <select className="border rounded-xl px-3 py-2 text-sm">
                <option>Phong cách</option>
              </select>
              <select className="border rounded-xl px-3 py-2 text-sm">
                <option>Màu sắc</option>
              </select>
              <select className="border rounded-xl px-3 py-2 text-sm">
                <option>Kích thước</option>
              </select>
            </div>
            <div className="w-[500]">
              <SearchBar />
            </div>
          </div>

          {/* Danh sách templates */}
          <div className="flex w-full gap-2 flex-1 overflow-hidden mt-5">
            <Sidebar />
            <div
              className="flex-1 overflow-y-auto pr-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div
                  style={{
                    display: 'none',
                  }}
                  className="scrollbar-hide"
                />

                {cards.map((template, index) => (
                  <TemplateCard key={index} {...template} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
