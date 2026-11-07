/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { HeroDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay, EffectCube, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper/types";

interface HeroSectionProps {
  data: HeroDataProps;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [paused, setPaused] = useState<boolean>(false);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const togglePause = () => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;
    if (paused) autoplay.start();
    else autoplay.stop();
    setPaused(!paused);
  };

  return (
    <>
      <section className="cs_hero cs_style_1 cs_heading_bg cs_white_color">
        <div className="container">
          <div className="cs_hero_in">
            <div className="cs_hero_text">
              <h1
                className="cs_hero_title cs_fs_100 cs_normal cs_mb_12 cs_white_color cs_gradient_color_1 wow fadeInUp"
                data-aos="fade-up"
                dangerouslySetInnerHTML={{ __html: data.title }}
              />

              <p
                className="cs_hero_subtitle cs_fs_20 cs_mb_32 cs_opacity_7_5"
                dangerouslySetInnerHTML={{ __html: data.subtitle }}
              ></p>

              <div className="cs_hero_btns">
                <Link
                  href={data.btnUrl1}
                  data-aos="fade-right"
                  className="cs_btn cs_style_1 cs_bold cs_heading_color cs_white_bg wow fadeInLeft"
                >
                  {data.btnText1}
                </Link>
                <Link
                  href={data.btnUrl2}
                  data-aos="fade-left"
                  className="cs_btn cs_style_2 cs_bold cs_white_color wow fadeInRight"
                >
                  {data.btnText2}
                </Link>
              </div>
            </div>
            <div
              className="cs_hero_funfact_wrap wow fadeInRight"
              data-aos="fade-left"
            >
              <div className="cs_hero_funfact">
                <h3
                  className="cs_fs_24 cs_bold cs_white_color mb-0"
                  dangerouslySetInnerHTML={{ __html: data.funfact.number }}
                />
                <p
                  className="cs_fs_20 cs_white_color cs_opacity_7_5 cs_mb_16"
                  dangerouslySetInnerHTML={{ __html: data.funfact.text }}
                ></p>

                <div className="cs_circle_group">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className="cs_hero_box wow fadeInUp" data-aos="fade-up">
              <div className="cs_hero_box_icon cs_mb_29">
                <svg
                  width={22}
                  height={30}
                  viewBox="0 0 22 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 0C4.93447 0 0 4.97132 0 11.0821C0 13.0939 0.895529 15.2575 0.933059 15.3488C1.22229 16.0404 1.793 17.1147 2.20453 17.7445L9.74665 29.2575C10.0553 29.7295 10.5121 30 11 30C11.4879 30 11.9447 29.7295 12.2534 29.2581L19.7961 17.7445C20.2083 17.1147 20.7784 16.0404 21.0676 15.3488C21.1051 15.2581 22 13.0945 22 11.0821C22 4.97132 17.0655 0 11 0ZM19.8744 14.8429C19.6162 15.4628 19.085 16.4622 18.7155 17.0267L11.1728 28.5404C11.0239 28.7679 10.9767 28.7679 10.8279 28.5404L3.28512 17.0267C2.91565 16.4622 2.38441 15.4622 2.12624 14.8422C2.11523 14.8155 1.29412 12.824 1.29412 11.0821C1.29412 5.69035 5.64818 1.30378 11 1.30378C16.3518 1.30378 20.7059 5.69035 20.7059 11.0821C20.7059 12.8266 19.8828 14.8233 19.8744 14.8429Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11.0003 5.21578C7.78893 5.21578 5.17676 7.84811 5.17676 11.0828C5.17676 14.3175 7.78893 16.9498 11.0003 16.9498C14.2116 16.9498 16.8238 14.3175 16.8238 11.0828C16.8238 7.84811 14.2116 5.21578 11.0003 5.21578ZM11.0003 15.646C8.50329 15.646 6.47088 13.5991 6.47088 11.0828C6.47088 8.56649 8.50329 6.51956 11.0003 6.51956C13.4973 6.51956 15.5297 8.56649 15.5297 11.0828C15.5297 13.5991 13.4973 15.646 11.0003 15.646Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3
                className="cs_hero_box_title cs_fs_24 cs_mb_12 cs_white_color"
                dangerouslySetInnerHTML={{ __html: data.box.title }}
              ></h3>
              <p
                className="cs_hero_box_subtitle mb-0 cs_opacity_7_5"
                dangerouslySetInnerHTML={{ __html: data.box.subtitle }}
              ></p>
              <Link
                href={data.box.link}
                className="cs_arrow_btn cs_hero_box_btn cs_center cs_heading_bg cs_white_color"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3846 0H0.615385C0.275692 0 0 0.275692 0 0.615385C0 0.955077 0.275692 1.23077 0.615385 1.23077H13.8988L0.180308 14.9495C-0.06 15.1898 -0.06 15.5794 0.180308 15.8197C0.300615 15.94 0.457846 16 0.615385 16C0.772923 16 0.930461 15.94 1.05046 15.8197L14.7692 2.10092V15.3846C14.7692 15.7243 15.0449 16 15.3846 16C15.7243 16 16 15.7243 16 15.3846V0.615385C16 0.275692 15.7243 0 15.3846 0Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="cs_hero_bg">
          <div className="cs_slider cs_style_1">
            <Swiper
              modules={[Autoplay, Pagination, EffectCube]}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1000}
              pagination={{
                clickable: true,
                el: ".cs_pagination_1_list",

                renderBullet: function (index, className) {
                  return `<li class="${className}" role="presentation" style="margin: 0;">
                            <button type="button" style="z-index: 1; background-color: white;">${
                              index + 1
                            }</button>
                          </li>`;
                },
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
              className="cs_slider_wrapper"
            >
              {data.backgrounds.map((background, index) => (
                <SwiperSlide key={index}>
                  <div className="cs_slide">
                    <Image
                      className="cs_hero_bg_in cs_bg_filed"
                      src={background.src}
                      alt=""
                      fill
                      preload={index === 0}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: background.position ?? "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: -1,
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Pagination */}
            <div className="cs_pagination_1_wrap">
              <div className="container">
                <div
                  className="cs_pagination_1_in"
                  style={{
                    backgroundColor: "transparent",
                    pointerEvents: "auto",
                  }}
                >
                  <div className="cs_slider_number cs_style_1 cs_white_color cs_bold">
                    <>
                      <span className="cs_current_number" data-number="${i}">
                        <span>0{currentSlide}</span>
                      </span>{" "}
                      <span className="cs_slider_number_seperator" />{" "}
                      <span
                        className="cs_total_numbers"
                        data-number="${slick.slideCount}"
                      >
                        <span>0{data.backgrounds.length}</span>
                      </span>
                    </>
                  </div>
                  <div
                    className="cs_pagination cs_style_1"
                    style={{
                      position: "relative",
                      pointerEvents: "auto",
                    }}
                  >
                    <ul className="cs_pagination_1_list" />
                  </div>
                  <div className="cs_hero_controls">
                    <button
                      type="button"
                      className="cs_hero_control"
                      aria-label="Previous photo"
                      onClick={() => swiperRef.current?.slidePrev()}
                    >
                      <svg width={10} height={18} viewBox="0 0 10 18" fill="none" aria-hidden="true">
                        <path
                          d="M0.499953 9.00005C0.499953 8.80823 0.573265 8.61623 0.719703 8.4698L8.2197 0.969797C8.51277 0.676734 8.98733 0.676734 9.2802 0.969797C9.57308 1.26286 9.57327 1.73742 9.2802 2.0303L2.31045 9.00005L9.2802 15.9698C9.57327 16.2629 9.57327 16.7374 9.2802 17.0303C8.98714 17.3232 8.51258 17.3234 8.2197 17.0303L0.719703 9.5303C0.573265 9.38386 0.499953 9.19186 0.499953 9.00005Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="cs_hero_control"
                      aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                      aria-pressed={paused}
                      onClick={togglePause}
                    >
                      {paused ? (
                        <svg width={12} height={14} viewBox="0 0 19 22" fill="none" aria-hidden="true">
                          <path d="M18.5 11L0.5 21.3923V0.607696L18.5 11Z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width={12} height={14} viewBox="0 0 12 14" fill="none" aria-hidden="true">
                          <rect x={1} width={3.5} height={14} rx={1} fill="currentColor" />
                          <rect x={7.5} width={3.5} height={14} rx={1} fill="currentColor" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      className="cs_hero_control"
                      aria-label="Next photo"
                      onClick={() => swiperRef.current?.slideNext()}
                    >
                      <svg width={10} height={18} viewBox="0 0 10 18" fill="none" aria-hidden="true">
                        <path
                          d="M9.50005 8.99995C9.50005 9.19177 9.42673 9.38377 9.2803 9.5302L1.7803 17.0302C1.48723 17.3233 1.01267 17.3233 0.719797 17.0302C0.426922 16.7371 0.426734 16.2626 0.719797 15.9697L7.68955 8.99995L0.719797 2.0302C0.426734 1.73714 0.426734 1.26258 0.719797 0.969702C1.01286 0.676826 1.48742 0.67664 1.7803 0.969702L9.2803 8.4697C9.42673 8.61614 9.50005 8.80814 9.50005 8.99995Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
