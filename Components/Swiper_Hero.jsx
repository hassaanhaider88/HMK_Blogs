"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";

export default function SwiperHero() {
  const [bgPositionX, setBgPositionX] = useState(0); // Initialize background x-position

  const handleSlideChange = (swiper) => {
    const index = swiper.activeIndex;
    setBgPositionX(index * -20); // Adjust this multiplier to control the speed of horizontal movement
  };

  return (
    <div
      className="container"
      style={{
        backgroundPosition: `${bgPositionX}px center`, // Update background position horizontally
      }}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        <SwiperSlide className="slide">
          <div className="subtitle" data-swiper-parallax="-200">
            HMK Blogs
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              HMK Blogs is a dynamic blogging platform designed to empower users
              to create, manage, and delete their blogs seamlessly. It offers an
              intuitive interface that encourages writers to express their ideas
              and share their insights with a wider audience. Users can easily
              navigate through the platform, customize their blog posts, and
              engage with fellow bloggers, fostering a community of creativity
              and collaboration. With features that support various multimedia
              formats and user-friendly editing tools, HMK Blogs aims to inspire
              and facilitate a rich blogging experience for all.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <div className="subtitle" data-swiper-parallax="-200">
            Hassaan Haider
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Hassaan Haider is a skilled front-end developer proficient in
              Next.js, Express.js, MongoDB, and Node.js. With a strong
              foundation in web technologies, he excels at creating responsive
              and visually appealing applications that enhance user experience.
              His passion for coding and problem-solving drives him to deliver
              high-quality solutions tailored to meet client needs. As a vital
              contributor to projects like HMK Blogs, Hassaan's technical
              expertise and innovative approach help bring ideas to life and
              ensure robust performance across platforms.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <div className="subtitle" data-swiper-parallax="-200">
            HMK CodeWeb
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              HMK CodeWeb is a reputable web development company dedicated to
              providing customized solutions that cater to diverse client
              requirements. With a focus on quality and innovation, the company
              specializes in creating responsive, user-friendly websites and
              applications that enhance online presence. HMK CodeWeb's team of
              experienced developers collaborates closely with clients to
              understand their vision, delivering tailored strategies that drive
              business growth. HMK CodeWeb empowers businesses to succeed in the
              digital landscape through effective web development solutions.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 40vh;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-size: cover;
          background-position: center center;
          transition: background-position 0.6s ease; /* Smooth transition for parallax */
        }

        .mySwiper {
          width: 80vw;
          // padding : 20px ;
          // height: 70vh;
          position: relative;
          z-index: 10;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          top: 50%;
          transform: translateY(-50%);
          margin: 0 10px;
        }

        .swiper-pagination {
          position: relative;
          margin-top: 20px;
          bottom: 10px;
        }

        .slide {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .subtitle {
          font-size: 2.2rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }

        .text p {
          font-size: 1rem;
          color: #ddd;
          line-height: 1.5;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 600;
          cursor: grab;
        }

        @media (max-width: 768px) {
          .mySwiper {
            width: 90vw;
            height: 60vh;
          }

          .title {
            font-size: 1.2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .text p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .mySwiper {
            width: 95vw;
            height: 50vh;
          }

          .title {
            font-size: 1rem;
          }

          .subtitle {
            font-size: 0.8rem;
          }

          .text p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
