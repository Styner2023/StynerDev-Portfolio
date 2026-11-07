/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import Link from "next/link";
import BlogCommentForm from "../Forms/BlogCommentForm";
import { BlogDetailsDataProps } from "@/app/types";
import Image from "next/image";

interface BlogDetailsSectionProps {
	data: BlogDetailsDataProps;
}

export default function BlogDetailsSection({ data }: BlogDetailsSectionProps) {
	return (
		<div className="col-lg-8">
			<div className="cs_post cs_style_1 cs_type_1">
				<div className="cs_post_thumb cs_radius_15">
					<Image
						src={data.postThumb}
						alt="Post"
						width={600}
						height={400}
						className="w-100 cs_radius_15 object-cover"
					/>
				</div>
				<div className="cs_post_info">
					<div className="cs_post_meta cs_style_1 cs_ternary_color cs_semi_bold cs_primary_font">
						<span className="cs_posted_by">{data.date}</span>
						<Link href={data.category.url} className="cs_post_avatar">
							{data.category.title}
						</Link>
					</div>
					<h2
						className="cs_post_title"
						dangerouslySetInnerHTML={{ __html: data.title }}
					></h2>

					{data.content.map((item, index) => {
						if (item.type === "p") {
							return <p key={index}>{item.text}</p>;
						}
						if (item.type === "blockquote") {
							return (
								<blockquote key={index}>
									{item.quote} <small>{item.author}</small>
								</blockquote>
							);
						}
						return null;
					})}

					<div className="row">
						{data.images.map((img, index) => (
							<div className="col-md-6" key={index}>
								<Image
									src={img}
									alt="Blog Details"
									width={800}
									height={500}
									className="cs_radius_15 w-100 object-cover"
								/>
								<div className="cs_height_35 cs_height_lg_20" />
							</div>
						))}
					</div>

					{data.sections.map((section, index) => (
						<div key={index}>
							<h3 dangerouslySetInnerHTML={{ __html: section.heading }}></h3>
							<p dangerouslySetInnerHTML={{ __html: section.paragraph }}></p>
						</div>
					))}

					<div className="embed-responsive embed-responsive-16by9">
						<iframe
							className="embed-responsive-item"
							src={data.videoUrl}
							allowFullScreen
						/>
					</div>

					<p dangerouslySetInnerHTML={{ __html: data.closingParagraph }}></p>

					<div>
						<h3
							dangerouslySetInnerHTML={{ __html: data?.property?.title }}
						></h3>
						<p
							dangerouslySetInnerHTML={{ __html: data?.property?.description }}
						></p>
					</div>
				</div>
			</div>

			<div className="cs_height_30 cs_height_lg_30" />
			<h2 className="cs_fs_32 mb-0">{data.formTitle}</h2>
			<div className="cs_height_5 cs_height_lg_5" />
			<p className="mb-0">{data.formNote}</p>
			<div className="cs_height_40 cs_height_lg_30" />
			<BlogCommentForm />
		</div>
	);
}
