/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { TributeDataProps } from "@/app/types";
import Image from "next/image";
import { Fragment, useState } from "react";
import VideoModal from "../VideoModal";

interface TributeSectionProps {
	data: TributeDataProps;
}

export default function TributeSection({ data }: TributeSectionProps) {
	const [toggle, setToggle] = useState<boolean>(false);
	const [iframeSrc, setIframeSrc] = useState<string>("about:blank");

	const handelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (!data.video) return;
		setIframeSrc(data.video.videoUrl);
		setToggle(true);
	};

	const handelClose = () => {
		setIframeSrc("about:blank");
		setToggle(false);
	};

	return (
		<section className="cs_gray_bg">
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_section_heading cs_style_4 text-center">
					<h3
						className="cs_brackets_title cs_normal cs_fs_16 cs_mb_24"
						data-aos="fade-down"
					>
						{data.label}
					</h3>
					<h2
						className="cs_section_title cs_fs_80 mb-0"
						data-aos="fade-down"
						dangerouslySetInnerHTML={{ __html: data.title }}
					/>
				</div>
				<div className="cs_height_64 cs_height_lg_50" />
				<figure className="mb-0" data-aos="fade-up">
					<div className="cs_tribute_niche">
						<Image
							src={data.image}
							alt={data.imageAlt}
							width={data.imageWidth}
							height={data.imageHeight}
							className="w-100 h-auto"
						/>
					</div>
					{data.placard && (
						<figcaption className="cs_tribute_placard">
							{/* Wrap only between the "·"-separated parts */}
							{data.placard.split(" · ").map((part, i) => (
								<Fragment key={i}>
									{i > 0 && " · "}
									<span className="text-nowrap">{part}</span>
								</Fragment>
							))}
						</figcaption>
					)}
				</figure>
				<div className="cs_height_48 cs_height_lg_40" />
				<p className="cs_tribute_text cs_fs_20 cs_drop_cap mb-0">{data.text}</p>
				{data.dedication && (
					<>
						<div className="cs_height_48 cs_height_lg_40" />
						<p className="cs_tribute_dedication cs_fs_20 mb-0">{data.dedication}</p>
					</>
				)}
				{data.video && (
					<>
						<div className="cs_height_64 cs_height_lg_50" />
						<figure className="mb-0" data-aos="fade-up">
							<a
								href={data.video.videoUrl}
								onClick={handelClick}
								className="cs_tribute_video cs_bg_filed cs_video_open cs_center"
								style={{ backgroundImage: `url(${data.video.backgroundImage})` }}
								aria-label="Play the clip of the land in Canton"
							>
								<span className="cs_player_btn cs_heading_color">
									<svg
										width={19}
										height={22}
										viewBox="0 0 19 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M18.5 11L0.5 21.3923V0.607696L18.5 11Z"
											fill="currentColor"
										/>
									</svg>
								</span>
							</a>
							{data.video.caption && (
								<figcaption className="cs_tribute_video_caption">
									{data.video.caption.split(" · ").map((part, i) => (
										<Fragment key={i}>
											{i > 0 && " · "}
											<span className="text-nowrap">{part}</span>
										</Fragment>
									))}
								</figcaption>
							)}
						</figure>
						<VideoModal
							isTrue={toggle}
							iframeSrc={iframeSrc}
							poster={data.video.backgroundImage}
							handelClose={handelClose}
						/>
					</>
				)}
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
