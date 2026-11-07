/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { ServiceDataProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type ServiceItem = ServiceDataProps["service"][number];

interface DetailDialogProps {
	item: ServiceItem | null;
	onClose: () => void;
}

// Pop-out card for one Years of Growing entry. A native <dialog> gives us
// Esc to close, focus handling and the dimmed backdrop for free.
export default function DetailDialog({ item, onClose }: DetailDialogProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;
		if (item && !dialog.open) dialog.showModal();
		if (!item && dialog.open) dialog.close();
	}, [item]);

	const close = () => ref.current?.close();

	return (
		<dialog
			ref={ref}
			className="cs_detail_dialog"
			aria-labelledby="cs_detail_title"
			onClose={onClose}
			// A click on the dimmed backdrop lands on the dialog itself.
			onClick={(e) => e.target === e.currentTarget && close()}
		>
			{item?.details && (
				<>
					<div className="cs_detail_close_wrap">
						<button
							type="button"
							className="cs_detail_close"
							aria-label="Close"
							onClick={close}
						>
							<svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
								<path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
							</svg>
						</button>
					</div>
					<Image
						src={item.image}
						alt=""
						width={item.details.imageWidth}
						height={item.details.imageHeight}
						className="cs_detail_img"
					/>
					<div className="cs_detail_body">
						{item.tags[0] && <span className="cs_detail_tag">{item.tags[0].label}</span>}
						<h3 id="cs_detail_title" className="cs_fs_32 cs_bold cs_heading_color mb-0">
							{item.title}
						</h3>
						<p className="cs_detail_story mb-0">{item.details.story}</p>
						<h4 className="cs_detail_facts_title mb-0">At a glance</h4>
						<dl className="cs_detail_facts mb-0">
							{item.details.facts.map((fact) => (
								<div key={fact.label}>
									<dt>{fact.label}</dt>
									<dd>{fact.value}</dd>
								</div>
							))}
						</dl>
						<Link
							href={item.link}
							className="cs_btn cs_style_2 cs_bold cs_heading_color"
							onClick={close}
						>
							From the Harvest
						</Link>
					</div>
				</>
			)}
		</dialog>
	);
}
