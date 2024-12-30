import { BadgeDollarSign, Gauge, Waypoints } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Testimonials.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function Testimonials() {
  const blogReviews = [
    {
      author: "Sarah Johnson",
      rating: 4.5,
      comment:
        "Great content and user-friendly interface. I found the articles very informative!",
      date: "2024-04-25",
      img: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      author: "Michael Smith",
      rating: 3.0,
      comment:
        "Decent blog, but could use more variety in topics. Navigation could be improved.",
      date: "2024-04-26",
      img: "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      author: "Emily Chen",
      rating: 5.0,
      comment:
        "Love this blog! The writing style is engaging, and the topics are always interesting.",
      date: "2024-04-27",
      img: "https://plus.unsplash.com/premium_photo-1693000696650-e73643956033?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      author: "David Lee",
      rating: 2.5,
      comment:
        "Not impressed. Articles are too basic and the site feels outdated.",
      date: "2024-04-27",
      img: "https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className=" mx-auto container">
      {/* swiper */}
      <div className="mt-20 review-section bg-accent p-9  py-10">
        <div className="text-center">
          <h1 className=" text-[26px] font-extralight">Happy users</h1>
          <div className="w-[20%] mt-2 h-[1px] bg-[#999] mx-auto md:mx-auto mb-2"></div>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={15}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            //   delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {blogReviews.map((blog, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <Image
                  src={blog?.img}
                  height={500}
                  width={500}
                  sizes="100vw"
                  alt="user img"
                  priority
                  className="w-20 h-20 rounded-full mx-auto relative -bottom-8  border-white border-[7px] object-cover"
                />
                <div
                  style={{}}
                  className="bg-[#33333338] h-60 flex items-center flex-col justify-center border-[#37373734] border px-6 py-10"
                >
                  <div className="flex gap-2 items-cent ">
                    <div className="leading-4">
                      <h3 className="text-2xl font-semibold text-[#333]">
                        {blog.author}
                      </h3>
                      <h4 className="text-[#888] text-xs text-center">
                        {blog.date}
                      </h4>
                    </div>
                  </div>
                  <div className="mt-3 text-lg text-center font-thin">
                    <p> {blog.comment}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* why choose us */}
      <div className="mx-auto  md:grid grid-cols-4 gap-10 text-center space-y-4 md:space-y-0 md:text-justify py-6 my-14">
        <div>
          <h2 className="">WHY CHOOSE US</h2>
          <div className="w-[25%] mt-2 h-[1px] bg-[#999] mx-auto md:mx-0 mb-10"></div>
        </div>

        <div className="flex flex-row text-start">
          <div className="mr-3">
            <div className="header_top__icon_wrapper rounded-full  p-2 text-2xl">
              <Gauge />
            </div>
          </div>
          <div>
            <h2 className={` text-2xl mb-1`}>Fast access</h2>
            <p className="text-[#666] font-light text-justify leading-[1.5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, quaerat? Nostrum ptatum praesentium aperiam recusandae.
            </p>
          </div>
        </div>
        <div className="flex flex-row text-start">
          <div className="mr-3">
            <div className="header_top__icon_wrapper rounded-full  p-2 text-2xl">
              <BadgeDollarSign />
            </div>
          </div>
          <div>
            <h2 className={` text-2xl mb-1`}>Free</h2>
            <p className="text-[#666] font-light text-justify leading-[1.5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, quaerat?
            </p>
          </div>
        </div>
        <div className="flex flex-row text-start">
          <div className="mr-3">
            <div className="header_top__icon_wrapper rounded-full  p-2 text-2xl">
              <Waypoints />
            </div>
          </div>
          <div>
            <h2 className={` text-2xl mb-1`}>Easy to understand</h2>
            <p className="text-[#666] font-light text-justify leading-[1.5]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam, quaerat? Nostrum asperiores .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
