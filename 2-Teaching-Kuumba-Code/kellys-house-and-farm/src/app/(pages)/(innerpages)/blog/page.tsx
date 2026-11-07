/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	BlogDataProps,
	BreadCrumbsDataProps,
	CardDataProps,
	MetaDataProps,
	SidebarDataProps,
} from "@/app/types";
import BlogSection from "@/app/ui/BlogSection";
import CardSection from "@/app/ui/CardSection";
import PageHeading from "@/app/ui/PageHeading";
import Sidebar from "@/app/ui/Sidebar/Sidebar";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/about_heading_bg.jpg",
	title: "Latest Post",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Blog", link: "", active: true },
	],
};

const blogData: BlogDataProps = {
	posts: [
		{
			id: 1,
			image: "/assets/img/post_1.jpg",
			date: "07 Mar 2025",
			category: "Landscape",
			title: "Transform Yard with Expert Landscape Design Services",
			description:
				"Discover how professional garden landscape design can elevate your outdoor space, create functional areas, and bring your vision to life with expert craftsmanship and personalized solutions.",
			link: "/blog/transform-yard-with-expert-landscape-design-services",
		},
		{
			id: 2,
			image: "/assets/img/post_2.jpg",
			date: "04 Mar 2025",
			category: "Gardening",
			title: "How a Landscape Design Service Enhances Your Garden's Appeal",
			description:
				"Learn how a skilled landscape design service can improve your garden’s aesthetics, increase property value, and create a serene environment tailored to your style and needs.",
			link: "/blog/how-a-landscape-design-service-enhances-your-gardens-appeal",
		},
		{
			id: 3,
			image: "/assets/img/post_3.jpg",
			date: "02 Mar 2024",
			category: "Professional",
			title: "Benefits of Hiring a Professional Landscape Designer",
			description:
				"Explore the advantages of working with a professional designer, including unique designs, better planning, cost efficiency, and enhanced outdoor living spaces for your home or business.",
			link: "/blog/benefits-of-hiring-a-professional-landscape-designer",
		},
	],
	pagination: [1, 2, 3, 4],
};

const cardData: CardDataProps = {
	backgroundImage: "/assets/img/card_bg.jpg",
	tags: ["Home", "Garden", "Landscape Design", "Expert"],
	title: "MAKE YOUR DREAM <br /> GARDEN INTO REALITY",
	buttonLink: "/blog/blog-details",
};

const SidebarData: SidebarDataProps = {
	categoriesData: {
		category: "Categories",
		categories: [
			{ name: "Corporate", url: "/blog" },
			{ name: "Company", url: "/blog" },
			{ name: "Search Engine", url: "/blog" },
			{ name: "Information", url: "/blog" },
			{ name: "Painting", url: "/blog" },
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
			{ name: "Agency", url: "/blog" },
			{ name: "Artwork", url: "/blog" },
			{ name: "Marketing", url: "/blog" },
			{ name: "Information", url: "/blog" },
			{ name: "Design", url: "/blog" },
			{ name: "Wordpress", url: "/blog" },
		],
	},
};

export const metadata: MetaDataProps = {
	title: "Blogs - Kelly’s House and Farm",
};

export default function BlogPage() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<section>
				<div className="cs_height_100 cs_height_lg_70" />
				<div className="container">
					<div className="row">
						<BlogSection data={blogData} />
						<Sidebar data={SidebarData} />
					</div>
				</div>
				<div className="cs_height_100 cs_height_lg_70" />
			</section>
			<CardSection data={cardData} />
		</>
	);
}
