/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import {
	AboutUsDataProps,
	CTADataProps,
	FeatureDataProps,
	HeroDataProps,
	MetaDataProps,
	ServiceDataProps,
	TestimonialDataProps,
	TributeDataProps,
	ValueDataProps,
	WorkingProcessDataProps,
	WorksDataProps,
} from "@/app/types";
import AboutUsSection from "@/app/ui/Aboutus";
import CTASection from "@/app/ui/CTASection";
import FeatureSection from "@/app/ui/FeatureSection";
import HeroSection from "@/app/ui/Hero";
import ServicesSection from "@/app/ui/ServicesSection";
import TestimonialSection from "@/app/ui/TestimonialSection";
import TributeSection from "@/app/ui/TributeSection";
import ValueSection from "@/app/ui/ValueSection";
import WorkingProcessSection from "@/app/ui/WorkingProcess";
import WorksSection from "@/app/ui/WorksSection";

const CANTON = "/assets/img/keisha-images/canton";
const PHOTOS = "/assets/img/keisha-images";
const VENMO_URL = "https://account.venmo.com/u/Lekeisha-Simpson";

const heroData: HeroDataProps = {
	title: "KELLY’S HOUSE <br /><b>AND FARM</b>",
	subtitle:
		"“The time has come for seeds sown long ago by my ancestors to bring forth harvest.”",
	btnText1: "Our Story",
	btnUrl1: "#story",
	btnText2: "The Garden Now",
	btnUrl2: "#garden-now",
	funfact: {
		number: "May 2026",
		text: "Ground broken in Canton",
	},
	box: {
		title: "Canton, Mississippi",
		subtitle:
			"Family land where Henry and Rosie Lee Kelly kept their garden. The first season is in the ground.",
		link: "#garden-now",
	},
	backgrounds: [
		{ src: `${CANTON}/family-maypole.jpg` },
		{ src: `${CANTON}/2026-05-11-lawn.jpg` },
		{ src: `${CANTON}/breaking-ground.jpg` },
		{ src: `${CANTON}/2026-05-16-cannas.jpg` },
		// Tall phone photo: hold the crop near the top so the bloom stays in frame.
		{ src: `${PHOTOS}/yellow-canna-lily-flower.jpg`, position: "center 22%" },
		{ src: `${CANTON}/okra-knee-high.jpg` },
	],
};

const valueData: ValueDataProps = {
	sectionTitle: "MISSION",
	values: [
		{ text: "Restore the land" },
		{ text: "Preserve the story" },
		{ text: "Grow food" },
		{ text: "Feed community" },
	],
};

const aboutData: AboutUsDataProps = {
	title: "OUR STORY",
	subtitle: "A HANDFUL <span>OF SEEDS</span>",
	introduction:
		"It began with a handful of seeds, a grandfather’s gift to Keisha as a child. The Kelly grandparents, Henry and Rosie Lee, kept a garden on family land in Canton, Mississippi. They grew corn, okra, peas, beans, tomatoes, peppers, watermelon, sweet potatoes, greens, squash and cucumbers.",
	introduction1:
		"After they passed, the garden went dormant. This spring the ground was tilled again and okra went in. Kelly’s House and Farm is bringing the garden back so the land can feed the surrounding community with fresh produce again.",
	image: `${PHOTOS}/IMG_0442.jpg`,
	imageAlt: "Keisha in the garden, holding an armful of just-pulled roots",
	imageWidth: 809,
	imageHeight: 1078,
	video: {
		videoUrl: "/assets/keisha-videos/breaking-ground-2026.mp4",
		backgroundImage: `${CANTON}/breaking-ground.jpg`,
	},
};

const tributeData: TributeDataProps = {
	label: "FOR THE ANCESTORS",
	title: "SHELLS THAT <span>REMEMBER</span>",
	image: `${CANTON}/2026-05-17-shell-piece.jpg`,
	imageAlt: "Strands of cowrie shells, threaded by hand, hanging from the crossbar in the Canton yard",
	imageWidth: 1200,
	imageHeight: 1600,
	placard: "Cowrie shells, threaded by hand · Canton, Mississippi · May 17, 2026",
	text: "Each cowrie began in warm ocean water, a world away from Mississippi. For centuries these small shells were money, adornment and something sacred, strung, worn and carried across the sea. Now, threaded by hand, they sway over family land in Canton, catching the light and keeping the ancestors close.",
	dedication: "In loving memory of Henry and Rosie Lee Kelly",
	video: {
		videoUrl: "/assets/keisha-videos/land-2026.mp4",
		backgroundImage: `${CANTON}/land-2026-poster.jpg`,
		caption: "The land they kept · Canton, Mississippi",
	},
};

const workingProcessData: WorkingProcessDataProps = {
	sectionTitle: "THE FIRST SEASON IS <span>IN THE GROUND</span>",
	subtitle: "THE GARDEN NOW",
	logo: "/assets/img/logo.svg",
	steps: [
		{
			title: "01 | A lawn in clover",
			description:
				"May 11, 2026. The yard as it was: the big tree, the smoker, the fire pit and the crossbar. White clover had run through the whole lawn, quietly putting nitrogen back into ground that had been left to itself. Nothing planted yet, but the ground was ready.",
		},
		{
			title: "02 | Breaking ground",
			description:
				"A tractor opens the first bed in a single pass, and the clods are broken up by hand with a hoe. The tractor does in an hour what once took days, but the hoe work is unchanged: the same stoop, the same swing this ground has known before. Under the lawn, the soil came up dark.",
		},
		{
			title: "03 | Yellow canna lilies along the house",
			description:
				"May 16. Yellow canna lilies go in along the house wall, which is just where they show best: massed against a wall, where they stand out. They take the full Mississippi sun, rise on broad, paddle-shaped leaves, and send up spikes of yellow flowers from midsummer until the first frost. Hummingbirds and butterflies come to them, and winters here stay mild enough that the roots hold in the ground instead of being lifted and stored.",
		},
		{
			title: "04 | Cowrie shells for the ancestors",
			description:
				"May 17. A piece made by hand from strands of cowrie shells now hangs from the crossbar. Across West Africa and the African diaspora, cowries are a link to the ancestors. Here they honor Henry and Rosie Lee Kelly and all who came before.",
		},
		{
			title: "05 | Okra, knee high",
			description:
				"Okra stands knee high in ground that was lawn in May. It was one of the old crops here and it is the first one back, because okra wants heat and a Mississippi summer gives it plenty. Cut the pods young and the plant keeps setting more, right through to frost.",
		},
	],
};

const featureData: FeatureDataProps = {
	sectionTitle: "WHAT <span>COMES NEXT</span>",
	buttonText: "Help the Garden Grow",
	buttonUrl: "#support",
	image: `${CANTON}/okra-knee-high.jpg`,
	imageAlt: "Okra standing knee high in the Canton garden",
	imageWidth: 782,
	imageHeight: 1510,
	features: [
		{
			icon: "fa6-solid:droplet",
			title: "Water for every bed",
			description:
				"The okra is already knee high, but the beds still wait on the weather. Irrigation means steady water through the Mississippi summer, so nothing planted is lost to a dry spell.",
		},
		{
			icon: "fa6-solid:sun",
			title: "A high tunnel for more seasons",
			description:
				"A high tunnel is a simple greenhouse over the soil. It shelters young plants from heat, storms and frost, and stretches the season so there’s fresh food for more of the year.",
		},
		{
			icon: "fa6-solid:seedling",
			title: "Seeds for the old crops",
			description:
				"Corn, okra, peas, beans, sweet potatoes, greens: the crops Henry and Rosie Lee Kelly grew, back in the same ground. Tools and seed are how their garden comes back to life.",
		},
		{
			icon: "fa6-solid:people-group",
			title: "Hands to share the work",
			description:
				"A garden that feeds a community takes more than one pair of hands. Support pays people to work the land and builds the skills to run it well, from planting to payroll to getting the harvest to neighbors.",
		},
	],
};

const servicesData: ServiceDataProps = {
	title: "YEARS OF GROWING",
	highlightedText: "",
	buttonText: "From the Harvest",
	buttonUrl: "#harvest",
	service: [
		{
			title: "WOOD CHIPS",
			subtitle: "Pitchfork in hand on a pile of wood chips, January 2020.",
			image: `${PHOTOS}/IMG_20200115_125203253_HDR.jpg`,
			link: "#harvest",
			tags: [{ label: "2020", url: "#growing" }],
			description: "",
			details: {
				story: "Every garden starts with the ground under it. Here, a mountain of fresh wood chips and the tools to move it, one forkful at a time.",
				imageWidth: 809,
				imageHeight: 1078,
				facts: [
					{ label: "Used for", value: "Mulch on paths and around plants" },
					{ label: "What they do", value: "Hold moisture in the soil and keep weeds down" },
					{ label: "Over time", value: "Break down into rich, dark soil" },
				],
			},
		},
		{
			title: "CARROTS",
			subtitle: "Carrots pulled and bunched, October 2021.",
			image: `${PHOTOS}/IMG_0772.jpg`,
			link: "#harvest",
			tags: [{ label: "2021", url: "#growing" }],
			description: "",
			details: {
				story: "Pulled from the ground and bunched with their feathery green tops still on, straight from the bed.",
				imageWidth: 1437,
				imageHeight: 1078,
				facts: [
					{ label: "Season", value: "Cool weather, in spring and fall" },
					{ label: "Grown from", value: "Seed sown straight into the soil" },
					{ label: "Ready in", value: "About 70 to 80 days" },
					{ label: "Good to know", value: "A cool snap makes them sweeter" },
				],
			},
		},
		{
			title: "SEEDLINGS",
			subtitle: "Trays of seedlings ready to go into the ground, September 2022.",
			image: `${PHOTOS}/IMG_2707.jpg`,
			link: "#harvest",
			tags: [{ label: "2022", url: "#growing" }],
			description: "",
			details: {
				story: "Rows of young plants with bright red stems, started from seed in trays and grown strong before they go into the ground.",
				imageWidth: 1437,
				imageHeight: 1078,
				facts: [
					{ label: "Why trays", value: "Seeds sprout sheltered from weather and pests" },
					{ label: "Ready to plant", value: "Usually 4 to 6 weeks after sowing" },
					{ label: "Next step", value: "Moved into the beds once they’re sturdy" },
				],
			},
		},
		{
			title: "ONIONS",
			subtitle: "Onions laid out after harvest, June 2025.",
			image: `${PHOTOS}/IMG_4026.jpg`,
			link: "#harvest",
			tags: [{ label: "June 2025", url: "#growing" }],
			description: "",
			details: {
				story: "White, yellow and red onions spread out on a rack after harvest, roots and all.",
				imageWidth: 809,
				imageHeight: 1078,
				facts: [
					{ label: "Ready to pull", value: "When the tops flop over and turn brown" },
					{ label: "After harvest", value: "Cured in a dry, airy spot for 2 to 3 weeks" },
					{ label: "Then", value: "Keep for months somewhere cool and dry" },
				],
			},
		},
		{
			title: "SUMMER HARVEST",
			subtitle: "A box of squash, zucchini and tomatoes, August 2025.",
			image: `${PHOTOS}/IMG_0041.jpg`,
			link: "#harvest",
			tags: [{ label: "August 2025", url: "#growing" }],
			description: "",
			details: {
				story: "A box full of summer: yellow squash, striped zucchini and ripe tomatoes, picked at their peak.",
				imageWidth: 809,
				imageHeight: 1078,
				facts: [
					{ label: "Season", value: "The heat of summer" },
					{ label: "Squash and zucchini", value: "Grow fast; best picked young and tender" },
					{ label: "Tomatoes", value: "Sweetest when left to ripen on the vine" },
				],
			},
		},
	],
};

const fieldData: WorksDataProps = {
	title: "IN THE <span>FIELD</span>",
	subtitle: "GROWING",
	labels: { name: "GROWING", location: "" },
	slides: [
		{
			image: `${PHOTOS}/IMG_1237.jpg`,
			name: "KALE & LETTUCE",
			location: "",
			description: "Rows of kale next to red and green lettuce.",
		},
		{
			image: `${PHOTOS}/70415631473__B1FEF395-D4CF-4AA0-BE75-85121746AC68.jpg`,
			name: "LETTUCE ROWS",
			location: "",
			description: "Rows of lettuce coming up.",
		},
		{
			image: `${PHOTOS}/IMG_0270.jpg`,
			name: "SUNFLOWERS & CORN",
			location: "",
			description: "Sunflowers standing over a row of corn.",
		},
		{
			image: `${PHOTOS}/IMG_0273.jpg`,
			name: "AMONG THE SQUASH",
			location: "",
			description: "Deep red flower spikes standing over broad squash leaves.",
		},
		{
			image: `${PHOTOS}/IMG_2127.jpg`,
			name: "POPPIES",
			location: "",
			description: "Orange poppies through a bed.",
		},
	],
};

const testimonialData: TestimonialDataProps = {
	sectionTitle: "IN KEISHA’S WORDS",
	image: `${PHOTOS}/image000000.jpg`,
	imageAlt: "Keisha in a strawberry patch, tasting a strawberry",
	imageWidth: 812,
	imageHeight: 1078,
	testimonials: [
		{
			text: "“The time has come for <span>seeds</span> sown long ago by my <span>ancestors</span> to bring forth <span>harvest</span>.”",
			name: "LEKEISHA SIMPSON",
			designation: "On bringing the garden back",
			img: "",
		},
		{
			text: "“They grew all types of vegetables: corn, <span>okra</span>, peas, beans, tomatoes, peppers, watermelon, <span>sweet potatoes</span>, a variety of greens, squash, cucumbers.”",
			name: "LEKEISHA SIMPSON",
			designation: "On the grandparents’ garden",
			img: "",
		},
		{
			text: "“After they passed it’s been <span>dormant</span>. I recently planted <span>okra</span> in the spring.”",
			name: "LEKEISHA SIMPSON",
			designation: "On the garden today",
			img: "",
		},
	],
};

const worksData: WorksDataProps = {
	title: "FROM THE <span>HARVEST</span>",
	subtitle: "HARVEST",
	labels: { name: "HARVEST", location: "" },
	slides: [
		{
			image: `${PHOTOS}/IMG_0418.jpg`,
			name: "OKRA",
			location: "",
			description: "Okra, one of the crops Keisha’s grandparents grew.",
		},
		{
			image: `${PHOTOS}/IMG_0419.jpg`,
			name: "TOMATOES",
			location: "",
			description: "Tomatoes of every size and color.",
		},
		{
			image: `${PHOTOS}/007E050F-9348-4475-9945-34448CC7E479.jpg`,
			name: "BEANS",
			location: "",
			description: "Yellow, green and purple beans.",
		},
		{
			image: `${PHOTOS}/IMG_2917.jpg`,
			name: "SWEET POTATOES",
			location: "",
			description: "Sweet potatoes coming out of the ground.",
		},
		{
			image: `${PHOTOS}/IMG_0253.jpg`,
			name: "CABBAGE",
			location: "",
			description: "Cabbage by the crate.",
		},
		{
			image: `${PHOTOS}/IMG_2892.jpg`,
			name: "BEETS & CHARD",
			location: "",
			description: "Beets and chard, bunched.",
		},
		{
			image: `${PHOTOS}/IMG_0811.jpg`,
			name: "GREENS",
			location: "",
			description: "A table of greens.",
		},
		{
			image: `${PHOTOS}/IMG_0430.jpg`,
			name: "TOMATOES & SQUASH",
			location: "",
			description: "Trays of tomatoes, squash, cucumbers and peppers.",
		},
		{
			image: `${PHOTOS}/IMG_0213.jpg`,
			name: "PUMPKINS & PEPPERS",
			location: "",
			description: "Pumpkins, squash, tomatoes and peppers on the table.",
		},
		{
			image: `${PHOTOS}/IMG_0401.jpg`,
			name: "BEAN PODS",
			location: "",
			description: "A crate full of bean pods.",
		},
		{
			image: `${PHOTOS}/65514624768__A1521AB6-03A2-4816-9692-5AC4CDB7F980.jpg`,
			name: "GINGER & BITTER MELON",
			location: "",
			description: "Ginger, bitter melon and long beans.",
		},
		{
			image: `${PHOTOS}/IMG_1608.jpg`,
			name: "LETTUCE",
			location: "",
			description: "Soft green heads of lettuce, just cut.",
		},
		{
			image: `${PHOTOS}/IMG_2878.jpg`,
			name: "SORGHUM",
			location: "",
			description: "Red and gold sorghum heads.",
		},
		{
			image: `${PHOTOS}/image000000.jpg`,
			name: "STRAWBERRIES",
			location: "",
			description: "A strawberry, straight from the patch.",
		},
	],
};

const offeringData: TributeDataProps = {
	label: "GIVING BACK",
	title: "AN <span>OFFERING</span>",
	image: `${PHOTOS}/IMG_0223.jpg`,
	imageAlt: "An offering in the field: squash in a shell bowl, cucumbers, beans and sunflowers laid in a ring of straw beneath a Water Is Life banner",
	imageWidth: 809,
	imageHeight: 1078,
	placard: "From the harvest · Given back to the soil",
	text: "Before the harvest is carried away, some of it goes back. Yellow squash in a shell bowl, cucumbers, beans and sunflowers, laid in a ring of straw beneath a banner. A thank-you to the soil, the rain and the hands that came before.",
	dedication: "Water is life.",
};

const ctaData: CTADataProps = {
	backgroundImage: `${CANTON}/2026-05-11-lawn-crossbar.jpg`,
	title: "HELP THE GARDEN <br /> GROW AGAIN",
	subtitle:
		"Gifts through Venmo go directly to Keisha and aren’t tax-deductible.",
	buttonText: "Give via Venmo",
	buttonUrl: VENMO_URL,
};

export const metadata: MetaDataProps = {
	title: "Kelly’s House and Farm",
};

export default function HomePage() {
	return (
		<>
			<HeroSection data={heroData} />
			<ValueSection data={valueData} />
			<div id="story" className="cs_anchor">
				<AboutUsSection data={aboutData} />
			</div>
			<div id="ancestors" className="cs_anchor">
				<TributeSection data={tributeData} />
			</div>
			<div id="garden-now" className="cs_anchor">
				<WorkingProcessSection data={workingProcessData} />
			</div>
			<div id="next" className="cs_anchor">
				<FeatureSection data={featureData} />
			</div>
			<div id="growing" className="cs_anchor">
				<ServicesSection data={servicesData} />
			</div>
			<div id="field" className="cs_anchor">
				<WorksSection data={fieldData} />
			</div>
			<div id="keishas-words" className="cs_anchor">
				<TestimonialSection data={testimonialData} />
			</div>
			<div id="harvest" className="cs_anchor">
				<WorksSection data={worksData} />
			</div>
			<div id="offering" className="cs_anchor">
				<TributeSection data={offeringData} />
			</div>
			<div id="support" className="cs_anchor">
				<CTASection data={ctaData} />
			</div>
		</>
	);
}
