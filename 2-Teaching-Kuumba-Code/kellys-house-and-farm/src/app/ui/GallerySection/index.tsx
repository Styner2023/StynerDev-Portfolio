/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { useState } from "react";
import LightGallery from "./LightGallery";
import { GalleryDataProps } from "@/app/types";
import Image from "next/image";

interface GallerySectionProps {
	data: GalleryDataProps[];
}

const GallerySection = ({ data }: GallerySectionProps) => {
	const [modalToggle, setModalToggle] = useState<boolean>(false);
	const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);

	const slideTo = (index: number) => {
		setInitialSlideIndex(index);
		setModalToggle(true);
	};

	return (
		<div className="container">
			<div className="cs_gallery_grid_1">
				{data?.map((item, index) => (
					<div
						key={index}
						className="cs_gallery cs_style_1 cs_center cs_gallery_item"
						style={{
							height: item.height,
							backgroundImage: `url(${item.imgSrc})`,
						}}
						onClick={() => slideTo(index)}
					>
						<Image
							src={item.imgSrc}
							alt={item.title}
							width={400}
							height={300}
							className="object-cover"
						/>
						<span className="cs_gallery_info_wrap cs_center">
							<span className="cs_gallery_info text-center cs_center">
								<span className="cs_white_color cs_fs_16 cs_bold cs_mb_4 d-block">
									{item.title}
								</span>
								<span className="cs_white_color d-block">{item.year}</span>
							</span>
						</span>
					</div>
				))}
			</div>

			<LightGallery
				modalToggle={modalToggle}
				setModalToggle={setModalToggle}
				galleryList={data}
				initialSlideIndex={initialSlideIndex}
			/>
		</div>
	);
};

export default GallerySection;
