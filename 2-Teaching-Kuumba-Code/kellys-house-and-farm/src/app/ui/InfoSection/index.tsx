/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { InfoDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface InfoListProps {
	data: InfoDataProps;
}

export default function InfoList({ data }: InfoListProps) {
	const { imageSrc, imageAlt, projectUrl, title, info } = data;

	return (
		<section>
			<div className="container">
				<div className="cs_height_100 cs_height_lg_70" />
				<div className="cs_card cs_style_5">
					<Link href={projectUrl} className="cs_card_thumb">
						<Image
							src={imageSrc}
							alt={imageAlt || "Project Thumbnail"}
							width={600}
							height={400}
							className="object-cover"
						/>
					</Link>
					<div className="cs_card_right">
						{title && (
							<h2 className="cs_card_title cs_fs_80 mb-0">
								<Link
									href={projectUrl}
									dangerouslySetInnerHTML={{ __html: title }}
								></Link>
							</h2>
						)}
						<ul className="cs_card_info_list cs_mp_0">
							{info.map((item, index) => (
								<li key={index}>
									<p className="mb-0">{item.label}</p>
									<h4 className="mb-0 cs_fs_20 cs_bold">{item.value}</h4>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="cs_height_100 cs_height_lg_70" />
			</div>
		</section>
	);
}
