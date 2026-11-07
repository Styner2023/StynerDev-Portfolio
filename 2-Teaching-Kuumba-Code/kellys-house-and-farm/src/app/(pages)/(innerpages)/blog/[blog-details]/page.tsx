/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BlogDetailsDataProps,
	BreadCrumbsDataProps,
	CardDataProps,
	MetaDataProps,
	SidebarDataProps,
} from "@/app/types";
import BlogDetailsSection from "@/app/ui/BlogsDetails";
import CardSection from "@/app/ui/CardSection";
import PageHeading from "@/app/ui/PageHeading";
import Sidebar from "@/app/ui/Sidebar/Sidebar";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/about_heading_bg.jpg",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Blog Details", link: "", active: true },
	],
	title: "Transform Yard with Expert Landscape Design Services",
};

const SidebarData: SidebarDataProps = {
	categoriesData: {
		category: "Categories",
		categories: [
			{ name: "Corporate", url: "/category/corporate" },
			{ name: "Company", url: "/category/company" },
			{ name: "Search Engine", url: "/category/search-engine" },
			{ name: "Information", url: "/category/information" },
			{ name: "Painting", url: "/category/painting" },
		],
	},

	recentPostsData: {
		recentPost: "Recent Posts",
		recentPosts: [
			{
				title: "How to studio setup...",
				date: "15 Aug 2022",
				image: "/assets/img/post_1.jpg",
				url: "/blog/how-to-studio-setup",
			},
			{
				title: "Creative people mind...",
				date: "15 Aug 2022",
				image: "/assets/img/post_2.jpg",
				url: "/blog/creative-people-mind",
			},
			{
				title: "AI take over human...",
				date: "15 Aug 2022",
				image: "/assets/img/post_3.jpg",
				url: "/blog/ai-takeover-human",
			},
		],
	},

	archivesData: {
		archive: "Archives",
		archives: [
			{ name: "Archives", url: "/archives" },
			{ name: "15 Aug 2025", url: "/archives/2025-08-15" },
			{ name: "20 Sep 2024", url: "/archives/2024-09-20" },
			{ name: "11 Dec 2023", url: "/archives/2023-12-11" },
			{ name: "25 Jun 2022", url: "/archives/2022-06-25" },
		],
	},

	tagsData: {
		tag: "Tags",
		tags: [
			{ name: "Business", url: "/blog" },
			{ name: "Agency", url: "/tag/agency" },
			{ name: "Artwork", url: "/tag/artwork" },
			{ name: "Marketing", url: "/tag/marketing" },
			{ name: "Information", url: "/tag/information" },
			{ name: "Design", url: "/tag/design" },
			{ name: "Wordpress", url: "/tag/wordpress" },
		],
	},
};

const blogData: BlogDetailsDataProps = {
	postThumb: "/assets/img/post_1.jpg",
	date: "07 Mar 2022",
	category: { title: "Tach", url: "/" },

	title: "Transform Your Yard with Expert Landscape Design Services",
	content: [
		{
			type: "p",
			text: `Your yard is more than just an outdoor space; it's an extension of your home and lifestyle. Whether you have a small garden, a sprawling lawn, or a cozy patio, a well-designed landscape can completely transform the way you experience your outdoor environment. Expert landscape design services can turn your yard into a beautiful, functional, and inviting space, tailored to suit your needs, preferences, and the local climate. <br/> In this blog, we'll explore how professional landscape designers can help you achieve the yard of your dreams, from initial consultation to final touches.`,
		},
		{
			type: "blockquote",
			quote: `A well-designed landscape is more than just a beautiful yard; it’s an investment in your home’s value, functionality, and your overall lifestyle. Expert landscape design services bring your vision to life, creating an outdoor space that is both stunning and practical for years to come.`,
			author: "Loren Mulari",
		},
		{
			type: "p",
			text: `It might seem like a landscape design service is an added expense, but in reality, it can save you time and money in the long run. A professional designer knows how to plan and execute your vision efficiently, ensuring that you avoid costly mistakes such as planting the wrong plants, choosing inappropriate materials, or overdesigning your space.`,
		},
	],
	images: ["/assets/img/post_2.jpg", "/assets/img/post_3.jpg"],
	sections: [
		{
			heading: "Personalized Designs for Every Style and Need",
			paragraph: `A professional landscape designer brings a wealth of knowledge and creativity to the table. They will work closely with you to understand your vision, needs, and lifestyle. Whether you're looking for a tranquil retreat, a space for family gatherings, or a low-maintenance garden, an expert designer can craft a personalized landscape plan that aligns with your goals.<br/>
Landscape designers consider various elements like color schemes, textures, plant selection, and layout to create a harmonious design that reflects your style. They can incorporate features such as garden paths, water elements, outdoor lighting, and even edible plants, giving your yard a unique, personalized touch.`,
		},
		{
			heading: "Maximize Space and Functionality",
			paragraph: `One of the main advantages of hiring a landscape designer is their ability to maximize the potential of your yard. No matter the size or shape of your outdoor space, an expert can design it to be both aesthetically pleasing and functional. They can transform even the smallest yard into a cozy retreat or optimize a large lawn to include areas for entertaining, gardening, or relaxation.`,
		},
	],
	videoUrl: "https://www.youtube.com/embed/uqWykluW2e4",
	closingParagraph: `Professional landscape design services take into account how you'll use the space. For example, if you enjoy outdoor dining or entertaining, they can create an inviting patio or outdoor kitchen area. If you have children or pets, they can design a safe and engaging play area. A designer can also create zones for different activities, ensuring that every inch of your yard serves a purpose.`,

	property: {
		title: "Increase Property Value",
		description: `A well-designed landscape is not only beautiful but also adds significant value to your property. Curb appeal plays a crucial role in a home's first impression, and a lush, thoughtfully designed yard can elevate the overall appeal of your home. Whether you're planning to sell or just want to enhance the long-term investment, a professional landscape design can help increase your property’s value. Landscape designers know what plants, materials, and designs work best for your local environment, ensuring that your yard remains beautiful and sustainable for years to come. A beautifully landscaped yard will attract more potential buyers if you're selling your home, making it a valuable investment.`,
	},

	formTitle: "Leave A Reply",
	formNote:
		"Your email address will not be published. Required fields are marked *",
};

const cardData: CardDataProps = {
	backgroundImage: "/assets/img/card_bg.jpg",
	tags: ["Home", "Garden", "Landscape Design", "Expert"],
	title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
	buttonLink: "/blog/blog-details",
};

export const metadata: MetaDataProps = {
	title: "Blog Details - Kelly’s House and Farm",
};

export default function BlogDetailsPage() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<section>
				<div className="cs_height_100 cs_height_lg_70" />
				<div className="container">
					<div className="row">
						<BlogDetailsSection data={blogData} />
						<Sidebar data={SidebarData} />
					</div>
				</div>
				<div className="cs_height_100 cs_height_lg_70" />
			</section>

			<CardSection data={cardData} />
		</>
	);
}
