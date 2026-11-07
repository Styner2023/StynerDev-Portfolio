/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BreadCrumbsDataProps,
	MetaDataProps,
	ProjectDetailsDataProps,
	ServiceDataProps,
} from "@/app/types";
import PageHeading from "@/app/ui/PageHeading";
import ProjectDetailsSection from "@/app/ui/ProjectDetails";
import RelatedProject from "@/app/ui/RelatedProject/RelatedProject";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/project_heading_bg.jpg",
	title: "EVENING GARDEN",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Evening garden", link: "", active: true },
	],
};

const projectDetailsData: ProjectDetailsDataProps = {
	projectInfo: [
		{ label: "YEAR", value: "2024" },
		{ label: "LOCATION", value: "SUNNYVALE, CA" },
		{ label: "SERVICE", value: "GARDEN LANDSCAPING" },
	],
	video: {
		videoUrl: "https://www.youtube.com/embed/rRid6GCJtgc",
		backgroundImage: "/assets/img/video_block_bg_2.jpg",
	},
	sliderImages: [
		"/assets/img/project_thumb_10.jpg",
		"/assets/img/project_thumb_10.jpg",
		"/assets/img/project_thumb_10.jpg",
	],
	description: `Tucked behind an old Japanese estate, this garden design evokes
    the charm of a hidden garden. The lighting design enhances the
    feeling of discovery, revealing unexpected beauty at every turn.
    It's a garden where every night feels like an adventure.`,
	outcomes: `With a team of dedicated landscape architects and horticultural
    experts, we blend art and science to transform your outdoor space
    into a living masterpiece. We go beyond aesthetics, integrating
    sustainable practices, water-saving solutions, and eco-friendly
    choices to ensure your garden is as environmentally responsible as
    it is stunning. From the initial consultation to the final
    blossom, we are with you every step of the way, bringing your
    vision of dream garden to life expertly and efficiently.`,
	features: [
		{
			iconClass: "fa6-solid:hand-holding-droplet",
			title: "Customized Garden Designs",
		},
		{
			iconClass: "fa6-solid:utensils",
			title: "Guaranteed Maintenance Plans",
		},
		{ iconClass: "fa6-solid:vials", title: "Soil Testing and Improvement" },
		{
			iconClass: "fa6-solid:feather",
			title: "Hardscape and Aquascape Feature",
		},
		{
			iconClass: "fa6-solid:seedling",
			title: "Plant Selection and Installation",
		},
		{
			iconClass: "fa6-solid:handshake",
			title: "Sustainable Eco-Friendly Options",
		},
	],
};

const serviceData: ServiceDataProps = {
	title: "CHOOSE OUR <br /> SPECIAL <span>SERVICES</span>",
	highlightedText: "SERVICES",

	service: [
		{
			title: "HOME GARDEN",
			subtitle:
				"Crafting the perfect garden space for your home. Whether indoor or outdoor, we got it all ready for your greenery needs.",
			image: "/assets/img/project_thumb_1.jpg",
			link: "/services/home-garden",
			tags: [
				{ label: "Home", url: "/" },
				{ label: "Garden", url: "/" },
				{ label: "Landscape Design", url: "/" },
				{ label: "Expert", url: "/" },
			],
			description: "",
		},
		{
			title: "PLANT SELECTION",
			subtitle:
				"Crafting the perfect garden space for your home. Whether indoor or outdoor, we got it all ready for your greenery needs.",
			image: "/assets/img/project_thumb_2.jpg",
			link: "/services/plant-selection",
			tags: [
				{ label: "Home", url: "/" },
				{ label: "Garden", url: "/" },
				{ label: "Landscape Design", url: "/" },
				{ label: "Expert", url: "/" },
			],
			description: "",
		},
		{
			title: "HARD SCAPING",
			subtitle:
				"Crafting the perfect garden space for your home. Whether indoor or outdoor, we got it all ready for your greenery needs.",
			image: "/assets/img/project_thumb_3.jpg",
			link: "/services/hard-scaping",
			tags: [
				{ label: "Home", url: "/" },
				{ label: "Garden", url: "/" },
				{ label: "Landscape Design", url: "/" },
				{ label: "Expert", url: "/" },
			],
			description: "",
		},
		{
			title: "PUBLIC GARDEN",
			subtitle:
				"Crafting the perfect garden space for your home. Whether indoor or outdoor, we got it all ready for your greenery needs.",
			image: "/assets/img/project_thumb_4.jpg",
			link: "/services/public-garden",
			tags: [
				{ label: "Home", url: "/" },
				{ label: "Garden", url: "/" },
				{ label: "Landscape Design", url: "/" },
				{ label: "Expert", url: "/" },
			],
			description: "",
		},
	],
};

export const metadata: MetaDataProps = {
	title: "Project Details - Kelly’s House and Farm",
};

export default function ProjectDetailsPage() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<ProjectDetailsSection data={projectDetailsData} />
			<RelatedProject data={serviceData} />
		</>
	);
}
