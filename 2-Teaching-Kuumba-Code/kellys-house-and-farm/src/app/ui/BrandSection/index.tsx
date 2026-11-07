/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { BrandDataProps } from "@/app/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

interface BrandSectionProps {
	data: BrandDataProps;
}

export default function BrandSection({ data }: BrandSectionProps) {
	return (
		<div className="cs_gray_bg">
			<div className="cs_height_64 cs_height_lg_50" />
			<div className="container">
				<Swiper
					modules={[Autoplay]}
					spaceBetween={24}
					slidesPerView={5}
					loop
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						320: { slidesPerView: 2 },
						480: { slidesPerView: 3 },
						768: { slidesPerView: 4 },
						1024: { slidesPerView: 6 },
					}}
					className="cs_slider cs_style_1 cs_slider_gap_24"
				>
					{data.brands.map((logo, index) => (
						<SwiperSlide key={index} className="cs_slide">
							<div className="cs_brand cs_style_1">
								<Image
									src={logo}
									alt={`Brand Logo ${index + 1}`}
									width={150}
									height={80}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="cs_height_64 cs_height_lg_50" />
		</div>
	);
}
