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
	title: "Terms of Use",
	breadcrumbs: [
		{ label: "Home", link: "/", active: false },
		{ label: "Terms of Use", link: "", active: true },
	],
};

export const metadata: MetaDataProps = {
	title: "Terms of Use - Kelly’s House and Farm",
};

export default function termsAndCondition() {
	return (
		<>
			<PageHeading data={BreadcrumbsData} />
			<div className="cs_height_70 cs_height_lg_50" />
			<div className="container">
				<p className="last-updated">Last Updated: September 18, 2026</p>
				<p>By using this page, you agree to these terms.</p>
				<div className="cs_text_block_wrapper">
					<div className="cs_text_block">
						<h2 className="cs_fs_32">1. The story and photos</h2>
						<p>The words, photos and video on this page belong to Lekeisha Simpson and family. Please don&rsquo;t copy or reuse them without permission.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">2. Gifts</h2>
						<p>Gifts made through Venmo go directly to Keisha and aren&rsquo;t tax-deductible.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">3. Information on this page</h2>
						<p>The page is shared as-is and will change as the garden grows.</p>
					</div>
					<div className="cs_text_block">
						<h2 className="cs_fs_32">4. Changes to these terms</h2>
						<p>If these terms change, the new version will be posted here with a new Last Updated date.</p>
					</div>
				</div>
			</div>
			<div className="cs_height_70 cs_height_lg_50" />
		</>
	);
}
