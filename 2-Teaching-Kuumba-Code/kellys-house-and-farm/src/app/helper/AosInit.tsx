/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import Aos from "aos";
import { useEffect } from "react";

interface AOSInitProps {
	duration?: number;
	delay?: number;
	once?: boolean;
}

const AOSInit = ({
	duration = 1200,
	delay = 200,
	once = true,
}: AOSInitProps) => {
	useEffect(() => {
		Aos.init({
			duration,
			delay,
			once,
		});
	}, [duration, delay, once]);

	return null;
};

export default AOSInit;
