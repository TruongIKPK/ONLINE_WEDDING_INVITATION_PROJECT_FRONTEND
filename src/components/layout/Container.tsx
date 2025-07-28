'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { User } from 'lucide-react';

const templates = [
  {
    src: '/images/mauduocuachuong/Nhật An - Thanh Trúc.png',
    name: 'Nhật An - Thanh Trúc',
    slug: 'nhat-an-thanh-truc',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/Son Jeney - Emma Charlotte.png',
    name: 'Son Jeney - Emma Charlotte',
    slug: 'son-jeney-emma-charlotte',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/An Ngọc - Phú Quý.png',
    name: 'An Ngọc - Phú Quý',
    slug: 'an-ngoc-phu-quy',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/An Ngọc - Phú Quý.png',
    name: 'An Ngọc - Phú Quý',
    slug: 'an-ngoc-phu-quy',
    views: 10000,
  },
  {
    src: '/images/mauduocuachuong/An Ngọc - Phú Quý.png',
    name: 'An Ngọc - Phú Quý',
    slug: 'an-ngoc-phu-quy',
    views: 10000,
  },
];

export default function Container() {
  return (
    <div className="container mx-auto px-4">
      <header>
        <div className="wedding-header">
          <Image
            src="/images/header/WEDDING DOODLE-07.png"
            alt="doodle"
            width={100}
            height={100}
            className="doodle07"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Viaoda+Libre&display=swap"
            rel="stylesheet"
          />
          <h1>Thiệp cưới Online</h1>
          <p>
            Tạo thiệp cưới điện tử độc đáo, sang trọng chỉ trong vài phút. Lựa chọn mẫu yêu thích,
            chỉnh sửa theo ý bạn và chia sẻ dễ dàng qua mạng xã hội hoặc QR code.
          </p>
          <p>
            Dù bạn là cô dâu chú rể, hay người tổ chức sự kiện, đây là công cụ lý tưởng để bắt đầu
            hành trình hạnh phúc.
          </p>
          <div className="create-card-btn">
            <Link href="/tao-thiep">
              <button type="button" className="btn btn-light">
                Tạo thiệp ngay
              </button>
            </Link>
          </div>
        </div>
        <div className="img-daure">
          <Image
            src="/images/header/codau&chure.png"
            alt="Cô dâu chú rể"
            width={300}
            height={300}
            className="daure"
          />
          <Image
            src="/images/header/WEDDING DOODLE-09.png"
            alt="doodle9"
            width={100}
            height={100}
            className="doodle09"
          />
        </div>
      </header>
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
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {templates.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card h-100 shadow-sm">
                <Link
                  href={`/templates/${item.slug}`}
                  className="text-decoration-none text-dark"
                  style={{ textDecoration: 'none' }}
                >
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={400}
                    height={250}
                    className="card-img-top object-fit-cover"
                  />
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
          src="/images/huongdancacbuoc/WEDDING DOODLE-08.png"
          alt="doodle"
          width={150}
          height={50}
          className="doodle08"
        />
        <div className="chonmauthiep">
          <Image
            src="/images/huongdancacbuoc/Vector 11.png"
            alt=""
            width={150}
            height={50}
            className="vector11-1"
          />
          <p className="stt font-black">1</p>
          <p className="f1 font-medium">Chọn mẫu thiệp</p>
        </div>
        <div className="chinhsuanoidung">
          <Image
            src="/images/huongdancacbuoc/Vector 13.png"
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
            src="/images/huongdancacbuoc/Vector 11.png"
            alt=""
            width={150}
            height={50}
            className="vector11"
          />
          <div className="lyruou">
            <Image
              src="/images/huongdancacbuoc/5939865_3023097-05.png"
              alt="lyruou"
              width={900}
              height={50}
              className="lyruou"
            />
          </div>
          <div className="thanhtoan">
            <p className="stt font-black">3</p>
            <p className="f1 font-medium">Thanh toán</p>
          </div>
        </div>
        <div className="luu-chiase">
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
        <h4>Blog</h4>
        <Link href="/blog">Xem thêm</Link>
        <div className="row">
          {[
            {
              title: '5 Lý Do Bạn Nên Chọn Thiệp Cưới Online Thay Vì In Giấy',
              excerpt:
                'Thiệp cưới online không chỉ tiết kiệm chi phí, mà còn thân thiện với môi trường...',
              image: '/images/blog/Rectangle 9011.png',
              slug: 'ly-do-chon-thiep-cuoi-online',
            },
            {
              title: 'Cách Gửi Thiệp Cưới Online Qua Zalo, Messenger và Email',
              excerpt:
                'Gửi thiệp cưới chưa bao giờ đơn giản đến thế! Hướng dẫn bạn cách chia sẻ qua các nền tảng...',
              image: '/images/blog/Rectangle 9011 (2).png',
              slug: 'gui-thiep-cuoi-online',
            },
            {
              title: 'Hướng Dẫn Tạo Thiệp Cưới Online Trong 5 Phút',
              excerpt:
                'Không cần biết thiết kế, bạn vẫn có thể tạo ra một tấm thiệp cưới đẹp mắt chỉ với vài bước đơn giản....',
              image: '/images/blog/Rectangle 9011 (5).png',
              slug: 'huong-dan-tao-thiep-cuoi-online',
            },
            {
              title: 'Cá Nhân Hóa Thiệp Cưới Online – Làm Sao Cho Khác Biệt?',
              excerpt:
                'Bạn muốn thiệp cưới mang dấu ấn riêng? Hãy khám phá cách thêm hình ảnh, video, nhạc nền và thông tin cá nhân để tạo nên ...',
              image: '/images/blog/Rectangle 9011 (3).png',
              slug: 'ca-nhan-hoa-thiep-cuoi-online',
            },
            {
              title: 'Top 10 Mẫu Thiệp Cưới Online Được Yêu Thích Nhất 2025',
              excerpt:
                'Bạn chưa biết chọn mẫu nào? Dưới đây là 10 mẫu thiệp cưới online hiện đại, sang trọng, được nhiều cặp đôi lựa chọn nhờ thiết kế đẹp....',
              image: '/images/blog/Rectangle 9011 (1).png',
              slug: 'top-10-mau-thiep-cuoi-online',
            },
            {
              title: 'So Sánh Chi Phí: Thiệp Cưới In Truyền Thống vs Thiệp Cưới Online',
              excerpt:
                'Thiệp in đẹp nhưng tốn kém? Cùng phân tích chi phí thật sự của cả hai hình thức để bạn dễ dàng quyết định phương án vừa đẹp....',
              image: '/images/blog/Rectangle 9011 (4).png',
              slug: 'phan-tich-chi-phi-thiep-cuoi-online',
            },
          ].map((post, idx) => (
            <div className="col-6" key={idx}>
              <Link href={`/blog/${post.slug}`} className="blog-item ">
                <div className="blog-img ">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={160}
                    height={120}
                    className="img-thumbnail"
                  />
                </div>
                <div className="blog-text">
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
