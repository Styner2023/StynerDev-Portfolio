/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTopOnLoad = () => {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTopOnLoad;
