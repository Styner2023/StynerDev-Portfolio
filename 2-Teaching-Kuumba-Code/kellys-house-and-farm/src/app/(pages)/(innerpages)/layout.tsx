/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import AOSInit from "@/app/helper/AosInit";
import { GlobalChildrenProps } from "@/app/types";
import Footer from "@/app/ui/Footer/Footer";
import Header from "@/app/ui/Header/Header";

const layout = ({ children }: GlobalChildrenProps) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
			<AOSInit />
		</>
	);
};

export default layout;
