'use client';

import React, { useState } from 'react';
import Header from '@/app/dashboard/Header';
import HeaderTemplate from '@/app/templates/[templateId]/edit/components/HeaderTemplate';
import EditorSidebar from '@/app/templates/[templateId]/edit/components/Sidebar';
import PreviewSidebar from '@/app/templates/[templateId]/edit/components/PreviewSidebar';

export default function EditorPage() {
  const [elements, setElements] = useState([]);

  const handleAddText = () => {
    const newText = {
      id: Date.now(),
      type: 'text',
      content: 'Tên & Linh',
      x: 300,
      y: 300,
      style: {
        fontSize: '48px',
        color: '#ffffff',
      },
    };
    setElements([...elements, newText]);
  };

  const handleAddImage = () => {
    console.log('Adding image element');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f5]">
      {/* Header */}
      <Header />
      <HeaderTemplate />

      {/* Main editor area */}
      <div className="flex flex-1 bg-[#fef8f6]">
        {/* Left Sidebar */}
        <div className="bg-[#fef8f6] h-full p-4 box-border w-full max-w-[300px] border-r shadow">
          <EditorSidebar onAddText={handleAddText} onAddImage={handleAddImage} />
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex justify-center px-8 py-8 relative">
          <div className="relative w-[800px] bg-white shadow-lg overflow-visible">
            {/* Ảnh nền */}
            <img
              src="/your-image.jpg" // Thay bằng ảnh thực tế
              alt="Template Background"
              className="w-full h-auto object-cover"
            />

            {/* Render elements */}
            {elements.map(el => (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  ...el.style,
                }}
              >
                {el.type === 'text' && <p>{el.content}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar (Preview) */}
        <div className="w-[300px] border-l shadow p-4 overflow-y-auto">
          <PreviewSidebar />
        </div>
      </div>
    </div>
  );
}
