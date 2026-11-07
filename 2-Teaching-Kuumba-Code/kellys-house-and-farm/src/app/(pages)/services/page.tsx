/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BreadCrumbsDataProps,
	CTADataProps,
	MetaDataProps,
	ServiceTwoDataProps,
} from "@/app/types";
import CtaSection from "@/app/ui/CTASection/CtaSection";
import Footer1 from "@/app/ui/Footer/Footer1";
import Header from "@/app/ui/Header/Header";
import PageHeading from "@/app/ui/PageHeading";
import ServiceSection1 from "@/app/ui/ServicesSection/ServiceSection1";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/service_heading_bg.jpg",
	title: "OUR SERVICES",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Services", link: "", active: true },
	],
};

const servicesData: ServiceTwoDataProps[] = [
	{
		title: "GARDEN DESIGN",
		description:
			"Crafting the perfect garden space. We will design a garden that suits your lifestyle and enhances your property's beauty.",
		image: "/assets/img/project_thumb_1.jpg",
		link: "/services/services-details",
	},
	{
		title: "PLANT SELECTION",
		description:
			"Hand-picked greenery for your oasis. Our experts select the right plants, ensuring they thrive in your garden's unique conditions.",
		image: "/assets/img/project_thumb_2.jpg",
		link: "/services/services-details",
	},
	{
		title: "HARDSCAPING",
		description:
			"Adding structure to your landscape. We create functional and aesthetic hardscape features like patios, walkways, and retaining walls.",
		image: "/assets/img/project_thumb_3.jpg",
		link: "/services/services-details",
	},
	{
		title: "GARDEN MAINTENANCE",
		description:
			"Preserving your garden's allure. We offer ongoing maintenance services to ensure your garden looks its best year-round.",
		image: "/assets/img/project_thumb_4.jpg",
		link: "/services/services-details",
	},
	{
		title: "AQUASCAPE INSTALLATION",
		description:
			"Enhance the serenity of your garden with captivating water features like fountains, ponds, and waterfalls for the soothing sound of water.",
		image: "/assets/img/project_thumb_5.jpg",
		link: "/services/services-details",
	},
	{
		title: "GARDEN MAINTENANCE",
		description:
			"Preserving your garden's allure. We offer ongoing maintenance services to ensure your garden looks its best year-round.",
		image: "/assets/img/project_thumb_6.jpg",
		link: "/services/services-details",
	},
];

const ctaData: CTADataProps = {
	backgroundImage: "/assets/img/cta_bg_2.jpg",
	title: "READY TO DESIGN YOUR GARDEN?",
	buttonText: "Contact Us",
	buttonUrl: "/contact",
};

export const metadata: MetaDataProps = {
	title: "Services - Kelly’s House and Farm",
};

export default function ServicePage() {
	return (
		<>
			<Header />
			<PageHeading data={BreadcrumbsData} />
			<ServiceSection1 data={servicesData} />
			<CtaSection data={ctaData} />
			<Footer1 />
		</>
	);
}
