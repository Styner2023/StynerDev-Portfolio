/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { WorksDataProps } from "@/app/types";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import parser from "html-react-parser";
import { Swiper as SwiperInstance } from "swiper/types"; // Import the SwiperInstance type for typing the ref

interface WorksSectionProps {
	data: WorksDataProps;
}

export default function WorksSection({ data }: WorksSectionProps) {
	const swiperRef = useRef<SwiperInstance | null>(null); // Type swiperRef as SwiperInstance

	return (
		<section>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_section_heading cs_style_2 cs_color_1">
					<h2 className="cs_section_title cs_fs_80 mb-0" data-aos="fade-down">
						{parser(data.title)}
					</h2>
					<div className="cs_section_right">
						<h3 className="cs_brackets_title cs_normal cs_fs_16 mb-0">
							{data.subtitle}
						</h3>
					</div>
				</div>

				<div className="cs_height_64 cs_height_lg_50" />
				<div className="cs_full_width_slider_section">
					<div className="cs_slider cs_style_1 cs_slider_gap_24">
						<Swiper
							modules={[Navigation]}
							spaceBetween={24}
							slidesPerView="auto"
							onSwiper={(swiper) => {
								swiperRef.current = swiper; // Store swiper instance
							}}
							speed={800}
							loop={true}
							centeredSlides={false}
							className="cs_slider cs_style_1"
						>
							{data.slides.map((slide, index) => (
								<SwiperSlide
									className="cs_slide"
									key={index}
									style={{ width: "auto" }}
								>
									<div className="cs_card cs_style_4">
										<div
											className="cs_card_thumb cs_bg_filed cs_mb_40"
											style={{
												backgroundImage: `url(${slide.image})`,
											}}
										/>
										<div className="cs_card_info">
											<ul className="cs_card_info_list cs_mp_0">
												<li>
													<p className="mb-0">{data.labels?.name ?? "NAME"}</p>
													<h3 className="mb-0 cs_fs_20 cs_bold">
														{slide.name}
													</h3>
												</li>
												{slide.location && (
													<li>
														<p className="mb-0">
															{data.labels?.location ?? "LOCATION"}
														</p>
														<h3 className="mb-0 cs_fs_20 cs_bold">
															{slide.location}
														</h3>
													</li>
												)}
											</ul>
											<div className="cs_card_text">{slide.description}</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						{/* Custom Arrows */}
						<div className="cs_slider_arrows cs_style_3">
							<div
								className="cs_right_arrow cs_heading_color cs_fs_20 cs_center cs_next_btn_arrow"
								style={{}}
								onClick={() => swiperRef.current?.slideNext()} // Type-safe method call
							>
								<span className="cs_center">NEXT</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
