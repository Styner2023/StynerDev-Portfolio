/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	AboutUsDataProps,
	BrandDataProps,
	BreadCrumbsDataProps,
	CardDataProps,
	FeatureDataProps,
	MetaDataProps,
	TeamMembersDataProps,
	ValueDataProps,
	WorksTwoDataProps,
} from "@/app/types";
import AboutUsSection from "@/app/ui/Aboutus";
import BrandSection from "@/app/ui/BrandSection";
import CardSection from "@/app/ui/CardSection";
import FeatureSection from "@/app/ui/FeatureSection";
import PageHeading from "@/app/ui/PageHeading";
import TeamMemberSection from "@/app/ui/Team";
import ValueSection from "@/app/ui/ValueSection";
import WorkSection1 from "@/app/ui/WorksSection/WorkSection1";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/about_heading_bg.jpg",
	title: "ABOUT US",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "About", link: "", active: true },
	],
};

const aboutUsData: AboutUsDataProps = {
	title: `CRAFTING <br><span>DREAM GARDENS</span> <br>INTO REALITY`,

	introduction:
		"At Kelly’s House and Farm, we are passionate about transforming outdoor spaces into breathtaking gardens that tell a unique story. Our journey began over a decade ago, driven by a shared love for nature",
	introduction1:
		"and design. Since then, we have dedicated ourselves to creating gardens that enhance your property. Our solid commitment to sustainability, innovation, and collaboration has been the foundation of our success.",

	video: {
		videoUrl: "https://www.youtube.com/embed/rRid6GCJtgc",
		backgroundImage: "/assets/img/video_block_bg.jpg",
	},
	cta: {
		backgroundImage: "/assets/img/cta_bg_3.jpg",
		buttonUrl: "/projects",
		buttonText: "Explore Projects",
		title: "",
	},
};

const valueData: ValueDataProps = {
	sectionTitle: "VALUES",
	values: [{ text: "Landscape Design" }, { text: "Indoor Garden" }],
};

const featureData: FeatureDataProps = {
	sectionTitle: "WE ARE <span>DIFFERENT</span> IN EVERY WAYS",
	buttonText: "Get Started",
	buttonUrl: "/services",
	image: "/assets/img/feature_thumb.jpg",
	features: [
		{
			icon: "fa6-regular:heart",
			title: "Passion in every work",
			description:
				"We are deeply passionate about creating beautiful, sustainable green landscapes for our clients.",
		},
		{
			icon: "fa6-solid:link",
			title: "Collaboration on top",
			description:
				"We make your dream design come true by combining your ideas with our 10+ years of garden design expertise.",
		},
		{
			icon: "fa6-solid:layer-group",
			title: "Sustainability in check",
			description:
				"We love nurturing nature, one garden at a time, so that you can enjoy the beautiful landscape of our garden even longer.",
		},
		{
			icon: "fa6-brands:ubuntu",
			title: "Creativity unleashed",
			description:
				"We make sure to only give you our innovative designs that stand out to make sure that your garden is not like the others.",
		},
	],
};

const teamMembersData: TeamMembersDataProps = {
	title: `OUR TEAM <br><span>OF</span> DEDICATION`,
	subtitle: "WORKS",
	teamMembers: [
		{
			img: "/assets/img/team_member_1.jpg",
			name: "Sarah Turner",
			role: "Founder & Lead Designer",
			description: "Experienced in 10 years of Garden Landscape design.",
		},
		{
			img: "/assets/img/team_member_2.jpg",
			name: "John Mason",
			role: "Landscape Architect",
			description: "Experienced in 10 years of Garden Landscape design.",
		},
		{
			img: "/assets/img/team_member_3.jpg",
			name: "Emily Parker",
			role: "Horticulture Expert",
			description: "Experienced in 10 years of Garden Landscape design.",
		},
		{
			img: "/assets/img/team_member_4.jpg",
			name: "David Anderson",
			role: "Team Project Manager",
			description: "Experienced in 10 years of Garden Landscape design.",
		},
		{
			img: "/assets/img/team_member_2.jpg",
			name: "John Mason",
			role: "Landscape Architect",
			description: "Experienced in 10 years of Garden Landscape design.",
		},
	],
};

const brandLogos: BrandDataProps = {
	brands: [
		"/assets/img/brand_logo_1.svg",
		"/assets/img/brand_logo_2.svg",
		"/assets/img/brand_logo_3.svg",
		"/assets/img/brand_logo_4.svg",
		"/assets/img/brand_logo_5.svg",
		"/assets/img/brand_logo_6.svg",
		"/assets/img/brand_logo_3.svg",
	],
};

const worksData: WorksTwoDataProps = {
	title: "OUR <span>WORK</span>",
	subtitle: "GALLERY",
	galleryItems: [
		{
			imgSrc: "/assets/img/work_thumb_1.jpg",
			title: "Gallery A",
			year: "2024",
			height: "694px",
		},
		{
			imgSrc: "/assets/img/work_thumb_2.jpg",
			title: "Gallery B",
			year: "2024",
			height: "287px",
		},
		{
			imgSrc: "/assets/img/work_thumb_2.jpg",
			title: "Gallery B",
			year: "2024",
			height: "383px",
		},
		{
			imgSrc: "/assets/img/work_thumb_4.jpg",
			title: "Gallery D",
			year: "2024",
			height: "480px",
		},
		{
			imgSrc: "/assets/img/work_thumb_5.jpg",
			title: "Gallery E",
			year: "2024",
			height: "190px",
		},
	],
};

const cardData: CardDataProps = {
	backgroundImage: "/assets/img/card_bg.jpg",
	tags: ["Home", "Garden", "Landscape Design", "Expert"],
	title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
	buttonLink: "/projects",
};

export const metadata: MetaDataProps = {
	title: "About Us - Kelly’s House and Farm",
};

export default function AboutPage() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<AboutUsSection data={aboutUsData} />
			<div className="cs_heading_bg cs_white_color">
				<ValueSection data={valueData} />
				<FeatureSection data={featureData} />
			</div>
			<TeamMemberSection data={teamMembersData} />
			<BrandSection data={brandLogos} />
			<WorkSection1 data={worksData} />
			<CardSection data={cardData} />
		</>
	);
}
