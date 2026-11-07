/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import { SidebarDataProps } from "@/app/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface SidebarSectionDataProps {
	data: SidebarDataProps;
}

export default function Sidebar({ data }: SidebarSectionDataProps) {
	return (
		<div className="col-lg-4">
			<div className="cs_sidebar cs_right_sidebar">
				{/* Search */}
				<div className="cs_sidebar_item widget_search">
					<form className="cs_sidebar_search" action="#">
						<input type="text" placeholder="Search..." />
						<button className="cs_sidebar_search_btn">
							<svg width={16} height={16} viewBox="0 0 16 16" fill="none">
								<path
									d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					</form>
				</div>

				{/* Categories */}
				<div className="cs_sidebar_item widget_categories">
					<h4
						className="cs_sidebar_widget_title"
						dangerouslySetInnerHTML={{ __html: data.categoriesData.category }}
					></h4>
					<ul>
						{data.categoriesData.categories.map((category, index) => (
							<li className="cat-item" key={index}>
								<Link href={category.url}>
									<i className="d-flex">
										<Icon icon="fa6-solid:link" width="20" height="16" />
									</i>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Recent Posts */}
				<div className="cs_sidebar_item">
					<h4
						className="cs_sidebar_widget_title"
						dangerouslySetInnerHTML={{
							__html: data.recentPostsData.recentPost,
						}}
					></h4>
					<ul className="cs_recent_posts">
						{data.recentPostsData.recentPosts.map((post, index) => (
							<li key={index}>
								<div className="cs_recent_post">
									<Link href={post.url} className="cs_recent_post_thumb">
										<div
											className="cs_recent_post_thumb_in cs_bg_filed"
											style={{ backgroundImage: `url(${post.image})` }}
										/>
									</Link>
									<div className="cs_recent_post_info">
										<h3 className="cs_recent_post_title">
											<Link href={post.url}>{post.title}</Link>
										</h3>
										<div className="cs_recent_post_date cs_primary_40_color">
											{post.date}
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Archives */}
				<div className="cs_sidebar_item widget_archive">
					<h4
						className="cs_sidebar_widget_title"
						dangerouslySetInnerHTML={{ __html: data.archivesData.archive }}
					></h4>
					<ul>
						{data.archivesData.archives.map((archive, index) => (
							<li key={index}>
								<Link href={archive.url}>
									<i className="d-flex">
										<Icon icon="fa6-solid:link" width="20" height="16" />
									</i>
									{archive.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Tags */}
				<div className="cs_sidebar_item widget_tag_cloud">
					<h4
						className="cs_sidebar_widget_title"
						dangerouslySetInnerHTML={{ __html: data.tagsData.tag }}
					></h4>
					<div className="tagcloud">
						{data.tagsData.tags.map((tag, index) => (
							<Link key={index} href={tag.url} className="tag-cloud-link">
								{tag.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
