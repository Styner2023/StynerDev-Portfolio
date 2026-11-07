/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { ContractDataProps } from "@/app/types";
import ContactForm from "../Forms/ContactForm";

interface ContactSectionProps {
	data: ContractDataProps;
}

export default function ContactSection({ data }: ContactSectionProps) {
	return (
		<section>
			<div className="cs_height_100 cs_height_lg_70" />
			<div className="container">
				<div className="row cs_gap_y_40">
					<div className="col-lg-5">
						<div className="cs_map">
							<iframe id="map" src={data.locationUrl} />
						</div>
					</div>
					<div className="col-lg-7">
						<div className="cs_pl_40">
							<div className="cs_section_heading cs_style_4 cs_mb_25">
								<h2
									className="cs_section_title cs_fs_32 cs_bold mb-0"
									dangerouslySetInnerHTML={{ __html: data.mapTitle }}
								></h2>
							</div>
							<ContactForm />

							<div className="cs_height_60 cs_height_lg_40" />
							<div className="cs_section_heading cs_style_4 cs_mb_25">
								<h2
									className="cs_section_title cs_fs_32 cs_bold mb-0"
									dangerouslySetInnerHTML={{ __html: data.sectionTitle }}
								></h2>
							</div>
							<ul className="cs_contact_info cs_mp_0">
								{data.contactList.map((item, index) => (
									<li key={index}>
										<p className="mb-0">{item.label}</p>
										<h4 className="mb-0 cs_fs_20 cs_bold">{item.value}</h4>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="cs_height_100 cs_height_lg_70" />
		</section>
	);
}
