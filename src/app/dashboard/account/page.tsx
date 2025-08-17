'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { FaRegUser, FaRegEnvelope, FaPhone } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa6';
import { FaRegFolderOpen } from 'react-icons/fa';

import Header from '../Header';
import Sidebar from '../leftNavber';

// Dữ liệu mẫu cho các đơn mua
const purchaseOrders: any[] = [];

export default function AccountPage() {
  const { register, handleSubmit } = useForm();

  const handlePersonalUpdate = (data: any) => {
    console.log('Personal Info Updated:', data);
  };

  const handlePasswordChange = (data: any) => {
    console.log('Password Changed:', data);
  };

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
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Thiết lập tài khoản</h1>

          {/* Personal Information Form */}
          <div className="mb-8 border-0 rounded-5 m-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Thông tin cá nhân</h2>
            <form
              onSubmit={handleSubmit(handlePersonalUpdate)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <FaRegUser className="mr-2 text-red-500" />
                  Họ tên
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Họ tên của bạn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <FaRegEnvelope className="mr-2 text-red-500" />
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Địa chỉ Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 flex items-center">
                  <FaPhone className="mr-2 text-red-500" />
                  Số Điện Thoại
                </label>
                <input
                  type="tel"
                  {...register('phoneNumber')}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Số điện thoại của bạn"
                />
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="mb-8 border-t pt-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Thay đổi mật khẩu</h2>
            <form
              onSubmit={handleSubmit(handlePasswordChange)}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {['oldPassword', 'newPassword', 'confirmNewPassword'].map((field, idx) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-500 flex items-center">
                    <FaKey className="mr-2 text-red-500" />
                    {idx === 0
                      ? 'Mật khẩu cũ'
                      : idx === 1
                        ? 'Mật khẩu mới'
                        : 'Xác nhận mật khẩu mới'}
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="password"
                      {...register(field)}
                      className="block w-full border border-gray-300 rounded-md p-2 pr-10"
                      placeholder={idx === 0 ? '********' : 'Nhập mật khẩu'}
                    />
                    <FaRegEyeSlash className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                  </div>
                </div>
              ))}
              <div className="flex items-end justify-end md:col-start-3">
                <button
                  type="submit"
                  className="w-25 border border-red-500 border-3 text-red-500 p-2 rounded-full font-bold hover:bg-red-50 hover:text-red-600 transition-colors shadow-lg"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>

          {/* Purchase Orders Table */}
          <div className="border-t pt-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Đơn mua</h2>
            <div className="overflow-x-auto ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FFF7F4]">
                  <tr>
                    {['Mã đơn hàng', 'Ngày tạo', 'Tổng tiền', 'Trạng thái', 'Hành động'].map(th => (
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
                <tbody className="bg-bg-[#FFF7F4] divide-y divide-gray-200">
                  {purchaseOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                        <div className="flex flex-col items-center justify-center py-12">
                          <FaRegFolderOpen size={48} className="text-gray-400 mb-2" />
                          <span className="text-gray-400 text-sm">Trống</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
