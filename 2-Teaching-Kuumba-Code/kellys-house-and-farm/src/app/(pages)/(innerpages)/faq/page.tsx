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
	FaqDataProps,
	MetaDataProps,
} from "@/app/types";
import AccordionSection2 from "@/app/ui/Accordion/AccordionSection2";
import CardSection from "@/app/ui/CardSection";
import PageHeading from "@/app/ui/PageHeading";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/about_heading_bg.jpg",
	title: "FAQs",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "FAQ", link: "", active: true },
	],
};

const cardData: CardDataProps = {
	backgroundImage: "/assets/img/card_bg.jpg",
	tags: ["Home", "Garden", "Landscape Design", "Expert"],
	title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
	buttonLink: "/projects",
};

const faqData: FaqDataProps = {
	sectionTitle: "GARDEN <span>DESIGN</span>",
	image: "/assets/img/faq_img.jpg",
	subtitle: "",
	highlightedText: "",
	items: [
		{
			question: "What is the process for getting a garden design?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question: "How long does it take to complete a garden design project?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question:
				"Do you offer maintenance services after the garden is installed?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question:
				"Can I incorporate sustainability values into my garden design?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
	],
};

const faqData2: FaqDataProps = {
	sectionTitle: "LANDSCAPE <span>DESIGN</span>",
	image: "/assets/img/faq_img_2.jpg",
	subtitle: "",
	highlightedText: "",
	items: [
		{
			question: "What is the process for getting a garden design?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question: "How long does it take to complete a garden design project?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question:
				"Do you offer maintenance services after the garden is installed?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
		{
			question:
				"Can I incorporate sustainability values into my garden design?",
			answer:
				"The timeline varies based on the project's complexity and size. Small projects may take a few weeks, while larger ones could take a few months. During the consultation, we will provide a more accurate estimate. We will design garden based on your own needs, budget, and time constraints.",
		},
	],
};

export const metadata: MetaDataProps = {
	title: "Faq - Kelly’s House and Farm",
};

export default function FaqPage() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<div className="cs_height_100 cs_height_lg_70" />
			<AccordionSection2 data={faqData} />
			<div className="cs_height_100 cs_height_lg_70" />
			<AccordionSection2 data={faqData2} />
			<div className="cs_height_100 cs_height_lg_70" />
			<CardSection data={cardData} />
		</>
	);
}
