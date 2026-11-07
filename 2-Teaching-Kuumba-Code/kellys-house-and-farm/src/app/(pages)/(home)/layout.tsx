/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import AOSInit from "@/app/helper/AosInit";
import { GlobalChildrenProps } from "@/app/types";
import Footer1 from "@/app/ui/Footer/Footer1";
import Header from "@/app/ui/Header/Header";

const Layout = ({ children }: GlobalChildrenProps) => {
	return (
		<>
			<Header />
			{children}
			<Footer1 />
			<AOSInit />
		</>
	);
};

export default Layout;
