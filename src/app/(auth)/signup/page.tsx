"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Key } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

type SignUpFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    await new Promise((r) => setTimeout(r, 1000)); // fake loading
    console.log("Sign Up:", data);
  };

  return (
    <div className="relative flex flex-col items-start justify-center min-h-screen bg-[var(--color-bg-main)] px-4">
      {/* Doodles */}
      <img
        src="/images/Doodles/WEDDING DOODLE-07.png"
        alt="doodle7"
        className="absolute top-0 left-7 w-[172px] max-w-[40vw] h-auto rotate-[0.93deg] z-0 pointer-events-none select-none"
        style={{ transformOrigin: 'top left' }}
      />
      <img
        src="/images/Doodles/5858794_3037242-02.png"
        alt="doodle-birthday"
        className="absolute top-[71px] left-1/2 -translate-x-1/2 w-[273px] max-w-[60vw] h-auto z-0 pointer-events-none select-none"
      />
      <img
        src="/images/Doodles/5939865_3023097-02.png"
        alt="doodle-wedding"
        className="absolute bottom-[102px] right-[193px] w-[600px] sm:w-[450px] max-w-[70vw] h-auto z-0 pointer-events-none select-none"
      />
      <img
        src="/images/Doodles/THIỆP CƯỚI ONLINE LOGO-03.png"
        alt="wedding-logo"
        className="absolute bottom-[420px] right-[375px] w-[161px] sm:w-[140px] max-w-[60vw] h-auto z-0 pointer-events-none select-none"
      />
      <img
        src="/images/Doodles/WEDDING DOODLE-09.png"
        alt="doodle9"
        className="absolute bottom-[433px] right-0 w-[150px] sm:w-[270px] max-w-[60vw] h-auto z-0 pointer-events-none select-none"
      />

      <div className="flex flex-col items-center px-[34px]">
        <div className="text-center mb-8 mt-[10vh]">
          <h1 className="text-[46px] font-bold text-neutral-800">Tạo Tài Khoản Mới</h1>
          <p className="text-[16px] font-bold mt-2.5" style={{ color: 'var(--color-gray)' }}>
            Tạo tài khoản Thiepcuoinline.vn để thiết kế thiệp cưới độc đáo riêng bạn!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md border-[3px] border-[var(--color-gray)] shadow-none rounded-xl px-[49px] pt-[31px] pb-[20px]"
          style={{ boxShadow: "5px 5px 0 rgba(217, 213, 211, 0.4)" }}
        >
          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-1 pl-[5px]">
              <label className="block font-medium text-sm mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                Email
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm ml-2 whitespace-nowrap">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              type="email"
              placeholder="Email của bạn"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email không hợp lệ",
                },
              })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1 pl-[5px] pt-[15px]">
              <label className="block font-medium text-sm mb-1 flex items-center gap-1">
                <Key className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                Mật khẩu
              </label>
              {errors.email && (
                <span className="text-red-500 text-sm ml-2 whitespace-nowrap">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: { value: 6, message: "Tối thiểu 8 ký tự" },
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center justify-between mb-1 pl-[5px] pt-[15px]">
              <label className="block font-medium text-sm mb-1 flex items-center gap-1">
                <Key className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                Xác nhận mật khẩu
              </label>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm ml-2 whitespace-nowrap">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                {...register("confirmPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (value) =>
                    value === watch("password") || "Mật khẩu không trùng",
                })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="primary"
            size="large"
            disabled={isSubmitting}
            className="w-full h-[59px] flex items-center justify-center font-bold mt-[21px]"
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng Ký"}
          </Button>

          {/* Social login */}
          <div className="flex gap-[27px] mt-[15px]">
            <Button type="secondary" className="flex-1 h-[42px] font-bold bg-[#EA4335]" style={{ color: "#fff" }}>Google</Button>
            <Button type="secondary" className="flex-1 h-[42px] font-bold bg-[#0866FF]" style={{ color: "#fff" }}>Facebook</Button>
          </div>

          {/* Links */}
          <div className="text-center text-[16px] mt-[17px]">
            <span className="mx-[11px] text-[var(--color-gray)] font-bold">Bạn đã có tài khoản?</span>
            <Link href="/login" className="text-[#5329DA] underline">
              Đăng Nhập
            </Link>
          </div>
        </form>
      </div >
    </div >
  );
}
