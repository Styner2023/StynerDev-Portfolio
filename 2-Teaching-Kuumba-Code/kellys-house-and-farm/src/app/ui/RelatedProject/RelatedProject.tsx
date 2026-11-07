/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { ServiceDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance, NavigationOptions } from "swiper/types";

interface RelatedProjectProps {
	data: ServiceDataProps;
}

export default function RelatedProject({ data }: RelatedProjectProps) {
	const prevRef = useRef<HTMLDivElement>(null); // Correct type for prevRef
	const nextRef = useRef<HTMLDivElement>(null); // Correct type for nextRef
	const swiperRef = useRef<SwiperInstance | null>(null); // Correct type for swiperRef
	const [currentSlide, setCurrentSlide] = useState(1);

	useEffect(() => {
		if (swiperRef.current) {
			const swiper = swiperRef.current;

			// Assert navigation type as NavigationOptions
			if (swiper.params && typeof swiper.params.navigation !== "boolean") {
				(swiper.params.navigation as NavigationOptions).prevEl =
					prevRef.current;
				(swiper.params.navigation as NavigationOptions).nextEl =
					nextRef.current;
				swiper.navigation.init();
				swiper.navigation.update();
			}
		}
	}, []);

	return (
		<section className="cs_gray_bg">
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_slider cs_style_1 cs_slider_gap_24">
					<div className="cs_section_heading cs_style_2 cs_color_1">
						<h2
							className="cs_section_title cs_fs_80 mb-0"
							dangerouslySetInnerHTML={{ __html: data.title }}
						/>
						<div className="cs_section_right">
							<h3 className="cs_brackets_title cs_normal cs_fs_16 mb-0">
								{data.highlightedText}
							</h3>
							<div className="cs_slider_arrows cs_style_4 cs_hide_lg">
								<div
									className="cs_left_arrow cs_heading_color"
									ref={prevRef}
									style={{ cursor: "pointer" }}
								>
									<svg
										width={10}
										height={18}
										viewBox="0 0 10 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0.5 9c0-.19.07-.38.22-.53l7.5-7.5a.75.75 0 111.06 1.06L2.31 9l6.97 6.97a.75.75 0 01-1.06 1.06l-7.5-7.5A.75.75 0 010 9z"
											fill="currentColor"
										/>
									</svg>
								</div>

								<div className="cs_slider_number cs_style_2 cs_bold">
									{currentSlide} / {data.service.length}
								</div>

								<div
									className="cs_right_arrow cs_heading_color"
									ref={nextRef}
									style={{ cursor: "pointer" }}
								>
									<svg
										width={10}
										height={18}
										viewBox="0 0 10 18"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9.5 9c0 .19-.07.38-.22.53l-7.5 7.5a.75.75 0 11-1.06-1.06L7.69 9 1.72 2.03A.75.75 0 112.78.97l7.5 7.5c.15.15.22.34.22.53z"
											fill="currentColor"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					<div className="cs_height_64 cs_height_lg_50" />

					<div
						className="cs_slider_container"
						data-slides-per-view="responsive"
					>
						<div className="cs_slider_wrapper">
							<Swiper
								modules={[Navigation]}
								spaceBetween={24}
								slidesPerView={4}
								speed={1000}
								loop={true}
								centeredSlides={false}
								navigation={{
									prevEl: prevRef.current,
									nextEl: nextRef.current,
								}}
								onSwiper={(swiper) => {
									swiperRef.current = swiper;
								}}
								onSlideChange={(swiper) => {
									const realIndex = swiper.realIndex + 1;
									setCurrentSlide(realIndex);
								}}
								breakpoints={{
									320: { slidesPerView: 1 },
									480: { slidesPerView: 1 },
									768: { slidesPerView: 2 },
									1024: { slidesPerView: 2 },
								}}
								className="cs_slider cs_style_1 cs_slider_gap_24"
							>
								{data.service.map((serviceItem, index) => (
									<SwiperSlide className="cs_slide" key={index}>
										<div className="cs_card cs_style_2">
											<Link href={serviceItem.link} className="cs_card_thumb">
												<Image
													src={serviceItem.image}
													alt={serviceItem.title}
													width={600}
													height={400}
													className="object-cover"
												/>
											</Link>
											<div className="cs_card_info">
												<h2 className="cs_card_title cs_fs_32 cs_white_color cs_bold cs_mb_8">
													<Link
														href={serviceItem.link}
														dangerouslySetInnerHTML={{
															__html: serviceItem.title,
														}}
													/>
												</h2>
												<p className="cs_card_subtitle mb-0 cs_white_color">
													{serviceItem.description}
												</p>
											</div>
											<Link
												href={serviceItem.link}
												className="cs_arrow_btn cs_size_lg cs_center cs_white_bg cs_heading_color"
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
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>

					<div className="cs_pagination cs_style_2 cs_show_lg" />
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
