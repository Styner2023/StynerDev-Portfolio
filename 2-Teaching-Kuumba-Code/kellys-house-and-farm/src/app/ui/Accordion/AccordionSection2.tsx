/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";

import { useState, useRef } from "react";
import Image from "next/image"; // ✅ Next.js Image
import { FaqDataProps } from "@/app/types";

interface AccordionSection2Props {
	data: FaqDataProps;
}

export default function AccordionSection2({ data }: AccordionSection2Props) {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleToggle = (index: number) => {
		setActiveIndex(activeIndex === index ? -1 : index);
	};

	return (
		<div className="container">
			<div className="cs_section_heading cs_style_2 cs_color_1">
				<h2
					className="cs_section_title cs_fs_80 mb-0"
					dangerouslySetInnerHTML={{ __html: data.sectionTitle }}
				></h2>
			</div>
			<div className="cs_height_64 cs_height_lg_50" />
			<div className="row cs_gap_y_30">
				<div className="col-xxl-4 col-xl-5">
					<div className="cs_img_box cs_style_2">
						<Image
							src={data.image}
							alt="FAQ"
							className="cs_radius_20 w-100"
							width={600}
							height={400}
						/>
					</div>
				</div>
				<div className="col-xxl-8 col-xl-7">
					<div className="cs_accordians cs_style_1">
						{data.items.map((item, index) => (
							<div
								className={`cs_accordian ${
									activeIndex === index ? "active" : ""
								}`}
								key={index}
							>
								<div
									className="cs_accordian_head"
									onClick={() => handleToggle(index)}
								>
									<p
										className="cs_accordian_title cs_fs_20 cs_bold cs_heading_color"
										dangerouslySetInnerHTML={{ __html: item.question }}
									></p>
									<span className="cs_accordian_toggle cs_heading_color">
										<svg
											width={20}
											height={12}
											viewBox="0 0 20 12"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.0001 11.2501C9.77627 11.2501 9.55227 11.1645 9.38143 10.9937L0.63143 2.24368C0.289523 1.90177 0.289523 1.34812 0.63143 1.00643C0.973336 0.664742 1.52699 0.664523 1.86868 1.00643L10.0001 9.1378L18.1314 1.00643C18.4733 0.664523 19.027 0.664523 19.3687 1.00643C19.7104 1.34834 19.7106 1.90199 19.3687 2.24368L10.6187 10.9937C10.4478 11.1645 10.2238 11.2501 10.0001 11.2501Z"
												fill="currentColor"
											/>
										</svg>
									</span>
								</div>
								<div
									className="cs_accordian_body cs_heading_color cs_opacity_7_5"
									style={{
										height:
											activeIndex === index
												? `${contentRefs.current[index]?.scrollHeight}px`
												: "0",
										overflow: "hidden",
										transition: "height 0.3s ease, opacity 0.3s ease",
										opacity: activeIndex === index ? "1" : "0",
									}}
									ref={(el) => {
										contentRefs.current[index] = el;
									}}
								>
									<p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
