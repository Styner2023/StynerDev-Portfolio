"use client";
import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import useAccordion from "@/components/hooks/useAccordion";
import useTabs from "@/components/hooks/useTabs";
import Image from "next/image";
import Link from "next/link";

function Pricing() {
	const [activeTab, handleTab] = useTabs();

	const [activeIndex, handleAccordion] = useAccordion();
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
								<h1 className="breadcrumb-title">Pricing that scales with your mission</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Pricing Section Start :::... */}
				<section className="pricing-section">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[150px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-12">
								<div className="mx-auto max-w-md lg:max-w-3xl xl:max-w-[950px]">
									<h2>Community is free forever. Paid plans start at $49.</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* Pricing Block */}
							<div className="container mx-auto">
								{/* Tab buttons */}
								<div className="jos flex justify-center" data-jos_delay="0.3">
									<div className="inline-flex space-x-4 rounded-[50px] border-2 border-black font-semibold">
										<button
											className={`tab-button price-button ${
												activeTab === 0 ? "active" : ""
											}`}
											onClick={() => handleTab(0)}
											data-tab="monthly"
										>
											Monthly
										</button>
										<button
											className={`tab-button price-button ${
												activeTab === 1 ? "active" : ""
											}`}
											onClick={() => handleTab(1)}
											data-tab="annually"
										>
											Annually
										</button>
									</div>
								</div>
								{/* Pricing Block */}
								<div className="mt-12 lg:mt-16 xl:mt-20">
									{/* Price List */}
									{activeTab === 0 && (
										<ul
											id="monthly"
											className="tab-content grid grid-cols-1 gap-6 md:grid-cols-2 xxl:grid-cols-4"
										>
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Community
												</h3>
												<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													10 beneficiaries, 5 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$0
													<span className="text-lg font-semibold">
														/Per month
													</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Free forever. 10 beneficiaries, 5 grants, daily SentinelLayer monitoring, CSV export.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Daily SentinelLayer monitoring
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Real-time MCC blocking
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														CSV export
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/auth/register?plan=community"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Seed
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																50 beneficiaries, 15 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$49
													<span className="text-lg font-semibold">
														/Per month
													</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													For small nonprofits running their first restricted-fund grants with Gmail automation.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														50 beneficiaries, 15 grants
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														3 staff expense cards
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Gmail automation + PDF export
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=seed"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Core
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																200 beneficiaries, 50 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$99
													<span className="text-lg font-semibold">
														/Per month
													</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Growing orgs that need full compliance automation, funder-ready reports, and POMS checks.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Full Compliance Monitor (6hr scans)
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														10 staff cards, POMS checker
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready reports
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready Reports
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=core"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Network
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																500 beneficiaries, 100 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$199
													<span className="text-lg font-semibold">
														/Per month
													</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Larger networks managing multi-grant compliance with all SentinelLayer agents and API access.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														All SentinelLayer agents
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														50 staff cards + API access
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Priority support
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready Reports
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Multi-org Management
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=network"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
										</ul>
									)}
									{/* Price List */}

									{/* Price List */}
									{activeTab === 1 && (
										<ul
											id="annually"
											className="tab-content grid grid-cols-1 gap-6 md:grid-cols-2 xxl:grid-cols-4"
										>
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Community
												</h3>
												<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													10 beneficiaries, 5 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$0
													<span className="text-lg font-semibold">/Annual</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Free forever. 10 beneficiaries, 5 grants, daily SentinelLayer monitoring, CSV export.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Daily SentinelLayer monitoring
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Real-time MCC blocking
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														CSV export
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/auth/register?plan=community"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Seed
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																50 beneficiaries, 15 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$470
													<span className="text-lg font-semibold">/Annual</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													For small nonprofits running their first restricted-fund grants with Gmail automation.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														50 beneficiaries, 15 grants
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														3 staff expense cards
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Gmail automation + PDF export
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=seed"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Core
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																200 beneficiaries, 50 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$950
													<span className="text-lg font-semibold">/Annual</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Growing orgs that need full compliance automation, funder-ready reports, and POMS checks.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Full Compliance Monitor (6hr scans)
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														10 staff cards, POMS checker
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready reports
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready Reports
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=core"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
											{/* Price Item */}
											<li
												className="jos group flex flex-col rounded-[10px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] p-[30px] transition-all duration-300 ease-linear hover:bg-colorCodGray"
												data-jos_animation="flip"
												data-jos_delay={0}
											>
												<h3 className="flex flex-wrap font-dmSans text-[28px] font-bold leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white">
													Network
															</h3>
															<span className="text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
																500 beneficiaries, 100 grants
												</span>
												<div className="my-5 h-[1px] w-full bg-[#EAEDF0]" />
												<h4 className="mb-4 flex flex-col font-dmSans text-5xl font-bold leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]">
													$1910
													<span className="text-lg font-semibold">/Annual</span>
												</h4>
												<p className="mb-6 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white">
													Larger networks managing multi-grant compliance with all SentinelLayer agents and API access.
												</p>
												{/* Price Info List */}
												<ul className="mb-10 flex flex-col gap-y-3">
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														All SentinelLayer agents
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														50 staff cards + API access
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Priority support
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Compliance Automation
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Funder-ready Reports
													</li>
													<li className="flex items-center gap-x-3 font-bold group-hover:text-white">
														<div className="relative h-[24px] w-[24px]">
															<Image
																src="/assets/img_placeholder/th-1/icon-black-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="h-full w-full object-cover"
															/>
															<Image
																src="/assets/img_placeholder/th-1-violet/icon-orange-badge-check.svg"
																alt="icon-black-badge-check"
																width={24}
																height={24}
																className="absolute inset-0 left-0 top-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
															/>
														</div>
														Multi-org Management
													</li>
												</ul>
												{/* Price Info List */}
												<a
													href="https://app.benefitssafe.com/api/billing/checkout-direct?plan=network"
													className="button mt-auto block rounded-[50px] border-2 border-black bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white"
												>
													Start Free Trial
												</a>
											</li>
											{/* Price Item */}
										</ul>
									)}
									{/* Price List */}
								</div>
								{/* Pricing Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Pricing Section End :::... */}
				{/*...::: FAQ Section Start :::... */}
				<section className="faq-section">
					{/* Section Spacer */}
					<div className="pb-40 xl:pb-[200px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
								{/* FAQ Left Block */}
								<div
									className="jos flex flex-col"
									data-jos_animation="fade-right"
								>
									{/* Section Content Block */}
									<div className="mb-8 text-left lg:mb-16 xl:mb-6">
										<div className="mx-auto md:mx-0 md:max-w-none">
											<h2>Have questions about our pricing?</h2>
										</div>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											Compare plans, ask about custom Enterprise pricing, or get help choosing the right tier for your nonprofit. We respond within one business day.
										</p>
										<Link
											href="/faq"
											className="button mt-5 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white"
										>
											Ask your questions
										</Link>
									</div>
								</div>
								{/* FAQ Left Block */}
								{/* FAQ Right Block */}
								<div
									className="jos md:ml-10 lg:ml-20 xl:ml-32"
									data-jos_animation="fade-left"
								>
									{/* Accordion*/}
									<ul className="accordion">
										{/* Accordion items */}
										<li
											onClick={() => handleAccordion(0)}
											className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex === 0 ? "active" : ""
											}`}
										>
											<div className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]">
												<p>What happens after my 14-day trial?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														width={24}
														height={24}
														alt="plus"
													/>
												</div>
											</div>
											<div className="accordion-content disappear translate-y-3 text-lg leading-[1.66] text-[#2C2C2C]">
												<p>
													You choose a paid plan or automatically move to our free Community tier (10 beneficiaries, daily monitoring). You never lose access to basic protection.
												</p>
											</div>
										</li>
										{/* Accordion items */}
										{/* Accordion items */}
										<li
											onClick={() => handleAccordion(1)}
											className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex === 1 ? "active" : ""
											}`}
										>
											<div className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]">
												<p>Can I switch plans later?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														width={24}
														height={24}
														alt="plus"
													/>
												</div>
											</div>
											<div className="accordion-content disappear translate-y-3 text-lg leading-[1.66] text-[#2C2C2C]">
												<p>
													Yes. Upgrade, downgrade, or switch annual/monthly anytime from your billing dashboard. Annual plans include roughly 4 months free vs monthly.
												</p>
											</div>
										</li>
										{/* Accordion items */}
										{/* Accordion items */}
										<li
											onClick={() => handleAccordion(2)}
											className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex === 2 ? "active" : ""
											}`}
										>
											<div className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]">
												<p>Do you offer Enterprise pricing?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														width={24}
														height={24}
														alt="plus"
													/>
												</div>
											</div>
											<div className="accordion-content disappear translate-y-3 text-lg leading-[1.66] text-[#2C2C2C]">
												<p>
													Yes. Enterprise starts at $399/month with unlimited everything, white-label options, a dedicated account manager, and custom integrations. Contact us to discuss.
												</p>
											</div>
										</li>
									</ul>
								</div>
								{/* FAQ Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: FAQ Section End :::... */}
			</main>
			<Footer_02 />
		</>
	);
}

export default Pricing;
