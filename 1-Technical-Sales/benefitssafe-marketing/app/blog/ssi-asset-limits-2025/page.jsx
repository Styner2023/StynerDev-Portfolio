import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import Image from "next/image";
import Link from "next/link";

function SsiAssetLimits() {
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
								<h1 className="breadcrumb-title">What Every Case Manager Should Know About SSI Asset Limits in 2025</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Blog Section Start :::... */}
				<div className="blog-section">
					{/* Section Spacer */}
					<div className="pb-40 xl:pb-[220px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-[1fr,minmax(416px,_0.5fr)]">
								<div className="flex flex-col gap-y-10 lg:gap-y-14 xl:gap-y-20">
									{/* Blog Post Details */}
									<div className="flex flex-col gap-6">
										{/* Blog Post Text Area */}
										<article className="jos overflow-hidden bg-white">
											<div className="mb-7 block overflow-hidden rounded-[10px] max-h-[700px]">
												<Image
													src="/assets/img_placeholder/homepage-assets/36.webp"
													alt="SSI Asset Limits in 2025"
													width={856}
													height={700}
													className="h-auto w-full scale-100 object-cover"
												/>
											</div>
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
														March 28, 2026
													</Link>
												</li>
											</ul>
											{/* Blog Post Meta */}
											<h5 className="mb-3 mt-5">
												What Every Case Manager Should Know About SSI Asset Limits in 2025
											</h5>
											<p className="mb-7 last:mb-0">
												For nonprofits managing restricted grant funds, every dollar disbursed carries a hidden risk: one wrong purchase could push a beneficiary over their SSI asset limit and cost them their benefits. Virtual debit cards with built-in spending controls are the modern solution — but they only work if you understand why traditional cash or reimbursement models fail.
											</p>
											<ul className="mb-7 flex flex-col gap-7 last:mb-0">
												<li>
													<div className="font-semibold">
														1. SSI asset limits are unforgiving
													</div>
													<p className="mb-7 last:mb-0">
														Supplemental Security Income (SSI) has a $2,000 resource limit for individuals. A single deposit that pushes a beneficiary over that threshold — even temporarily — can trigger benefit loss, repayment demands, and months of appeals. Rent, food, and shelter payments received by the beneficiary count as in-kind support and maintenance (ISM), reducing SSI by up to one-third.
													</p>
												</li>
												<li>
													<div className="font-semibold">
														2. Why cash to beneficiaries is dangerous
													</div>
													<p className="mb-7 last:mb-0">
														When a nonprofit reimburses a beneficiary directly or hands them cash for a purchase, the money passes through the beneficiary's pocket — and through SSA's accounting. It counts as income for SSI. The 'safer' path is direct-to-vendor payment: the nonprofit pays the merchant, the beneficiary never touches the money, and SSI eligibility stays intact.
													</p>
												</li>
												<li>
													<div className="font-semibold">
														3. How merchant category blocking (MCC) works
													</div>
													<p className="mb-7 last:mb-0">
														Every merchant has a Merchant Category Code (MCC) — a 4-digit classification Visa and Mastercard use. Grocery stores, liquor shops, casinos, and even cash advances each have distinct MCCs. Virtual cards issued through BenefitsSafe can block entire categories. A card issued for software subscriptions only accepts MCCs matching online services — declining at a grocery store automatically.
													</p>
												</li>
												<li>
													<div className="overflow-hidden rounded-[10px]">
														<Image
															src="/assets/img_placeholder/homepage-assets/25.png"
															alt="SSI compliance workflow"
															width={100}
															height={100}
															className="h-auto w-full"
														/>
													</div>
												</li>
												<li>
													<div className="font-semibold">
														4. Spending limits and curfews add a second layer
													</div>
													<p className="mb-7 last:mb-0">
														Beyond MCC blocking, BenefitsSafe cards enforce dollar caps (per transaction, per day, per month) and time-based curfews (no 2am purchases). If a card is compromised or misused, the spending cap prevents catastrophic loss. Curfews flag unusual patterns before they become problems.
													</p>
												</li>
												<li>
													<div className="font-semibold">
														5. SentinelLayer watches the thresholds you can&apos;t
													</div>
													<p className="mb-7 last:mb-0">
														Cards alone aren't enough. BenefitsSafe's SentinelLayer monitors every beneficiary's financial picture daily — across SSI, SSDI, Medi-Cal, and CalFresh. If a birthday check from family or a tax refund pushes someone near the $2,000 SSI limit, the system alerts their case manager with specific numbers and recommended actions.
													</p>
												</li>
											</ul>
											<div className="font-semibold">
												Key Takeaways for Nonprofit Case Managers
											</div>
											<ul className="mb-7 last:mb-0">
												<li className="relative pl-[30px] after:absolute after:left-[10px] after:top-3 after:h-[5px] after:w-[5px] after:rounded-[50%] after:bg-black">
													Never disburse cash directly to an SSI beneficiary. Pay vendors.
													analytics.
												</li>
												<li className="relative pl-[30px] after:absolute after:left-[10px] after:top-3 after:h-[5px] after:w-[5px] after:rounded-[50%] after:bg-black">
													Issue merchant-locked virtual cards per expense category.
												</li>
												<li className="relative pl-[30px] after:absolute after:left-[10px] after:top-3 after:h-[5px] after:w-[5px] after:rounded-[50%] after:bg-black">
													Set spending caps matched to grant budget categories.
												</li>
												<li className="relative pl-[30px] after:absolute after:left-[10px] after:top-3 after:h-[5px] after:w-[5px] after:rounded-[50%] after:bg-black">
													Monitor daily thresholds automatically with SentinelLayer.
												</li>
												<li className="relative pl-[30px] after:absolute after:left-[10px] after:top-3 after:h-[5px] after:w-[5px] after:rounded-[50%] after:bg-black">
													Document every transaction for immutable audit trail.
												</li>
											</ul>
											<p className="mb-7 last:mb-0">
												The combination of virtual cards, merchant category blocking, spending limits, and continuous threshold monitoring isn't just convenience — it's a protective architecture. When a nonprofit can prove every dollar went to an approved vendor, stayed inside compliance thresholds, and never passed through a beneficiary's account, benefits eligibility is preserved by design.
											</p>
											<p className="mb-7 last:mb-0">Ready to issue your first virtual card? Start your free BenefitsSafe trial today.</p>
										</article>
										{/* Blog Post Text Area */}
										{/* Blog Events */}
										<div className="jos flex justify-between gap-x-8">
											<div className="flex items-center gap-x-6">
												<button className="inline-flex items-center gap-x-1 text-[#121212]">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-outline-thumb-up.svg"
														alt="icon-black-outline-thumb-up"
														width={24}
														height={24}
													/>
													200
												</button>
												<button className="inline-flex items-center gap-x-1 text-[#121212]">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-outline-chat-alt.svg"
														alt="icon-black-outline-chat-alt"
														width={24}
														height={24}
													/>
													15
												</button>
											</div>
											<div className="flex items-center gap-x-6">
												<button className="inline-flex items-center gap-x-1 text-[#121212]">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-outline-share.svg"
														alt="icon-black-outline-share"
														width={24}
														height={24}
													/>
												</button>
												<button className="inline-flex items-center gap-x-1 text-[#121212]">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-outline-inbox-in.svg"
														alt="icon-black-outline-inbox-in"
														width={24}
														height={24}
													/>
												</button>
											</div>
										</div>
										{/* Blog Events */}
										{/* Horizontal Separator */}
										<div className="jos my-[30px] h-[1px] w-full bg-[#EAEDF0]" />
										{/* Horizontal Separator */}
										{/* Single Post Navigation */}
										<div className="jos flex flex-col justify-between md:flex-row md:gap-x-10 xl:gap-x-24 xxl:gap-x-[196px]">
											<Link href="/blog-details" className="group text-left">
												<span className="inline-flex items-center gap-x-3 text-[21px] font-bold transition-all duration-300 group-hover:text-colorViolet">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-cheveron-left.svg"
														alt="icon-black-cheveron-left.svg"
														width={24}
														height={24}
													/>
													Previous post
												</span>
												<p>
													The True Cost of Paper Check Disbursements
													descriptions: a game-changer
												</p>
											</Link>
											<Link href="/blog-details" className="group text-right">
												<span className="inline-flex flex-row-reverse items-center gap-x-3 text-[21px] font-bold transition-all duration-300 group-hover:text-colorViolet">
													<Image
														src="/assets/img_placeholder/th-1/icon-black-cheveron-right.svg"
														alt="icon-black-cheveron-right.svg"
														width={24}
														height={24}
													/>
													Next post
												</span>
												<p>
													What Every Case Manager Should Know About SSI Asset Limits
													plain-English guide to 2025 thresholds
												</p>
											</Link>
										</div>
										{/* Single Post Navigation */}
										{/* Blog Comment */}
										<div className="jos">
											<div className="mb-6 text-[24px] font-bold">
												2 comments on this post:
											</div>
											<ul className="flex flex-col gap-y-[30px]">
												{/* Single Comment List */}
												<li className="border-b border-[#EAEDF0] last:border-b-0">
													<div className="flex gap-x-5">
														{/* Comment User Image */}
														<div className="h-[80px] w-[80px] overflow-hidden rounded-full">
															<Image
																src="/assets/img_placeholder/homepage-assets/face-3.jpg"
																alt="blog-comment-large-user-img-1"
																width={80}
																height={80}
															/>
														</div>
														{/* Comment User Image */}
														{/* Comment Content */}
														<div className="flex flex-1 flex-col gap-y-4">
															{/* Comment User info */}
															<div className="flex items-center justify-between gap-x-5">
																<div className="flex flex-col gap-y-1">
																	<div className="font-bold">Program Director</div>
																	<div className="text-sm">June 14, 2024</div>
																</div>
																<button className="font-bold transition-all duration-300 hover:text-colorViolet">
																	Reply
																</button>
															</div>
															{/* Comment User info */}
															{/* Comment User Text */}
															<p className="max-w-[616px]">
																This is exactly the kind of clear explanation I send to every new case manager on my team. The MCC blocking example finally made spending controls click for them.
															</p>
															{/* Comment User Text */}
														</div>
														{/* Comment Content */}
													</div>
													{/* Comment Reply */}
													<ul className="mt-[30px] flex flex-col pl-8 sm:pl-32">
														{/* Comment Reply Item */}
														<li className="border-t border-[#EAEDF0] py-[30px]">
															<div className="flex gap-x-5">
																{/* Comment User Image */}
																<div className="h-[50px] w-[50px] overflow-hidden rounded-full">
																	<Image
																		src="/assets/img_placeholder/homepage-assets/face-4.jpg"
																		alt="blog-comment-large-user-img-1"
																		width={50}
																		height={50}
																	/>
																</div>
																{/* Comment User Image */}
																{/* Comment Content */}
																<div className="flex flex-1 flex-col gap-y-4">
																	{/* Comment User info */}
																	<div className="flex items-center justify-between gap-x-5">
																		<div className="flex flex-col gap-y-1">
																			<div className="font-bold">
																				Case Manager
																			</div>
																			<div className="text-sm">
																				June 15, 2024
																			</div>
																		</div>
																		<button className="font-bold transition-all duration-300 hover:text-colorViolet">
																			Reply
																		</button>
																	</div>
																	{/* Comment User info */}
																	{/* Comment User Text */}
																	<p className="max-w-[536px]">
																		Agreed. We rolled out virtual cards last quarter and the threshold alerts have already caught two near-misses. Worth every penny.
																	</p>
																	{/* Comment User Text */}
																</div>
																{/* Comment Content */}
															</div>
														</li>
														{/* Comment Reply Item */}
													</ul>
													{/* Comment Reply */}
												</li>
												{/* Single Comment List */}
											</ul>
										</div>
									</div>
									{/* Blog Post Details */}
									{/* Blog Comment Form */}
									<div className="jos">
										<div className="mb-6 text-[24px] font-bold">
											Leave a comment:
										</div>
										<div className="order-1 block rounded-lg bg-white px-[30px] py-[50px] shadow-[0_4px_60px_0_rgba(0,0,0,0.1)] md:order-2">
											{/* Comment Form */}
											<form
												action="#"
												method="post"
												className="flex flex-col gap-y-5"
											>
												{/* Form Group */}
												<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
													{/* Form Single Input */}
													<div className="flex flex-col gap-y-[10px]">
														<label
															htmlFor="comment-name"
															className="text-lg font-bold leading-[1.6]"
														>
															Enter your name
														</label>
														<input
															type="text"
															name="comment-name"
															id="comment-name"
															placeholder="Your name"
															className="placeholder:[#7F8995] rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-semibold text-black outline-none transition-all focus:border-colorViolet"
															required=""
														/>
													</div>
													{/* Form Single Input */}
													{/* Form Single Input */}
													<div className="flex flex-col gap-y-[10px]">
														<label
															htmlFor="comment-email"
															className="text-lg font-bold leading-[1.6]"
														>
															Email address
														</label>
														<input
															type="email"
															name="comment-email"
															id="comment-email"
															placeholder="example@gmail.com"
															className="placeholder:[#7F8995] rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-semibold text-black outline-none transition-all focus:border-colorViolet"
															required=""
														/>
													</div>
													{/* Form Single Input */}
												</div>
												{/* Form Group */}
												{/* Form Group */}
												<div className="grid grid-cols-1 gap-6">
													{/* Form Single Input */}
													<div className="flex flex-col gap-y-[10px]">
														<label
															htmlFor="comment-message"
															className="text-lg font-bold leading-[1.6]"
														>
															Message
														</label>
														<textarea
															name="comment-message"
															id="comment-message"
															className="placeholder:[#7F8995] min-h-[180px] rounded-[10px] border border-gray-300 bg-white px-6 py-[18px] font-semibold text-black outline-none transition-all focus:border-colorViolet"
															placeholder="Write your message here..."
															required=""
															defaultValue={"                            "}
														/>
													</div>
													{/* Form Single Input */}
												</div>
												<div className="">
													<button
														type="submit"
														className="button mt-5 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white"
													>
														Send your message
													</button>
												</div>
												{/* Form Group */}
											</form>
											{/* Comment Form */}
										</div>
									</div>
									{/* Blog Comment Form */}
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
											<button
												type="submit"
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
														src="/assets/img_placeholder/homepage-assets/36.webp"
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
														March 28, 2026
													</Link>
													<Link
														href="/blog-details"
														className="text-base font-bold hover:text-colorViolet"
													>
														Why Staff Turnover Doesn&apos;t Have to Mean Lost Knowledge
													</Link>
												</div>
											</li>
											<li className="group flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row">
												<Link
													href="/blog-details"
													className="inline-block h-[150px] w-full overflow-hidden rounded-[5px] sm:h-[100px] sm:w-[150px]"
												>
													<Image
														src="/assets/img_placeholder/homepage-assets/26.webp"
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
														BenefitsSafe vs True Link: What&apos;s the Difference?
													</Link>
												</div>
											</li>
											<li className="group flex flex-col items-center gap-x-4 gap-y-4 sm:flex-row">
												<Link
													href="/blog-details"
													className="inline-block h-[150px] w-full overflow-hidden rounded-[5px] sm:h-[100px] sm:w-[150px]"
												>
													<Image
														src="/assets/img_placeholder/homepage-assets/36.webp"
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
														How to Set Up a Grant Disbursement Program in 24 Hours
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
													Virtual Cards
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
											<button
												type="submit"
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
				</div>
				{/*...::: Blog Section End :::... */}
			</main>
			<Footer_02/>
		</>
	);
}

export default SsiAssetLimits;
