/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { FooterDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import FooterForm from "../Forms/FooterForm";

const data: FooterDataProps = {
	logo: "/assets/img/footer_logo.svg",
	newsletterText:
		" Stay updated with our latest <br /> projects and gardening tips.",
	menus: [
		{
			title: "SUPPORT",
			links: [
				{ label: "FAQ", url: "/faq" },
				{ label: "CONTACT", url: "/contact" },
				{ label: "SERVICES", url: "/services" },
			],
		},
		{
			title: "LINKS",
			links: [
				{ label: "ABOUT US", url: "/about" },
				{ label: "GALLERY", url: "/gallery" },
				{ label: "PROJECTS", url: "/projects" },
				{ label: "BLOG", url: "/blog" },
			],
		},
		{
			title: "SERVICES",
			links: [
				{ label: "HOME GARDEN", url: "/services/home-garden" },
				{ label: "PLANT SELECTION", url: "/services/plant-selection" },
				{ label: "HARDSCAPING", url: "/services/hardscaping" },
				{ label: "PUBLIC GARDEN", url: "/services/public-garden" },
			],
		},
	],
	copyright: "© 2026 KELLY’S HOUSE AND FARM. ALL RIGHTS RESERVED.",
	bottomLinks: [
		{ label: "PRIVACY POLICY", url: "/privacy-policy" },
		{ label: "TERMS & CONDITION", url: "/terms-and-condition" },
	],
};

export default function Footer2() {
	return (
		<footer className={`cs_footer cs_style_1 cs_color_2`}>
			<div className="container">
				<div className="cs_footer_row">
					<div className="cs_footer_col">
						<div className="cs_footer_widget">
							<div className="cs_text_widget">
								<Image
									data-aos="zoom-in"
									src={data.logo}
									alt="Kelly’s House and Farm"
									width={232}
									height={52}
									className="wow zoomIn object-contain"
								/>
								<p>{parser(data.newsletterText)}</p>
							</div>
						</div>
						<div className="cs_footer_widget">
							<FooterForm />
						</div>
					</div>

					{data.menus.map((menu, i) => (
						<div className="cs_footer_col" key={i}>
							<div className="cs_footer_widget">
								<h4 className="cs_footer_widget_title">{menu.title}</h4>
								<ul className="cs_footer_widget_menu cs_mp_0">
									{menu.links.map((link, index) => (
										<li key={index}>
											<Link href={link.url}>{link.label}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				<div className="cs_bottom_footer">
					<div className="cs_bottom_footer_left ">
						<div
							className="cs_copyright"
							dangerouslySetInnerHTML={{ __html: data.copyright }}
						></div>
					</div>
					<div className="cs_bottom_footer_right">
						<ul className="cs_footer_links cs_mp_0">
							{data.bottomLinks.map((link, i) => (
								<li key={i}>
									<Link href={link.url}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
