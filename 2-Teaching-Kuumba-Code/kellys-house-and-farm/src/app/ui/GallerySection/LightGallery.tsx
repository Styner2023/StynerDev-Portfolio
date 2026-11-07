/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper/types";

interface GalleryItem {
	imgSrc: string;
	title: string;
	gallery_image_url?: string; // Optional for download
}

interface LightGalleryProps {
	modalToggle: boolean;
	setModalToggle: (value: boolean) => void;
	galleryList: GalleryItem[];
	initialSlideIndex: number;
}

export default function LightGallery({
	modalToggle,
	setModalToggle,
	galleryList,
	initialSlideIndex,
}: LightGalleryProps) {
	// Proper state types
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [zoomLevel, setZoomLevel] = useState<number>(1);
	const [swiperRef, setSwiperRef] = useState<SwiperInstance | null>(null); // Correct type for swiperRef

	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

	const handleZoomIn = () => {
		setZoomLevel((prevZoom) => prevZoom * 1.1);
	};

	const handleZoomOut = () => {
		if (zoomLevel > 1) {
			setZoomLevel((prevZoom) => prevZoom / 1.1);
		}
	};

	const handleDownload = (imageUrl: string) => {
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
		link.click();
	};

	const toggleAutoplay = () => {
		if (swiperRef && swiperRef.autoplay) {
			if (isPlaying) {
				swiperRef.autoplay.stop();
			} else {
				swiperRef.autoplay.start();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	const handleFullscreenChange = () => {
		setIsFullscreen(!!document.fullscreenElement);
	};

	useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const handleCloseModal = () => {
		setModalToggle(false);
		setZoomLevel(1);
	};

	return (
		<div className="container">
			{modalToggle && (
				<div className="cs_gallery_modal">
					<div className="cs_gallery_modal_overlay"></div>
					<div className="cs_gallery_modal_slider_wrap">
						<Swiper
							onSwiper={setSwiperRef}
							pagination={{ type: "fraction" }}
							navigation={true}
							modules={[Pagination, Mousewheel, Navigation, Autoplay]}
							loop={true}
							mousewheel={true}
							className="mySwiper"
							speed={1000}
							initialSlide={initialSlideIndex}
							autoplay={
								isPlaying
									? {
											delay: 3000,
											disableOnInteraction: false,
									  }
									: false
							}
						>
							{galleryList.map((item, index) => (
								<SwiperSlide key={index}>
									<div className="cs_gallery_modal_item">
										<Image
											src={item.imgSrc}
											alt={item.title}
											width={500}
											height={350}
											style={{
												transform: `scale(${zoomLevel})`,
												transition: "transform 0.3s ease",
											}}
											className="object-cover"
										/>
									</div>
									<h4 className="cs_gallery_modal_title">{item.title}</h4>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="cs_gallery_controler">
						<button onClick={handleZoomIn} className="cs_gallery_controler_btn">
							<Icon icon="lucide:zoom-in" width="22" height="22" />
						</button>
						<button
							onClick={handleZoomOut}
							className="cs_gallery_controler_btn"
						>
							<Icon icon="lucide:zoom-out" width="22" height="22" />
						</button>
						<button
							onClick={() =>
								handleDownload(
									galleryList[initialSlideIndex]?.gallery_image_url || ""
								)
							}
							className="cs_gallery_controler_btn"
						>
							<Icon icon="lucide:download" width="22" height="22" />
						</button>
						<button
							onClick={toggleAutoplay}
							className={`cs_gallery_controler_btn ${
								isPlaying ? "active" : ""
							}`}
						>
							{isPlaying ? (
								<Icon icon="lucide:circle-pause" width="22" height="22" />
							) : (
								<Icon icon="lucide:circle-play" width="22" height="22" />
							)}
						</button>
						<button
							onClick={toggleFullScreen}
							className="cs_gallery_controler_btn"
						>
							{isFullscreen ? (
								<Icon icon="lucide:scan-line" width="22" height="22" />
							) : (
								<Icon icon="lucide:scan" width="22" height="22" />
							)}
						</button>
						<button
							onClick={handleCloseModal}
							className="cs_gallery_controler_btn"
						>
							<Icon icon="lucide:x" width="22" height="22" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
