/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { TeamMembersDataProps } from "@/app/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance, NavigationOptions } from "swiper/types";

interface TeamMemberSectionProps {
	data: TeamMembersDataProps;
}

export default function TeamMemberSection({ data }: TeamMemberSectionProps) {
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
	}, []); // Empty dependency array ensures this effect runs once after the initial render

	return (
		<>
			<section>
				<div className="cs_height_100 cs_height_lg_70" />
				<div className="container">
					<div className="cs_slider cs_style_1 cs_slider_gap_24">
						<div className="cs_section_heading cs_style_2 cs_color_1">
							<h2
								className="cs_section_title cs_fs_80 mb-0"
								data-aos="fade-down"
								dangerouslySetInnerHTML={{ __html: data.title }}
							/>

							<div className="cs_section_right">
								<h3
									className="cs_brackets_title cs_normal cs_fs_16 mb-0"
									dangerouslySetInnerHTML={{ __html: data.subtitle }}
								></h3>
								<div
									className="cs_slider_arrows cs_style_4 cs_hide_lg"
									style={{ cursor: "pointer" }}
								>
									{/* Left Arrow */}
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
												d="M0.499953 9.00005C0.499953 8.80823 0.573265 8.61623 0.719703 8.4698L8.2197 0.969797C8.51277 0.676734 8.98733 0.676734 9.2802 0.969797C9.57308 1.26286 9.57327 1.73742 9.2802 2.0303L2.31045 9.00005L9.2802 15.9698C9.57327 16.2629 9.57327 16.7374 9.2802 17.0303C8.98714 17.3232 8.51258 17.3234 8.2197 17.0303L0.719703 9.5303C0.573265 9.38386 0.499953 9.19186 0.499953 9.00005Z"
												fill="currentColor"
											/>
										</svg>
									</div>
									{/* Slide Number */}
									<div className="cs_slider_number cs_style_2 cs_bold">
										{currentSlide} / {data.teamMembers.length}
									</div>
									{/* Right Arrow */}
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
												d="M9.50005 8.99995C9.50005 9.19177 9.42673 9.38377 9.2803 9.5302L1.7803 17.0302C1.48723 17.3233 1.01267 17.3233 0.719797 17.0302C0.426922 16.7371 0.426734 16.2626 0.719797 15.9697L7.68955 8.99995L0.719797 2.0302C0.426734 1.73714 0.426734 1.26258 0.719797 0.969702C1.01286 0.676826 1.48742 0.67664 1.7803 0.969702L9.2803 8.4697C9.42673 8.61614 9.50005 8.80814 9.50005 8.99995Z"
												fill="currentColor"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Space */}
						<div className="cs_height_64 cs_height_lg_50" />

						{/* Swiper Slider */}
						<Swiper
							modules={[Navigation]}
							spaceBetween={24}
							slidesPerView={4}
							navigation={{
								prevEl: prevRef.current,
								nextEl: nextRef.current,
								disabledClass: "swiper-button-disabled",
							}}
							speed={800}
							loop={true}
							className="cs_slider cs_style_1 cs_slider_gap_24"
							onSwiper={(swiper) => {
								swiperRef.current = swiper;
								// Ensuring swiper initialization is completed
							}}
							onSlideChange={(swiper) => {
								const realIndex = swiper.realIndex + 1;
								setCurrentSlide(realIndex);
							}}
							breakpoints={{
								320: {
									slidesPerView: 1,
								},
								480: {
									slidesPerView: 2,
								},
								768: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 4,
								},
							}}
						>
							{data.teamMembers.map((member, index) => (
								<SwiperSlide key={index} className="cs_slide">
									<div className="cs_team_member cs_style_1">
										<Image
											src={member.img}
											alt={member.name}
											width={400}
											height={400}
											className="cs_team_member_img object-cover"
										/>
										<div className="cs_team_member_info">
											<h3
												className="cs_team_member_name cs_white_color cs_fs_20 cs_bold mb-0"
												dangerouslySetInnerHTML={{ __html: member.name }}
											></h3>
											<p
												className="cs_team_member_designation cs_white_color cs_fs_20 mb-0"
												dangerouslySetInnerHTML={{ __html: member.role }}
											></p>
											<p
												className="cs_team_member_desc cs_white_color mb-0"
												dangerouslySetInnerHTML={{
													__html: member.description,
												}}
											></p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<div className="cs_pagination cs_style_2 cs_show_lg" />
					</div>
				</div>
				<div className="cs_height_100 cs_height_lg_70" />
			</section>
		</>
	);
}
