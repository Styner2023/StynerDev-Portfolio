/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BreadCrumbsDataProps,
	CardDataProps,
	ContractDataProps,
	MetaDataProps,
} from "@/app/types";
import CardSection from "@/app/ui/CardSection";
import ContactSection from "@/app/ui/Contact";
import PageHeading from "@/app/ui/PageHeading";

export const metadata: MetaDataProps = {
	title: "Contact - Kelly’s House and Farm",
};

export default function ContactPage() {
	const BreadcrumbsData: BreadCrumbsDataProps = {
		backgroundImage: "/assets/img/about_heading_bg.jpg",
		title: "CONTACT US",
		breadcrumbs: [
			{ label: "Home", link: "/", active: false },
			{ label: "Contact", link: "", active: true },
		],
	};

	const contactData: ContractDataProps = {
		mapTitle: "SEND US A <span>MESSAGE</span>",
		sectionTitle: "GET IN <span>TOUCH</span>",
		contactList: [
			{
				label: "EMAIL",
				value: "hello@yourdomain.com",
			},
			{
				label: "LOCATION",
				value: "+123 456 7890",
			},
			{
				label: "ADDRESS",
				value: "123 Any Where St, Any City, Any State",
			},
		],
		locationUrl:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96652.27317354927!2d-74.33557928194516!3d40.79756494697628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3a82f1352d0dd%3A0x81d4f72c4435aab5!2sTroy+Meadows+Wetlands!5e0!3m2!1sen!2sbd!4v1563075599994!5m2!1sen!2sbd",
	};

	const cardData: CardDataProps = {
		backgroundImage: "/assets/img/card_bg.jpg",
		tags: ["Home", "Garden", "Landscape Design", "Expert"],
		title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
		buttonLink: "/projects",
	};

	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<ContactSection data={contactData} />
			<CardSection data={cardData} />
		</>
	);
}
