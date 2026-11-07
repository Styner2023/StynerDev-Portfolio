/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { ServiceTwoDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface ServiceSection1Props {
	data: ServiceTwoDataProps[];
}

export default function ServiceSection1({ data }: ServiceSection1Props) {
	return (
		<>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="row cs_gap_y_40 cs_gap_x_40">
					{data.map((service, index) => (
						<div className="col-lg-6" key={index}>
							<div className="cs_card cs_style_2">
								<Link href={service.link} className="cs_card_thumb">
									<Image
										src={service.image}
										alt={service.title}
										width={600}
										height={400}
										className="object-cover"
									/>
								</Link>
								<div className="cs_card_info">
									<h2 className="cs_card_title cs_fs_32 cs_white_color cs_bold cs_mb_8">
										<Link href={service.link}>{service.title}</Link>
									</h2>
									<p
										className="cs_card_subtitle mb-0 cs_white_color"
										dangerouslySetInnerHTML={{ __html: service.description }}
									></p>
								</div>
								<Link
									href={service.link}
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
					))}
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70"></div>
		</>
	);
}
