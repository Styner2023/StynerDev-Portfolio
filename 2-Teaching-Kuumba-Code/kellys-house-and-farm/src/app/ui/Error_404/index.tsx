/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { ErrorPageDataProps } from "@/app/types";
import Link from "next/link";

interface ErrorSectionProps {
	data: ErrorPageDataProps;
}

const ErrorSection = ({ data }: ErrorSectionProps) => {
	return (
		<section
			style={{
				marginTop: "50px",
				marginBottom: "50px",
			}}
		>
			<div className="container">
				<div className="cs_error text-center">
					<h2 className="cs_fs_100 cs_accent_color">{data.title}</h2>
					<h2 className="cs_fs_53 cs_normal">{data.subtitle}</h2>
					<p>{data.message}</p>

					<Link
						href="/"
						className="cs_btn cs_style_1 cs_bold cs_heading_bg cs_white_color"
					>
						Return Home
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ErrorSection;
