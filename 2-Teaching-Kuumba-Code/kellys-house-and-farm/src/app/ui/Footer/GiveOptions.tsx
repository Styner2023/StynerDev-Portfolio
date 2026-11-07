/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { toast } from "react-toastify";

// A payment option opens a link (Venmo, PayPal) or, for services with no
// web link (Zelle), copies the handle people send to. An option with no
// details yet says so instead of going nowhere.
export type GiveOption =
	| { label: string; url: string }
	| { label: string; copy: string };

interface GiveOptionsProps {
	options: GiveOption[];
}

export default function GiveOptions({ options }: GiveOptionsProps) {
	const copy = async (label: string, value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			toast.success(`${label}: ${value} copied`);
		} catch {
			toast.info(`${label}: ${value}`);
		}
	};

	return (
		<ul className="cs_footer_give cs_mp_0">
			{options.map((option) => (
				<li key={option.label}>
					{"url" in option && option.url ? (
						<a
							href={option.url}
							className="cs_footer_give_btn"
							target="_blank"
							rel="noopener noreferrer"
						>
							{option.label}
						</a>
					) : (
						<button
							type="button"
							className="cs_footer_give_btn"
							onClick={() =>
								"copy" in option && option.copy
									? copy(option.label, option.copy)
									: toast.info(`${option.label} is coming soon. You can give through Venmo today.`)
							}
						>
							{option.label}
						</button>
					)}
				</li>
			))}
		</ul>
	);
}
