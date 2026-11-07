/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState, MouseEvent } from "react";
import VideoModal from "../VideoModal";
import { ServiceDetailsProps } from "@/app/types";

interface ServiceDetailsSectionProps {
	data: ServiceDetailsProps;
}

export default function ServiceDetailsSection({
	data,
}: ServiceDetailsSectionProps) {
	const [toggle, setToggle] = useState<boolean>(false);
	const [iframeSrc, setIframeSrc] = useState<string>("about:blank");

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIframeSrc(data.video.videoUrl);
		setToggle(true);
	};

	const handleClose = () => {
		setIframeSrc("about:blank");
		setToggle(false);
	};

	return (
		<section>
			<div className="cs_height_125 cs_height_lg_80" />
			<div className="container">
				<div className="row cs_gap_x_40 cs_gap_y_30">
					<div className="col-lg-7">
						<div className="cs_page_heading cs_style_2">
							<ol className="breadcrumb">
								{data.breadcrumb.map((item, index) => (
									<li key={index} className="breadcrumb-item">
										{item.link ? (
											<Link href={item.link}>{item.label}</Link>
										) : (
											item.label
										)}
									</li>
								))}
							</ol>
							<h1
								className="cs_page_title mb-0 cs_fs_80 wow fadeInUp"
								dangerouslySetInnerHTML={{ __html: data.titleHighlight }}
							></h1>
						</div>

						<div className="cs_height_64 cs_height_lg_50" />

						<Link
							href={""}
							onClick={handleClick}
							className="cs_video_block cs_style_1 cs_type_1 cs_bg_filed cs_video_open cs_center cs_radius_20"
							style={{ backgroundImage: `url(${data.video.backgroundImage})` }}
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
						</Link>

						<VideoModal
							isTrue={toggle}
							iframeSrc={iframeSrc}
							handelClose={handleClose}
						/>
					</div>

					<div className="col-lg-5">
						<div
							className="cs_cta cs_style_2 cs_type_1 cs_bg_filed cs_radius_20"
							style={{ backgroundImage: `url(${data.cta.backgroundImage})` }}
						>
							<Link
								href={data.cta.buttonUrl}
								className="cs_btn cs_style_2 cs_bold cs_white_color"
							>
								{data.cta.buttonText}
							</Link>
						</div>
					</div>
				</div>

				<div className="cs_height_64 cs_height_lg_50" />

				<div className="row cs_gap_x_40 cs_gap_y_30">
					<div className="col-xl-7">
						<div
							className="cs_fs_20"
							dangerouslySetInnerHTML={{ __html: data.description }}
						></div>
					</div>
					<div className="col-xl-5">
						<div className="row cs_gap_x_20 cs_gap_y_20">
							{data.iconBoxes.map((box, index) => (
								<div className="col-sm-6" key={index}>
									<div className="cs_iconbox cs_style_2">
										<div className="cs_iconbox_icon">
											<i className="d-inline-flex">
												<Icon icon={box.iconClass} width="30" height="26" />
											</i>
										</div>
										<p
											className="cs_iconbox_title cs_bold cs_fs_20 mb-0 cs_heading_color"
											dangerouslySetInnerHTML={{ __html: box.title }}
										></p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
