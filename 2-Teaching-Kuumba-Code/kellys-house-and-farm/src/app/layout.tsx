/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "./sass/style.scss";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { GlobalChildrenProps } from "./types";

// Keisha is keeping the project low key: keep every page out of search engines
// until Keisha decides to go public.
export const metadata: Metadata = {
	robots: { index: false, follow: false },
	authors: [{ name: "StynerDev", url: "https://www.stynerdev.com/" }],
	creator: "StynerDev",
};

export default function RootLayout({ children }: GlobalChildrenProps) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<body>
				<div className="cs_page_frame">{children}</div>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</body>
		</html>
	);
}
