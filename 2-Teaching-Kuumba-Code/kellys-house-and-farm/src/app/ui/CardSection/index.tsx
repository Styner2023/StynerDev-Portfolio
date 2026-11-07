/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { CardDataProps } from "@/app/types";
import Link from "next/link";

interface CardSectionProps {
	data: CardDataProps;
	bgColor?: string;
}

export default function CardSection({ data, bgColor }: CardSectionProps) {
	return (
		<section className={`cs_half_bg ${bgColor ? bgColor : ""}`}>
			<div className="container">
				<div
					className="cs_card cs_style_1 cs_heading_bg cs_bg_filed"
					style={{
						backgroundImage: `url(${data.backgroundImage})`,
					}}
				>
					<div className="cs_card_top">
						<div className="cs_card_tags">
							{data.tags.map((tag, index) => (
								<Link href="#" className="cs_card_tag" key={index}>
									{tag}
								</Link>
							))}
						</div>
					</div>
					<div className="cs_card_bottom">
						<h2
							className="cs_card_title cs_gradient_color_1 cs_fs_80 mb-0 wow fadeInUp"
							dangerouslySetInnerHTML={{ __html: data.title }}
							data-aos="fade-up"
						></h2>
					</div>
					<Link
						href={data.buttonLink}
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
			</div>
		</section>
	);
}
