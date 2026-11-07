/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { BlogDataProps, BlogPostItem } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

interface BlogSectionProps {
	data: BlogDataProps;
}

export default function BlogSection({ data }: BlogSectionProps) {
	return (
		<div className="col-lg-8">
			<div className="cs_post_1_list">
				{data.posts.map((post) => (
					<div className="cs_post cs_style_1" key={post.id}>
						<Link href={post.link} className="cs_post_thumb cs_radius_15">
							<Image
								src={post.image}
								alt="Post"
								width={800}
								height={500}
								className="w-100 cs_radius_15 object-cover"
							/>
						</Link>
						<div className="cs_post_info">
							<div className="cs_post_meta cs_style_1">
								<span className="cs_posted_by">{post.date}</span>
								<Link
									href="#"
									className="cs_post_avatar"
									dangerouslySetInnerHTML={{ __html: post.category }}
								></Link>
							</div>
							<h2 className="cs_post_title cs_fs_40">
								<Link
									href={post.link}
									dangerouslySetInnerHTML={{ __html: post.title }}
								></Link>
							</h2>
							<div
								className="cs_post_sub_title"
								dangerouslySetInnerHTML={{ __html: post.description }}
							></div>
							<Link
								href={post.link}
								className="cs_btn cs_style_2 cs_bold cs_heading_color"
							>
								See More
							</Link>
						</div>
					</div>
				))}
			</div>

			<div className="cs_height_60 cs_height_lg_40" />

			<ul className="cs_pagination_box cs_center cs_mp_0">
				{data.pagination.map((page, i) => (
					<li key={i}>
						<Link
							className={`cs_pagination_item cs_center ${
								page === 1 ? "active" : ""
							}`}
							href="/blog"
						>
							{page}
						</Link>
					</li>
				))}
				<li>
					<Link href="#" className="cs_pagination_item cs_center">
						<svg
							width={7}
							height={12}
							viewBox="0 0 7 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 1.272L4.55116 6L0 10.728L1.22442 12L7 6L1.22442 0L0 1.272Z"
								fill="currentColor"
							/>
						</svg>
					</Link>
				</li>
			</ul>
		</div>
	);
}
