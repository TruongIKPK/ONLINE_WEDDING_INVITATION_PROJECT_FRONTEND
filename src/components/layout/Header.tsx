import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-8 gap-8">
      {/* Left: Text content */}
      <div className="w-full md:w-1/2 text-center md:text-left font-inter text-[#333]">
        <Image
          src="/images/header/WEDDING DOODLE-07.png"
          alt="doodle"
          width={150}
          height={100}
          className="mx-auto md:ml-0 mb-2 ms-lg-5"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Viaoda+Libre&display=swap"
          rel="stylesheet"
        />
        <h1 className="!text-[62px] font-normal text-[#b42e2f] font-['Viaoda_Libre'] mb-4 ">
          Thiệp cưới Online
        </h1>

        <p className="text-justify leading-relaxed mb-2 text-xl">
          Tạo thiệp cưới điện tử độc đáo, sang trọng chỉ trong vài phút. Lựa chọn mẫu yêu thích,
          chỉnh sửa theo ý bạn và chia sẻ dễ dàng qua mạng xã hội hoặc QR code.
        </p>
        <p className="text-justify leading-relaxed mb-4 text-xl">
          Dù bạn là cô dâu chú rể, hay người tổ chức sự kiện, đây là công cụ lý tưởng để bắt đầu
          hành trình hạnh phúc.
        </p>

        <div className="text-center md:text-left">
          <Link href="/tao-thiep">
            <button
              type="button"
              className="btn btn-light !text-[#b42e2f] border-2 !border-[#b42e2f] !font-semibold italic rounded-xl px-6 py-2 transition !hover:bg-[#b42e2f] !hover:text-white w-75 !text-xl"
            >
              Tạo thiệp ngay
            </button>
          </Link>
        </div>
      </div>

      {/* Right: Image cô dâu chú rể */}
      <div className="w-full md:w-1/2 flex justify-center mt-lg-5">
        <Image
          src="/images/header/codau&chure.png"
          alt="Cô dâu chú rể"
          width={500}
          height={300}
          className="object-contain"
        />
      </div>
    </header>
  );
}
