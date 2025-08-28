// app/page.tsx
'use client';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TemplateCard from '@/components/ui/Card';
import SearchBar from '@/components/layout/Searchbar';
import { Filter, ChevronDown, X, Menu } from 'lucide-react';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const resetFilters = () => {
    setSelectedStyle('');
    setSelectedColor('');
    setSelectedSize('');
  };

  const hasActiveFilters = selectedStyle || selectedColor || selectedSize;

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf5f3]">
      <main className="flex-1 flex gap-6 w-full overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Banner chính */}
          <div className="flex justify-center mb-10 mx-auto sm-w-[300]">
            <div className="pt-5">
              <TemplateCard {...mainCard} featured />
            </div>
          </div>

          {/* Filter + Search - Desktop */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center p-4 shadow-sm border-t border-b w-full bg-[#fdf5f3]">
            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center md:justify-start bg-[#fdf5f3]">
              <select
                className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                value={selectedStyle}
                onChange={e => setSelectedStyle(e.target.value)}
              >
                <option value="">Phong cách</option>
                <option>Hiện đại</option>
                <option>Cổ điển</option>
                <option>Tối giản</option>
              </select>
              <select
                className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
              >
                <option value="">Màu sắc</option>
                <option>Đỏ</option>
                <option>Xanh</option>
                <option>Vàng</option>
              </select>
              <select
                className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
              >
                <option value="">Kích thước</option>
                <option>Nhỏ</option>
                <option>Trung bình</option>
                <option>Lớn</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-[#E53E3E] hover:bg-[#FCE7E7] rounded-xl transition-colors"
                >
                  <X size={16} />
                  Xóa bộ lọc
                </button>
              )}
            </div>
            <div className="w-100 md:w-[400px] lg:w-[500px]">
              <SearchBar />
            </div>
          </div>

          {/* Filter + Search - Mobile */}
          <div className="md:hidden border-t border-b shadow-sm bg-[#fdf5f3]">
            {/* Top bar with sidebar toggle, filter button and search */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                {/* Sidebar Toggle Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="flex items-center justify-center w-10 h-10 border rounded-xl bg-white hover:bg-[#FCE7E7] transition-colors"
                >
                  <Menu size={18} />
                </button>

                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-3 py-2 border rounded-xl bg-white hover:bg-[#FCE7E7] transition-colors"
                >
                  <Filter size={18} />
                  <span className="text-sm">Bộ lọc</span>
                  {hasActiveFilters && <div className="w-2 h-2 bg-[#E53E3E] rounded-full"></div>}
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div className="flex-1 max-w-xs ml-3">
                <SearchBar />
              </div>
            </div>

            {/* Collapsible filter panel */}
            {isFilterOpen && (
              <div className="border-t bg-white p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                    value={selectedStyle}
                    onChange={e => setSelectedStyle(e.target.value)}
                  >
                    <option value="">Phong cách</option>
                    <option>Hiện đại</option>
                    <option>Cổ điển</option>
                    <option>Tối giản</option>
                  </select>

                  <select
                    className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                  >
                    <option value="">Màu sắc</option>
                    <option>Đỏ</option>
                    <option>Xanh</option>
                    <option>Vàng</option>
                  </select>

                  <select
                    className="border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#E53E3E]"
                    value={selectedSize}
                    onChange={e => setSelectedSize(e.target.value)}
                  >
                    <option value="">Kích thước</option>
                    <option>Nhỏ</option>
                    <option>Trung bình</option>
                    <option>Lớn</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <div className="flex justify-center">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#E53E3E] hover:bg-[#FCE7E7] rounded-xl transition-colors"
                    >
                      <X size={16} />
                      Xóa tất cả bộ lọc
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Active filters display (mobile) */}
            {hasActiveFilters && !isFilterOpen && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {selectedStyle && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FCE7E7] text-[#E53E3E] text-xs rounded-full">
                      {selectedStyle}
                      <button onClick={() => setSelectedStyle('')}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedColor && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FCE7E7] text-[#E53E3E] text-xs rounded-full">
                      {selectedColor}
                      <button onClick={() => setSelectedColor('')}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedSize && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FCE7E7] text-[#E53E3E] text-xs rounded-full">
                      {selectedSize}
                      <button onClick={() => setSelectedSize('')}>
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Danh sách templates */}
          <div className="flex w-full gap-2 flex-1 mt-5 relative">
            {/* Overlay - che toàn bộ nội dung khi sidebar mở */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden transition-all duration-500 ease-out"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar - Desktop: luôn hiện, Mobile: overlay khi mở */}
            <div
              className={`
              ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
              md:translate-x-0 md:opacity-100
              fixed md:static 
              top-0 left-0 
              h-full md:h-auto 
              w-80 md:w-auto 
              bg-gradient-to-br from-white/95 via-[#fdf5f3]/95 to-[#fcf1ee]/95 md:bg-transparent 
              backdrop-blur-lg md:backdrop-blur-none
              z-50 md:z-auto 
              transform transition-all duration-500 ease-out
              shadow-2xl md:shadow-none
              border-r border-gray-200/50 md:border-none
              md:block
            `}
            >
              <div className="h-full md:h-auto pt-4 md:pt-0 px-6 md:px-0">
                <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 hover:bg-[#FCE7E7]/80 rounded-full transition-all duration-200 hover:scale-110 ml-auto"
                  >
                    <X size={20} className="text-[#E53E3E]" />
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>

            <div
              className={`flex-1 overflow-y-auto pr-2 px-4 md:px-0 transition-all duration-300 ${
                isSidebarOpen ? 'md:blur-0 blur-sm opacity-30 md:opacity-100' : 'blur-0 opacity-100'
              }`}
              style={{
                maxHeight: 'calc(100vh - 120px)',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                {cards.map((template, index) => (
                  <div key={index}>
                    <TemplateCard {...template} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
