/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { WorksTwoDataProps } from "@/app/types";
import GallerySection from "../GallerySection";

interface WorkSection1Props {
	data: WorksTwoDataProps;
}

export default function WorkSection1({ data }: WorkSection1Props) {
	return (
		<section>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="row align-items-end cs_gap_y_50">
					<div className="col-xl-3">
						<div className="cs_section_heading cs_style_5">
							<h3 className="cs_brackets_title cs_normal cs_fs_16">
								{data.subtitle}
							</h3>
							<h2
								className="cs_section_title cs_fs_80 mb-0"
								dangerouslySetInnerHTML={{ __html: data.title }}
							/>
						</div>
					</div>
					<div className="col-xl-9">
						<GallerySection data={data.galleryItems} />
					</div>
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
