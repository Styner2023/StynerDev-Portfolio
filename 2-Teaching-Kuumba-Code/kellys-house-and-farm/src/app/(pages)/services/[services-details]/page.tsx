/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import AOSInit from "@/app/helper/AosInit";
import {
	CardDataProps,
	MetaDataProps,
	ServiceDetailsProps,
	TestimonialDataProps,
	WorkingProcessDataProps,
} from "@/app/types";
import CardSection from "@/app/ui/CardSection";
import Footer2 from "@/app/ui/Footer/Footer2";
import Header2 from "@/app/ui/Header/Header2";
import ServiceDetailsSection from "@/app/ui/ServiceDetails";
import TestimonialSection1 from "@/app/ui/TestimonialSection/TestimonialSection1";
import WorkingProcess from "@/app/ui/WorkingProcess";

const serviceDetailsData: ServiceDetailsProps = {
	breadcrumb: [
		{ label: "Home", link: "/", active: false },
		{ label: "Services", link: "/services", active: false },
		{ label: "Details", link: "", active: true },
	],
	titleHighlight: "<span>GARDEN</span> DESIGN",
	video: {
		videoUrl: "https://www.youtube.com/embed/rRid6GCJtgc",
		backgroundImage: "/assets/img/video_block_bg_2.jpg",
	},
	cta: {
		title: "",
		buttonUrl: "/services",
		buttonText: "See More",
		backgroundImage: "/assets/img/cta_bg_4.jpg",
	},
	description: `
    Enhance your garden's allure with our Garden Design service. We will always meticulously plan and give landscape design solutions that create a more captivating ambiance, transforming your outdoor space into a magical haven of beauty and serenity. Whether you desire a tranquil retreat, a fun vibrant entertainment space, or heightened security, our garden designs cater to your specific needs. We ensure your garden comes alive with an enchanting glow, enhancing its aesthetics and functionality. <br><br>
            With a team of dedicated landscape architects and horticultural experts, we blend art and science to transform your outdoor space into a living masterpiece. We go beyond aesthetics, integrating sustainable practices, water-saving solutions, and eco-friendly choices to ensure your garden is as environmentally responsible as it is stunning. From the initial consultation to the final blossom, we are with you every step of the way, bringing your vision of dream garden to life expertly and efficiently.
  `,
	iconBoxes: [
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

const workingProcessData: WorkingProcessDataProps = {
	sectionTitle: "SIMPLE STEPS FOR OUR <span>LANDSCAPE</span> WORK",

	subtitle: "HOW IT WORKS",
	logo: "/assets/img/logo.svg",
	steps: [
		{
			title: "01 | Design consultation",
			description:
				"In the initial step, we sit down with you to have a detailed discussion about your gardening vision and preferences.",
		},
		{
			title: "02 | Design & planning",
			description:
				"Our team of experts meticulously crafts a custom garden design that aligns with your desires and your space characteristics.",
		},
		{
			title: "03 | Implement construction",
			description:
				"We present the design to you for review. Once approved, we move forward to implement the plan with construction.",
		},
		{
			title: "04 | Garden decorating",
			description:
				"With your design finalized, we put on our gardening gloves and work, creating your garden to be as beautiful as envisioned.",
		},
	],
};

const testimonialData: TestimonialDataProps = {
	sectionTitle: "TESTIMONIAL",
	testimonials: [
		{
			text: `Lekeisha's dedication to bringing our <span>vision</span> to life was exceptional. They turned our <span>backyard</span> into a haven of tranquility. Their attention to detail and sustainable practices on their design <span>impressed</span> us.`,
			img: "/assets/img/avatar.png",
			name: "MARIA HUGH",
			designation: "Marketing of Elston Company",
		},
		{
			text: `Lekeisha's dedication to bringing our <span>vision</span> to life was exceptional. They turned our <span>backyard</span> into a haven of tranquility. Their attention to detail and sustainable practices on their design <span>impressed</span> us.`,
			img: "/assets/img/avatar.png",
			name: "STEVE EVANS",
			designation: "CEO of Malley Company",
		},
		{
			text: `Lekeisha's dedication to bringing our <span>vision</span> to life was exceptional. They turned our <span>backyard</span> into a haven of tranquility. Their attention to detail and sustainable practices on their design <span>impressed</span> us.`,
			img: "/assets/img/avatar.png",
			name: "STEVE EVANS",
			designation: "CEO of Malley Company",
		},
	],
};

const cardData: CardDataProps = {
	title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
	buttonLink: "/services/services-details",
	backgroundImage: "/assets/img/card_bg_2.jpg",
	tags: ["Home", "Garden", "Landscape Design", "Expert"],
};

export const metadata: MetaDataProps = {
	title: "Service Details - Kelly’s House and Farm",
};

export default function ServiceDetailsPage() {
	return (
		<>
			<Header2 />
			<ServiceDetailsSection data={serviceDetailsData} />{" "}
			<WorkingProcess data={workingProcessData} />
			<TestimonialSection1 data={testimonialData} />
			<CardSection data={cardData} bgColor={"cs_color_1"} />
			<Footer2 />
			<AOSInit />
		</>
	);
}
