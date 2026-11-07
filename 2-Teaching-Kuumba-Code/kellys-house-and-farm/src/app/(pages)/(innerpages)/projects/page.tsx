/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BreadCrumbsDataProps,
	CardOneDataProps,
	FaqDataProps,
	InfoDataProps,
	MetaDataProps,
} from "@/app/types";
import AccordionSection from "@/app/ui/Accordion";
import CardSection1 from "@/app/ui/CardSection/CardSection1";
import InfoList from "@/app/ui/InfoSection";
import PageHeading from "@/app/ui/PageHeading";
import ProjectSlider from "@/app/ui/ProjectsSection/ProjectSlider";

export const metadata: MetaDataProps = {
	title: "Projects - Kelly’s House and Farm",
};

export default function ProjectPage() {
	const BreadcrumbsData: BreadCrumbsDataProps = {
		backgroundImage: "/assets/img/project_heading_bg.jpg",
		title: "OUR PROJECTS",
		breadcrumbs: [
			{ label: "Home", link: "/", active: false },
			{ label: "Project", link: "", active: true },
		],
	};

	const infoData: InfoDataProps = {
		imageSrc: "/assets/img/project_thumb_10.jpg",
		projectUrl: "/projects/project-details",
		title: "EVENING GARDEN",
		info: [
			{ label: "YEAR", value: "2024" },
			{ label: "LOCATION", value: "SUNNYVALE, CA" },
			{ label: "SERVICE", value: "GARDEN LANDSCAPING" },
		],
	};

	const infoData1: InfoDataProps = {
		imageSrc: "/assets/img/project_thumb_12.jpg",
		projectUrl: "/projects/project-details",
		title: "EVENING GARDEN",
		info: [
			{ label: "YEAR", value: "2024" },
			{ label: "LOCATION", value: "ASHVILLE, NC" },
			{ label: "SERVICE", value: "EVENT GARDEN DESIGN" },
		],
	};

	const cardData: CardOneDataProps = {
		imageSrc: "/assets/img/project_thumb_11.jpg",
		projectUrl: "/projects/project-details",
		title: "SECRET GARDEN",
		info: [
			{ label: "YEAR", value: "2024" },
			{ label: "LOCATION", value: "CHARLESTON, SC" },
			{ label: "SERVICE", value: "PUBLIC GARDEN DESIGN" },
		],
		descriptionTitle: "DESCRIPTION",
		descriptionText:
			"Tucked behind an old Japanese estate, this garden design evokes the charm of a hidden garden. The lighting design enhances the feeling of discovery, revealing unexpected beauty at every turn. It's a garden where every night feels like an adventure.",
		outcomesTitle: "OUTCOMES",
		outcomesText:
			"The charm of a hidden garden <br> Oriental sense of discovery <br> Every step feels like an adventure",
	};

	const projectData: InfoDataProps[] = [
		{
			title: "EVENING GARDEN",
			imageSrc: "/assets/img/project_thumb_10.jpg",
			projectUrl: "/projects/project-details",
			imageAlt: "GARDEN LANDSCAPING",
			info: [
				{ label: "YEAR", value: "2023" },
				{ label: "LOCATION", value: "SUNNYVALE, CA" },
				{ label: "SERVICE", value: "GARDEN LANDSCAPING" },
			],
		},
		{
			title: "GREEN DISPLAY GARDEN",
			imageSrc: "/assets/img/project_thumb_12.jpg",
			projectUrl: "/projects/project-details",
			imageAlt: "MINIMALIST GARDEN",
			info: [
				{ label: "YEAR", value: "2023" },
				{ label: "LOCATION", value: "BROOKLYN, NY" },
				{ label: "SERVICE", value: "EVENT GARDEN DESIGN" },
			],
		},
	];

	const faqData: FaqDataProps = {
		sectionTitle: "FREQUENTLY <br><span>ASKED</span> QUESTIONS",
		highlightedText: "ASKED",
		subtitle: "F.A.Q",
		image: "/assets/img/faq_img.jpg",
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

	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<InfoList data={infoData} />
			<CardSection1 data={cardData} />
			<InfoList data={infoData1} />
			<hr />
			<ProjectSlider data={projectData} />
			<div className="cs_height_100 cs_height_lg_70" />
			<AccordionSection data={faqData} />
		</>
	);
}
