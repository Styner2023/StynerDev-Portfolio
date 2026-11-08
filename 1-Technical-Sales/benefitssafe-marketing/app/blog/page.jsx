import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import Image from "next/image";
import Link from "next/link";

function Blog() {
	return (
		<>
			<Header_02 />
			<main className="main-wrapper relative overflow-hidden">
				{/*...::: Breadcrumb Section Start :::... */}
				<section id="section-breadcrumb">
					{/* Section Spacer */}
					<div className="breadcrumb-wrapper">
						{/* Section Container */}
						<div className="global-container">
							<div className="breadcrumb-block">
								<h1 className="breadcrumb-title">The BenefitsSafe Blog</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Blog Section Start :::... */}
				<section className="blog-section">
					{/* Section Spacer */}
					<div className="pb-40 xl:pb-[220px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-[1fr,minmax(416px,_0.45fr)]">
								<div className="flex flex-col gap-y-10 lg:gap-y-14 xl:gap-y-20">
									{/* Blog Post List */}
									<ul className="grid grid-cols-2 gap-6">
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-1.jpg"
													alt="blog-main-1"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Grant Management
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 12, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														How Virtual Cards Protect SSI Beneficiaries from Losing Benefits
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													Learn how merchant category blocking and spending controls prevent accidental purchases that could disqualify your clients from SSI.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-2.jpg"
													alt="blog-main-2"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Nonprofit Operations
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 10, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														The True Cost of Paper Check Disbursements for Nonprofits
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													Paper checks take 2 weeks, create no audit trail, and cost more than you think. Here's why virtual cards are the future of nonprofit disbursement.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-3.jpg"
													alt="blog-main-3"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Benefits Guide
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 09, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														What Every Case Manager Should Know About SSI Asset Limits in 2025
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													SSI asset limits, SSDI SGA thresholds, and Medi-Cal income caps — explained in plain English with current 2025 California numbers.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-4.jpg"
													alt="blog-main-4"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Artificial Intelligence
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 07, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														Why Staff Turnover Doesn't Have to Mean Lost Compliance Knowledge
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													45% annual turnover in social services. Here's how autonomous monitoring preserves institutional knowledge even when staff leaves.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-5.jpg"
													alt="blog-main-5"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Graphics
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 05, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														BenefitsSafe vs True Link: What's the Difference?
														tool
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													True Link charges $12/card. We charge $49/org. Here's why per-organization pricing is better for nonprofits.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
										{/* Blog Post Single Item */}
										<li className="jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]">
											<Link
												href="/blog-details"
												className="block overflow-hidden"
											>
												<Image
													src="/assets/img_placeholder/th-1/blog-main-6.jpg"
													alt="blog-main-6"
													width={856}
													height={540}
													className="h-auto w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
												/>
											</Link>
											<div className="border border-[#EAEDF0] p-[30px]">
												{/* Blog Post Meta */}
												<ul className="flex flex-wrap items-center gap-6">
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															Medi-Cal
														</Link>
													</li>
													<li className="relative font-semibold after:absolute after:left-full after:top-1/2 after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:translate-x-2 after:rounded-full after:bg-colorCodGray last:after:hidden">
														<Link
															href="/blog-details"
															className="hover:text-colorViolet"
														>
															June 01, 2024
														</Link>
													</li>
												</ul>
												{/* Blog Post Meta */}
												<h2 className="mb-3 mt-7 hover:text-colorViolet">
													<Link href="/blog-details">
														How to Set Up a Grant Disbursement Program in Under 24 Hours
													</Link>
												</h2>
												<p className="mb-7 line-clamp-2 last:mb-0">
													Connect your bank, add beneficiaries, issue cards. A step-by-step guide to getting started with BenefitsSafe in under 24 hours.
												</p>
											</div>
										</li>
										{/* Blog Post Single Item */}
									</ul>
									{/* Blog Post List */}
									{/* Pagination */}
									<nav
										className="jos flex justify-center"
										data-jos_animation="fade"
									>
										<ul className="flex gap-x-[15px]">
											<li>
												<Link
													href="/blog"
													className="group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white active:bg-black"
												>
													<Image
														src="/assets/img_placeholder/th-1/icon-black-cheveron-left.svg"
														alt="icon-black-cheveron-left"
														width={24}
														height={24}
														className="group-active: h-6 w-6 opacity-100 group-hover:opacity-0"
													/>
													<Image
														src="/assets/img_placeholder/th-1/icon-white-cheveron-left.svg"
														alt="icon-white-cheveron-left"
														width={24}
														height={24}
														className="absolute h-6 w-6 opacity-0 group-hover:opacity-100"
													/>
												</Link>
											</li>
											<li>
												<Link
													href="/blog"
													className="group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white active:bg-black active:text-white"
												>
													1
												</Link>
											</li>
											<li>
												<Link
													href="/blog"
													className="group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white"
												>
													2
												</Link>
											</li>
											<li>
												<Link
													href="/blog"
													className="group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white"
												>
													3
												</Link>
											</li>
											<li>
												<Link
													href="/blog"
													className="group flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white"
												>
													<Image
														src="/assets/img_placeholder/th-1/icon-black-cheveron-right.svg"
														alt="icon-black-cheveron-right"
														width={24}
														height={24}
														className="h-6 w-6 opacity-100 group-hover:opacity-0"
													/>
													<Image
														src="/assets/img_placeholder/th-1/icon-white-cheveron-right.svg"
														alt="icon-white-cheveron-right"
														width={24}
														height={24}
														className="absolute h-6 w-6 opacity-0 group-hover:opacity-100"
													/>
												</Link>
											</li>
										</ul>
									</nav>
									{/* Pagination */}
								</div>
								{/* Blog Aside */}
								<aside className="jos flex flex-col gap-y-[30px]">
									{/* Single Sidebar */}
									<div>
										{/* Sidebar Search */}
										<form
											action="#"
											method="post"
											className="relative h-[60px]"
										>
											<input
												type="search"
												name="sidebar-search"
												id="sidebar-search"
												placeholder="Type to search..."
												className="h-full w-full rounded-[50px] border border-[#E1E1E1] bg-white py-[15px] pl-16 pr-8 text-lg outline-none transition-all focus:border-colorViolet"
												required=""
											/>
											<button aria-label="Search"
												type="submit" aria-label="Submit"
												className="absolute left-[30px] top-0 h-full"
											>
												<Image
													src="/assets/img_placeholder/th-1/icon-black-search.svg"
													alt="search"
													width={20}
													height={20}
												/>
											</button>
										</form>
										{/* Sidebar Search */}
									</div>
									{/* Single Sidebar */}
									{/* Single Sidebar */}
									<div className="rounded-[10px] border border-[#EAEDF0] p-8">
										<div className="relative mb-[30px] inline-block pb-[10px] text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
											Blog Categories
										</div>
										{/* Blog Categories List */}
										<ul>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													SSI &amp; SSDI Compliance (12)
												</Link>
											</li>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													Grant Management (8)
												</Link>
											</li>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													Medi-Cal &amp; CalFresh (6)
												</Link>
											</li>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													Virtual Cards (5)
												</Link>
											</li>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													ABLE Accounts (4)
												</Link>
											</li>
											<li className="mb-6 last:mb-0">
												<Link
													href="/blog-details"
													className="text-black hover:text-colorViolet"
												>
													Nonprofit Operations (9)
												</Link>
											</li>
										</ul>
										{/* Blog Categories List */}
									</div>
									{/* Single Sidebar */}
									{/* Single Sidebar */}
									<div className="rounded-[10px] border border-[#EAEDF0] p-8">
										<div className="relative mb-[30px] inline-block pb-[10px] text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
											Recent Posts
										</div>
										{/* Blog Recent Post List */}
										<ul className="flex flex-col gap-y-6">
											<li className="group flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row">
												<Link
													href="/blog-details"
													className="inline-block h-[150px] w-full overflow-hidden rounded-[5px] sm:h-[100px] sm:w-[150px]"
												>
													<Image
														src="/assets/img_placeholder/th-1/blog-recent-img-1.jpg"
														alt="blog-recent-img-1"
														width={150}
														height={130}
														className="h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
													/>
												</Link>
												<div className="flex w-full flex-col gap-y-3 sm:w-auto sm:flex-1">
													<Link
														href="/blog-details"
														className="flex items-center gap-[10px] text-sm hover:text-colorViolet"
													>
														<div className="h-6 w-6">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-calendar.svg"
																alt="icon-black-calendar"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
														</div>
														June 12, 2024
													</Link>
													<Link
														href="/blog-details"
														className="text-base font-bold hover:text-colorViolet"
													>
														ABLE Accounts: What Nonprofits Should Know
													</Link>
												</div>
											</li>
											<li className="group flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row">
												<Link
													href="/blog-details"
													className="inline-block h-[150px] w-full overflow-hidden rounded-[5px] sm:h-[100px] sm:w-[150px]"
												>
													<Image
														src="/assets/img_placeholder/th-1/blog-recent-img-2.jpg"
														alt="blog-recent-img-2"
														width={150}
														height={130}
														className="h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
													/>
												</Link>
												<div className="flex w-full flex-col gap-y-3 sm:w-auto sm:flex-1">
													<Link
														href="/blog-details"
														className="flex items-center gap-[10px] text-sm hover:text-colorViolet"
													>
														<div className="h-6 w-6">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-calendar.svg"
																alt="icon-black-calendar"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
														</div>
														June 13, 2024
													</Link>
													<Link
														href="/blog-details"
														className="text-base font-bold hover:text-colorViolet"
													>
														Medi-Cal Asset Limit Changes Coming in 2026
													</Link>
												</div>
											</li>
											<li className="group flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row">
												<Link
													href="/blog-details"
													className="inline-block h-[150px] w-full overflow-hidden rounded-[5px] sm:h-[100px] sm:w-[150px]"
												>
													<Image
														src="/assets/img_placeholder/th-1/blog-recent-img-3.jpg"
														alt="blog-recent-img-3"
														width={150}
														height={130}
														className="h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105"
													/>
												</Link>
												<div className="flex w-full flex-col gap-y-3 sm:w-auto sm:flex-1">
													<Link
														href="/blog-details"
														className="flex items-center gap-[10px] text-sm hover:text-colorViolet"
													>
														<div className="h-6 w-6">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-calendar.svg"
																alt="icon-black-calendar"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
														</div>
														June 07, 2024
													</Link>
													<Link
														href="/blog-details"
														className="text-base font-bold hover:text-colorViolet"
													>
														5 Questions to Ask Before Issuing a Virtual Card
													</Link>
												</div>
											</li>
										</ul>
										{/* Blog Recent Post List */}
									</div>
									{/* Single Sidebar */}
									{/* Single Sidebar */}
									<div className="rounded-[10px] border border-[#EAEDF0] p-8">
										<div className="relative mb-[30px] inline-block pb-[10px] text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
											Tags
										</div>
										{/* Blog Tags Post List */}
										<ul className="flex flex-wrap gap-x-2 gap-y-4">
											<li>
												<Link
													href="/blog-details"
													className="inline-block rounded-[55px] bg-black bg-opacity-5 px-5 py-1 hover:bg-colorViolet hover:text-white"
												>
													SSI Compliance
												</Link>
											</li>
											<li>
												<Link
													href="/blog-details"
													className="inline-block rounded-[55px] bg-black bg-opacity-5 px-5 py-1 hover:bg-colorViolet hover:text-white"
												>
													Grant Management
												</Link>
											</li>
											<li>
												<Link
													href="/blog-details"
													className="inline-block rounded-[55px] bg-black bg-opacity-5 px-5 py-1 hover:bg-colorViolet hover:text-white"
												>
													Compliance
												</Link>
											</li>
											<li>
												<Link
													href="/blog-details"
													className="inline-block rounded-[55px] bg-black bg-opacity-5 px-5 py-1 hover:bg-colorViolet hover:text-white"
												>
													Nonprofit Operations
												</Link>
											</li>
											<li>
												<Link
													href="/blog-details"
													className="inline-block rounded-[55px] bg-black bg-opacity-5 px-5 py-1 hover:bg-colorViolet hover:text-white"
												>
													Medi-Cal
												</Link>
											</li>
										</ul>
										{/* Blog Tags Post List */}
									</div>
									{/* Single Sidebar */}
									{/* Single Sidebar */}
									<div className="rounded-[10px] border border-[#EAEDF0] p-8">
										<div className="relative mb-[30px] inline-block pb-[10px] text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black">
											Subscribe
										</div>
										<p className="mb-3">
											Subscribe to our newsletter and get the latest news
											updates lifetime
										</p>
										<form action="#" method="post" className="flex flex-col">
											<input
												type="email"
												name="sidebar-newsletter"
												id="sidebar-newsletter"
												placeholder="Enter your email address"
												className="h-[60px] w-full rounded-[50px] border border-colorCodGray bg-transparent px-10 py-[15px] text-lg outline-none transition-all placeholder:text-black focus:border-colorViolet"
												required=""
											/>
											<button aria-label="Search"
												type="submit" aria-label="Submit"
												className="button mt-5 block rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white"
											>
												Subscribe Now
											</button>
										</form>
									</div>
									{/* Single Sidebar */}
								</aside>
								{/* Blog Aside */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Blog Section End :::... */}
			</main>
			<Footer_02/>
		</>
	);
}

export default Blog;
