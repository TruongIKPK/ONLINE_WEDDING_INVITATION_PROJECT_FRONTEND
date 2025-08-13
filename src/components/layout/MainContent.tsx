'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { User } from 'lucide-react';
const templates = [
  {
    src: '/images/mauduocuachuong/NhatAn_ThanhTruc.png',
    name: 'Nhật An - Thanh Trúc',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/SonJeney_EmmaCharlotte.png',
    name: 'Son Jeney - Emma Charlotte',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/AnNgoc_PhuQuy.png',
    name: 'An Ngọc - Phú Quý',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/AnNgoc_PhuQuy.png',
    name: 'An Ngọc - Phú Quý',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/AnNgoc_PhuQuy.png',
    name: 'An Ngọc - Phú Quý',
    views: 10000,
  },
];

export default function MainContent() {
  return (
    <div>
      <div className="featured-templates my-5 relative">
        <h2 className="text-center fw-bold mb-4">Mẫu được ưa chuộng</h2>
        <div className="swiper-button-prev-custom navigationPrev"></div>
        <div className="swiper-button-next-custom navigationNext"></div>
        <Swiper
          className="w-full"
          modules={[Navigation]}
          spaceBetween={50}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            320: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {templates.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card h-100 shadow-sm flex flex-col h-full">
                <Link
                  href="#"
                  onClick={e => e.preventDefault()}
                  className="text-decoration-none text-dark"
                >
                  <Image src={item.src} alt={item.name} width={400} height={250} className="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="d-flex align-items-center gap-2">
                      <User size={18} />
                      <p className="mb-0">{item.views}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="huongdancacbuoc">
        <Image
          src="/images/huongdancacbuoc/WEDDINGDOODLE_08.png"
          alt="doodle"
          width={150}
          height={50}
          className="doodle08 "
        />
        <div className="chonmauthiep grid grid-cols-1">
          <Image
            src="/images/huongdancacbuoc/Vector_11.png"
            alt=""
            width={150}
            height={50}
            className="vector11-1"
          />
          <p className="stt font-black">1</p>
          <p className="f1 font-medium">Chọn mẫu thiệp</p>
        </div>
        <div className="chinhsuanoidung flex flex-row">
          <Image
            src="/images/huongdancacbuoc/Vector_13.png"
            alt=""
            width={100}
            height={50}
            className="vector13"
          />
          <p className="stt font-black">2</p>
          <p className="f1 font-medium">Chỉnh sửa nội dung</p>
        </div>
        <div className="thanhtoan">
          <Image
            src="/images/huongdancacbuoc/Vector_11.png"
            alt=""
            width={150}
            height={50}
            className="vector11"
          />
          <div className="lyruou">
            <Image
              src="/images/huongdancacbuoc/lyruou.png"
              alt="lyruou"
              width={900}
              height={100}
              className="lyruou"
            />
          </div>
          <div className="thanhtoan1 flex flex-row">
            <p className="stt font-black">3</p>
            <p className="f1 font-medium">Thanh toán</p>
          </div>
        </div>
        <div className="luu-chiase flex flex-row">
          <p className="stt font-black">4</p>
          <p className="f1 font-medium">Lưu & Chia sẻ</p>
        </div>
      </div>
      <div className="cauhoi">
        <h4>Q&A</h4>
        {[
          'Tôi có thể tạo thiệp cưới miễn phí không?',
          'Tôi có thể chỉnh sửa thiệp sau khi đã tạo không?',
          'Thiệp có thể gửi qua Zalo, Facebook hay email không?',
          'Tôi có thể thêm nhạc nền vào thiệp được không?',
          'Làm sao để xem trước thiệp sau khi thiết kế?',
        ].map((text, i) => (
          <div className="c1" key={i}>
            <p className="stt">{i + 1}</p>
            <p className="f1">{text}</p>
          </div>
        ))}
      </div>
      <div className="blog mb-5">
        <h4 className="text-[28px] md:text-[46px] font-bold font-['Inter']  md:text-left">Blog</h4>
        <Link href="#">Xem thêm</Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: '5 Lý Do Bạn Nên Chọn Thiệp Cưới Online Thay Vì In Giấy',
              excerpt:
                'Thiệp cưới online không chỉ tiết kiệm chi phí, mà còn thân thiện với môi trường...',
              image: '/images/blog/Rectangle_9011.png',
              slug: 'ly-do-chon-thiep-cuoi-online',
            },
            {
              title: 'Cách Gửi Thiệp Cưới Online Qua Zalo, Messenger và Email',
              excerpt:
                'Gửi thiệp cưới chưa bao giờ đơn giản đến thế! Hướng dẫn bạn cách chia sẻ qua các nền tảng...',
              image: '/images/blog/Rectangle9011_2.png',
              slug: 'gui-thiep-cuoi-online',
            },
            {
              title: 'Hướng Dẫn Tạo Thiệp Cưới Online Trong 5 Phút',
              excerpt:
                'Không cần biết thiết kế, bạn vẫn có thể tạo ra một tấm thiệp cưới đẹp mắt chỉ với vài bước đơn giản....',
              image: '/images/blog/Rectangle9011_5.png',
              slug: 'huong-dan-tao-thiep-cuoi-online',
            },
            {
              title: 'Cá Nhân Hóa Thiệp Cưới Online – Làm Sao Cho Khác Biệt?',
              excerpt:
                'Bạn muốn thiệp cưới mang dấu ấn riêng? Hãy khám phá cách thêm hình ảnh, video, nhạc nền và thông tin cá nhân để tạo nên ...',
              image: '/images/blog/Rectangle9011_3.png',
              slug: 'ca-nhan-hoa-thiep-cuoi-online',
            },
            {
              title: 'Top 10 Mẫu Thiệp Cưới Online Được Yêu Thích Nhất 2025',
              excerpt:
                'Bạn chưa biết chọn mẫu nào? Dưới đây là 10 mẫu thiệp cưới online hiện đại, sang trọng, được nhiều cặp đôi lựa chọn nhờ thiết kế đẹp....',
              image: '/images/blog/Rectangle9011_1.png',
              slug: 'top-10-mau-thiep-cuoi-online',
            },
            {
              title: 'So Sánh Chi Phí: Thiệp Cưới In Truyền Thống vs Thiệp Cưới Online',
              excerpt:
                'Thiệp in đẹp nhưng tốn kém? Cùng phân tích chi phí thật sự của cả hai hình thức để bạn dễ dàng quyết định phương án vừa đẹp....',
              image: '/images/blog/Rectangle9011_4.png',
              slug: 'phan-tich-chi-phi-thiep-cuoi-online',
            },
          ].map((post, idx) => (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6" key={idx}>
              <Link href={`/blog/${post.slug}`} className="blog-item ">
                <div className="blog-img w-full sm:w-[160px] shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={160}
                    height={120}
                    className="img-thumbnail "
                  />
                </div>
                <div className="blog-text flex flex-col justify-between">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
