/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { CardOneDataProps } from "@/app/types";
import Link from "next/link";

interface CardSection1Props {
	data: CardOneDataProps;
}

export default function CardSection1({ data }: CardSection1Props) {
	const {
		imageSrc,
		projectUrl,
		title,
		info,
		descriptionTitle,
		descriptionText,
		outcomesTitle,
		outcomesText,
	} = data;

	return (
		<section
			className="cs_card cs_style_6 cs_bg_filed"
			style={{ backgroundImage: `url(${imageSrc})` }}
		>
			<div className="container">
				<div className="cs_card_in">
					<div className="cs_card_left">
						<h2 className="cs_card_title cs_white_color cs_fs_80 mb-0">
							<Link
								href={projectUrl}
								dangerouslySetInnerHTML={{ __html: title }}
							></Link>
						</h2>
						<ul className="cs_card_info_list cs_mp_0">
							{info.map((item, index) => (
								<li key={index}>
									<p
										className="mb-0 cs_white_color"
										dangerouslySetInnerHTML={{ __html: item.label }}
									></p>
									<h4 className="mb-0 cs_fs_20 cs_bold cs_white_color">
										{item.value}
									</h4>
								</li>
							))}
						</ul>
					</div>
					<div className="cs_card_right">
						<div className="cs_card_text">
							<p
								className="text-uppercase cs_white_color mb-0"
								dangerouslySetInnerHTML={{ __html: descriptionTitle }}
							></p>
							<p
								className="cs_fs_20 cs_bold cs_white_color cs_mb_40"
								dangerouslySetInnerHTML={{ __html: descriptionText }}
							></p>
							<p
								className="text-uppercase cs_white_color mb-0"
								dangerouslySetInnerHTML={{ __html: outcomesTitle }}
							></p>
							<p
								className="cs_fs_20 cs_bold cs_white_color mb-0"
								dangerouslySetInnerHTML={{ __html: outcomesText }}
							></p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
