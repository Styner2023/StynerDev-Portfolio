/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

// types.ts
import { ReactNode } from "react";

export interface GlobalChildrenProps {
	children: ReactNode;
}

export interface AboutUsDataProps {
	title: string;
	subtitle?: string;
	introduction: string;
	introduction1: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	video: VideoDataProps;
	cta?: CTADataProps;
}

export interface BreadCrumbsDataProps {
	backgroundImage: string;
	title: string;
	breadcrumbs: BreadCrumbsLinkItems[];
}

export interface BreadCrumbsLinkItems {
	label: string;
	link: string;
	active: boolean;
}

export interface BrandDataProps {
	brands: string[];
}

export interface BlogPostItem {
	id: number;
	image: string;
	date: string;
	category: string;
	title: string;
	description: string;
	link: string;
}

export interface BlogDataProps {
	posts: BlogPostItem[];
	pagination: number[];
}

export interface BlogDetailsDataProps {
	postThumb: string;
	date: string;
	category: {
		title: string;
		url: string;
	};
	title: string;
	content: {
		type?: string;
		text?: string;
		quote?: string;
		author?: string;
	}[];
	images: string[];
	sections: {
		heading: string;
		paragraph: string;
	}[];
	videoUrl: string;
	closingParagraph: string;
	property: {
		title: string;
		description: string;
	};
	formTitle: string;
	formNote: string;
}

// CTA Section Data Type
export interface CTADataProps {
	backgroundImage: string;
	title: string;
	subtitle?: string;
	buttonText: string;
	buttonUrl: string;
}

export interface CardDataProps {
	title: string;
	buttonLink: string;
	backgroundImage: string;
	tags: string[];
}

export interface CardOneDataProps {
	imageSrc: string;
	projectUrl: string;
	title: string;
	info: {
		label: string;
		value: string;
	}[];
	descriptionTitle: string;
	descriptionText: string;
	outcomesTitle: string;
	outcomesText: string;
}

export interface ContractDataProps {
	mapTitle: string;
	sectionTitle: string;
	contactList: {
		label: string;
		value: string;
	}[];
	locationUrl: string;
}

export interface ErrorPageDataProps {
	title: string;
	subtitle: string;
	message: string;
}

// Types for state variables ForgotPasswordFormData
export interface ForgotPasswordFormData {
	email: string;
	remember: boolean;
	error: string;
}

// Feature Section Data Type
export interface FeatureDataProps {
	sectionTitle: string;
	buttonText: string;
	buttonUrl: string;
	image: string;
	imageAlt?: string;
	// Intrinsic size of `image`, so the page reserves the right height before it loads.
	imageWidth?: number;
	imageHeight?: number;
	features: {
		icon: string;
		title: string;
		description: string;
	}[];
}

// Faq/Accordion Section Data type
export interface FaqDataProps {
	sectionTitle: string;
	image: string;
	highlightedText?: string;
	subtitle: string;
	items: {
		question: string;
		answer: string;
	}[];
}

export interface FooterLinkItem {
	label: string;
	url: string;
}

export interface FooterMenu {
	title: string;
	links: FooterLinkItem[];
}

export interface FooterDataProps {
	logo: string;
	newsletterText: string;
	menus: FooterMenu[];
	copyright: string;
	bottomLinks: FooterLinkItem[];
}

export interface GalleryDataProps {
	imgSrc: string;
	title: string;
	year: string;
	height: string;
}

// Hero Section Data Type
export interface HeroDataProps {
	title: string;
	subtitle: string;
	btnText1: string;
	btnUrl1: string;
	btnText2: string;
	btnUrl2: string;
	funfact: {
		number: string;
		text: string;
	};
	box: {
		title: string;
		subtitle: string;
		link: string;
	};
	backgrounds: {
		src: string;
		/** CSS object-position, for photos whose subject is off-centre. */
		position?: string;
	}[];
}

export interface InfoDataProps {
	imageSrc: string;
	imageAlt?: string;
	projectUrl: string;
	title: string;
	info: {
		label: string;
		value: string;
	}[];
}

// Type for state variables LoginFormData
export interface LoginFormData {
	email: string;
	password: string;
	remember: boolean;
	error: string;
}

// Metadata Type
export interface MetaDataProps {
	title: string;
}

export interface ProjectDetailsDataProps {
	projectInfo: {
		label: string;
		value: string;
	}[];
	video: VideoDataProps;
	sliderImages: string[];
	description: string;
	outcomes: string;
	features: {
		iconClass: string;
		title: string;
	}[];
}

// Type for state variables RegisterFormData
export interface RegisterFormData {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
	remember: boolean;
	error: string;
}

// Services Section Data Type
export interface ServiceDataProps {
	title: string;
	highlightedText: string;
	buttonText?: string;
	buttonUrl?: string;
	service: {
		title: string;
		subtitle: string;
		image: string;
		link: string;
		tags: { label: string; url: string }[];
		description: string;
		// When set, the card's arrow opens a pop-out card with these details
		// instead of following `link`.
		details?: {
			story: string;
			imageWidth: number;
			imageHeight: number;
			facts: { label: string; value: string }[];
		};
	}[];
}

export interface ServiceTwoDataProps {
	title: string;
	description: string;
	image: string;
	link: string;
}

export interface ServiceDetailsProps {
	breadcrumb: {
		label: string;
		link: string;
		active: boolean;
	}[];
	titleHighlight: string;
	video: VideoDataProps;
	cta: CTADataProps;
	description: string;
	iconBoxes: {
		iconClass: string;
		title: string;
	}[];
}

//
export interface SidebarDataProps {
	categoriesData: {
		category: string;
		categories: {
			name: string;
			url: string;
		}[];
	};
	recentPostsData: {
		recentPost: string;
		recentPosts: {
			title: string;
			date: string;
			image: string;
			url: string;
		}[];
	};
	archivesData: {
		archive: string;
		archives: {
			name: string;
			url: string;
		}[];
	};
	tagsData: {
		tag: string;
		tags: {
			name: string;
			url: string;
		}[];
	};
}

// Team Member Section Data Type
export interface TeamMembersDataProps {
	title: string;
	subtitle: string;
	teamMembers: {
		img: string;
		name: string;
		role: string;
		description: string;
	}[];
}

// Testimonial Section Data Type
export interface TestimonialDataProps {
	sectionTitle: string;
	image?: string;
	imageAlt?: string;
	imageWidth?: number;
	imageHeight?: number;
	testimonials: {
		text: string;
		name: string;
		designation: string;
		img: string;
	}[];
}

// Tribute Section Data Type
export interface TributeDataProps {
	label: string;
	title: string;
	image: string;
	imageAlt: string;
	imageWidth: number;
	imageHeight: number;
	placard?: string;
	text: string;
	dedication?: string;
	video?: {
		videoUrl: string;
		/** Poster frame, also the still shown before the clip is opened. */
		backgroundImage: string;
		caption?: string;
	};
}

// Video block section
export interface VideoDataProps {
	backgroundImage: string;
	videoUrl: string;
}

// Value Section Data Type
export interface ValueDataProps {
	sectionTitle: string;
	values: { text: string }[];
}

// Works Section Data Type
export interface WorksDataProps {
	title: string;
	subtitle: string;
	labels?: { name: string; location: string };
	slides: {
		image: string;
		name: string;
		location: string;
		description: string;
	}[];
}
// Works Section Two Data Type
export interface WorksTwoDataProps {
	title: string;
	subtitle: string;
	galleryItems: GalleryDataProps[];
}

// Working Process Section Data Type
export interface WorkingProcessDataProps {
	sectionTitle: string;
	subtitle: string;
	logo: string;
	steps: {
		title: string;
		description: string;
	}[];
}
