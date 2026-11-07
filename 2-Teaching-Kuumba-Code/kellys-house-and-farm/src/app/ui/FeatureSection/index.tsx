/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { FeatureDataProps } from "@/app/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

interface FeatureSectionProps {
	data: FeatureDataProps;
}

export default function FeatureSection({ data }: FeatureSectionProps) {
	return (
		<section>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="cs_section_heading cs_style_1">
					<h2
						className="cs_section_title cs_fs_80 mb-0"
						data-aos="fade-down"
						dangerouslySetInnerHTML={{ __html: data.sectionTitle }}
					/>
					<div className="cs_section_right">
						<Link
							href={data.buttonUrl}
							className="cs_btn cs_style_1 cs_bold cs_heading_bg cs_white_color w-100"
							dangerouslySetInnerHTML={{ __html: data.buttonText }}
						></Link>
					</div>
				</div>
				<div className="cs_height_64 cs_height_lg_50" />
				<div className="row align-items-end cs_gap_y_50">
					<div className="col-lg-4">
						<div className="cs_img_box cs_style_1" data-aos="fade-right">
							<Image
								src={data.image}
								alt={data.imageAlt ?? "Feature"}
								width={data.imageWidth ?? 600}
								height={data.imageHeight ?? 400}
								className="object-cover"
							/>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="row cs_gap_y_64">
							{data.features.map((item, index) => (
								<div className="col-sm-6" key={index}>
									<div className="cs_iconbox cs_style_1">
										<div className="cs_iconbox_head cs_mb_12">
											<div className="cs_iconbox_icon cs_center">
												<i className="d-flex">
													<Icon icon={item.icon} width="22" height="19" />
												</i>
											</div>
											<h3 className="cs_fs_24 mb-0">{item.title}</h3>
										</div>
										<p className="mb-0 cs_fs_20">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* Shorter than the top spacer: the next section brings its own top space. */}
			<div className="cs_height_60 cs_height_lg_30" />
		</section>
	);
}
