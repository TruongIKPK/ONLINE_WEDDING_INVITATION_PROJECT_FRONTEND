'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { FaRegFolderOpen } from 'react-icons/fa';

import Header from '../../Header';
import Sidebar from '../../leftNavber';

// Dữ liệu mẫu cho các đơn mua
const purchaseOrders: any[] = [];

export default function AccountPage() {
  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <div className="shadow-md shadow-gray-300 z-10">
        <Header />
      </div>

      {/* Container chia Sidebar + Nội dung */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-[20%] min-w-[240px] bg-[#FFF5F1] border-r border-gray-300 shadow-sm">
          <Sidebar />
        </div>

        {/* Nội dung tài khoản */}
        <main className="flex-1 bg-[#FFF7F4] p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Thống kê</h1>
          <div className="bg-[#FFF7F4] rounded-lg shadow-md p-6 border rounded-lg">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Tổng quan</h2>
              <div className="flex justify-between items-center bg-[#FFF7F4] p-4 rounded-lg border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ngày diễn ra</p>
                  <p className="text-xl text-gray-800">04/07/2025 02:44</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Đếm ngược đến ngày diễn ra</p>
                  <p className="text-xl text-gray-800">0 Ngày 0 giờ 0 phút 0 giây</p>
                </div>
              </div>
            </div>

            {/* Guests Attending Section */}
            <div className="mb-8 border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">Khách tham dự</h2>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-[#FFF7F4] rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Lượt xem</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
                <div className="p-4 bg-[#FFF7F4] rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Đến</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
                <div className="p-4 bg-[#FFF7F4] rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Có thể đến</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
                <div className="p-4 bg-[#FFF7F4] rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-500">Không đến</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>
            </div>

            {/* Interacting Guests Table */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Khách đã tương tác với thiệp (undefined)
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="">
                    <tr>
                      {[
                        'Tên',
                        'Số điện thoại',
                        'Email',
                        'Số khách',
                        'Tham dự?',
                        'Lời chúc',
                        'Hiện lời chúc lên thiệp?',
                        'Nhắc trước ngày',
                        'Hành động',
                      ].map(th => (
                        <th
                          key={th}
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#FFF7F4] divide-y divide-gray-200">
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-sm text-gray-500 text-center">
                        <div className="flex flex-col items-center justify-center py-12">
                          <FaRegFolderOpen size={48} className="text-gray-400 mb-2" />
                          <span className="text-gray-400 text-sm">Trống</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
