"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

type ForgotPasswordInputs = {
  email: string;
};

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>();

  const onSubmit = async (data: ForgotPasswordInputs) => {
    await new Promise((r) => setTimeout(r, 1000)); // fake loading
    console.log("ForgotPassword:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="relative flex flex-col items-start justify-center min-h-screen bg-[var(--color-bg-main)] px-4">
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

      <div className="flex flex-col items-center px-[100px]">
        <div className="text-center mb-8 mt-[10vh]">
          <h1 className={`text-[46px] ${isSubmitted ? "font-extrabold" : "font-bold"
            } text-neutral-800 max-w-[400px] mx-auto`}>Yêu cầu đặt lại mật khẩu </h1>
          <p className="text-[16px] font-bold mt-2.5" style={{ color: 'var(--color-gray)' }}>
            Vui lòng nhập Email tài khoản bạn muốn cài đặt lại mật khẩu.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md border-[3px] border-[var(--color-gray)] shadow-none rounded-xl px-[49px] pt-[31px] pb-[51px]"
          style={{ boxShadow: "5px 5px 0 rgba(217, 213, 211, 0.4)" }}
        >
          {/* Email */}
          <div>
            <label className="block font-medium text-sm mb-1 flex items-center gap-1 pl-[5px]">
              <Mail className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
              Email
            </label>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Submit */}
          <Button
            type="primary"
            size="large"
            disabled={isSubmitting}
            className="w-full h-[59px] flex items-center justify-center font-bold mt-[31px]"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>

          <div className="text-center text-[16px] mt-[17px]">
            <span className="mx-[11px] text-[var(--color-gray)] font-bold">Quay lại trang</span>
            <Link href="/login" className="text-[#5329DA] underline">
              Đăng Nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
