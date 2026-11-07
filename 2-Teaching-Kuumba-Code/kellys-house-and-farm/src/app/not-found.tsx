/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import AOSInit from "./helper/AosInit";
import ErrorSection from "./ui/Error_404";
import Footer from "./ui/Footer/Footer";
import Header from "./ui/Header/Header";
import PageHeading from "./ui/PageHeading";

const Page404 = () => {
	const BreadcrumbsData = {
		backgroundImage: "/assets/img/about_heading_bg.jpg",
		title: "Page not found",
		breadcrumbs: [
			{ label: "Home", link: "/", active: false },
			{ label: "Page not found", link: "", active: true },
		],
	};

	const errData = {
		title: "404",
		subtitle: "Oops! Page Not Found!",
		message:
			"Sorry, the page you're seeking isn't here. It could have been relocated or removed.",
	};
	return (
		<>
			<Header />
			<div className="cs_site_header_spacing_100" />
			<PageHeading data={BreadcrumbsData} />
			<ErrorSection data={errData} />
			<Footer />
			<AOSInit />
		</>
	);
};

export default Page404;
