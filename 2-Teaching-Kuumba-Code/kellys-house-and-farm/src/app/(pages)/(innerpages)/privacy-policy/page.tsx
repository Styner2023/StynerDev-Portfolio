/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { BreadCrumbsDataProps, MetaDataProps } from "@/app/types";
import PageHeading from "@/app/ui/PageHeading";

const BreadcrumbsData: BreadCrumbsDataProps = {
	backgroundImage: "/assets/img/keisha-images/canton/2026-05-11-lawn-crossbar.jpg",
	title: "Privacy Policy",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Privacy Policy", link: "", active: true },
	],
};

export const metadata: MetaDataProps = {
	title: "Privacy Policy - Kelly’s House and Farm",
};

export default function privacyPolicy() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<div className="cs_height_70 cs_height_lg_50" />
			<div className="container">
				<p className="last-updated">Last Updated: September 18, 2026</p>
				<p>This page shares Kelly&rsquo;s House and Farm, Lekeisha Simpson&rsquo;s project in Canton, Mississippi. This policy explains what information the page handles.</p>
				<div className="cs_text_block_wrapper">
					<div className="cs_text_block">
						<h2 className="cs_fs_32">1. What this page collects</h2>
						<p>The page has no accounts and sets no cookies of its own. If you type your email into the sign-up box at the bottom of the page, it is sent to Web3Forms, the service that delivers the form, so we can reach you.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">2. Services the page uses</h2>
						<p>Some icons load from Iconify (api.iconify.design), which receives standard request details such as your IP address. Like any website, the server that hosts this page may keep standard logs, such as IP address and browser type.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">3. Giving</h2>
						<p>The Venmo link takes you to Venmo. Anything you share there is covered by Venmo&rsquo;s own privacy policy.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">4. Changes to this policy</h2>
						<p>If this policy changes, the new version will be posted here with a new Last Updated date.</p>
					</div>
				</div>
			</div>
			<div className="cs_height_70 cs_height_lg50" />
		</>
	);
}
