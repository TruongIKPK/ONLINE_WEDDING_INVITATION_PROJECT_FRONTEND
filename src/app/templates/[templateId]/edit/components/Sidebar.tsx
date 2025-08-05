import React from 'react';
import { FaUndo, FaRedo, FaImage, FaFont, FaTrashAlt, FaUsers, FaDownload } from 'react-icons/fa';

interface SidebarProps {
  onAddImage: () => void;
  onAddText: () => void;
  selectedTool?: 'image' | 'text' | null;
}

const EditorSidebar: React.FC<SidebarProps> = ({ onAddImage, onAddText, selectedTool }) => {
  return (
    <div className="flex flex-col space-y-8 p-6 bg-[#fef8f6] h-full text-sm font-sans w-[260px] overflow-x-hidden overflow-y-hidden">
      {/* ACTIONS */}
      <div>
        <h3 className="text-gray-500 font-semibold mb-4 uppercase text-sm tracking-wider">
          ACTIONS
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <FaUndo className="text-gray-500 text-2xl" />
            <span className="text-xs mt-2 font-medium text-gray-500">Undo</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
            <FaRedo className="text-gray-500 text-2xl" />
            <span className="text-xs mt-2 font-medium text-gray-500">Redo</span>
          </button>
          <button
            onClick={onAddImage}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition ${
              selectedTool === 'image'
                ? 'bg-red-100 border-red-500 text-red-700'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaImage className="text-2xl text-gray-500" />
            <span className="text-xs mt-2 text-gray-500 font-medium">Image</span>
          </button>
          <button
            onClick={onAddText}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border text-center transition ${
              selectedTool === 'text'
                ? 'bg-red-100 border-red-500 text-red-700'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaFont className="text-2xl text-gray-500" />
            <span className="text-xs mt-2 font-medium text-gray-500">Text</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition col-span-2">
            <FaTrashAlt className="text-gray-500 text-2xl" />
            <span className="text-xs mt-2 font-medium text-gray-500">Clear</span>
          </button>
        </div>
      </div>

      {/* QUẢN LÝ */}
      <div>
        <h3 className="text-gray-500 font-semibold mb-4 uppercase text-sm tracking-wider">
          QUẢN LÝ
        </h3>
        <div className="flex flex-col space-y-3">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition col-span-2">
            <FaUsers className="mr-3 text-xl text-gray-600" />
            <span className="text-sm font-medium mt-2 text-gray-500">QL khách mời</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition col-span-2">
            <FaDownload className="mr-3 text-xl text-gray-600" />
            <span className="text-sm font-medium mt-2 text-gray-500">Tải xuống</span>
          </button>
        </div>
      </div>

      {/* ẢNH ĐÃ TẢI */}
      <div>
        <h3 className="text-gray-500 font-semibold mb-4 uppercase text-sm tracking-wider">
          ẢNH ĐÃ TẢI
        </h3>
        <div className="bg-white border-r-6 border-gray-300 rounded-r-lg h-32 flex items-center justify-center shadow-inner text-gray-400 text-sm h-100">
          ảnh
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;
