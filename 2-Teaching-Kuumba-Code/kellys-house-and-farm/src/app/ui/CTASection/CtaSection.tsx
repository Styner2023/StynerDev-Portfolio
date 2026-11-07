/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { CTADataProps } from "@/app/types";
import Link from "next/link";

interface CtaSectionProps {
	data: CTADataProps;
}

export default function CtaSection({ data }: CtaSectionProps) {
	const { backgroundImage, title, buttonText, buttonUrl } = data;

	return (
		<section
			className="cs_cta cs_style_1 cs_type_1 cs_heading_bg cs_bg_filed"
			style={{
				backgroundImage: `url(${backgroundImage})`,
			}}
		>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_cta_in">
					{title && (
						<h2 className="cs_cta_title cs_fs_80 cs_white_color cs_mb_40">
							{title}
						</h2>
					)}
					{buttonText && buttonUrl && (
						<Link
							href={buttonUrl}
							className="cs_btn cs_style_1 cs_bold cs_heading_color cs_white_bg"
						>
							{buttonText}
						</Link>
					)}
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
