/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { ValueDataProps } from "@/app/types";

interface ValueSectionProps {
	data: ValueDataProps;
}

export default function ValueSection({ data }: ValueSectionProps) {
	return (
		<section className="">
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_values_card cs_style_1">
					<div className="cs_values_card_left">
						<h3 className="cs_brackets_title cs_normal cs_fs_16 mb-0">
							{data.sectionTitle}
						</h3>
					</div>
					<div className="cs_values_card_left">
						<ul className="cs_values cs_mp_0 cs_heading_color cs_fs_20">
							{data.values.map((item, index) => (
								<li key={index}>
									<span>{item.text}</span>
									<span className="cs_bold">
										{String(index + 1).padStart(2, "0")}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
