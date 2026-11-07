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
import GiveOptions, { GiveOption } from "./GiveOptions";

const data: FooterDataProps = {
	logo: "/assets/img/footer_logo.svg",
	newsletterText:
		"Restore the land. Preserve the story. <br /> Grow food. Feed community.",
	menus: [
		{
			title: "THE GARDEN",
			links: [
				{ label: "OUR STORY", url: "/#story" },
				{ label: "THE GARDEN NOW", url: "/#garden-now" },
				{ label: "WHAT COMES NEXT", url: "/#next" },
			],
		},
		{
			title: "GROWING",
			links: [
				{ label: "YEARS OF GROWING", url: "/#growing" },
				{ label: "IN KEISHA’S WORDS", url: "/#keishas-words" },
				{ label: "FROM THE HARVEST", url: "/#harvest" },
			],
		},
	],
	copyright: "© 2026 KELLY’S HOUSE AND FARM. ALL RIGHTS RESERVED.",
	bottomLinks: [],
};

// The SUPPORT column's pill buttons. Fill in PayPal's link
// (https://paypal.me/…) and the Zelle email or phone when we have them.
const giveOptions: GiveOption[] = [
	{ label: "Venmo", url: "https://account.venmo.com/u/Lekeisha-Simpson" },
	{ label: "PayPal", url: "" },
	{ label: "Zelle", copy: "" },
];

export default function Footer1() {
	return (
		<footer className={`cs_footer cs_style_1 `}>
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

					<div className="cs_footer_col">
						<div className="cs_footer_widget">
							<h4 className="cs_footer_widget_title">SUPPORT</h4>
							<GiveOptions options={giveOptions} />
						</div>
					</div>
				</div>

				<div className="cs_bottom_footer">
					<div className="cs_bottom_footer_left">
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
