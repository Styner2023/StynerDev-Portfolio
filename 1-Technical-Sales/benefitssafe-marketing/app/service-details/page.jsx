"use client";
import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ServiceDetails() {
	// To open the lightbox change the value of the "toggler" prop.
	const [toggler, setToggler] = useState(false);

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
								<h1 className="breadcrumb-title">SentinelLayer: Your Invisible Compliance Brain</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Content Section Start :::... */}
				<section id="content-section-1">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[150px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28">
								{/* Content Left Block */}
								<div
									className="jos order-2 overflow-hidden rounded-md"
									data-jos_animation="fade-left"
								>
									<Image
										src="/assets/img_placeholder/th-1/content-image-1.jpg"
										alt="SentinelLayer architecture"
										width={526}
										height={450}
										className="h-auto w-full"
									/>
								</div>
								{/* Content Left Block */}
								{/* Content Right Block */}
								<div className="jos order-1" data-jos_animation="fade-right">
									{/* Section Content Block */}
									<div className="mb-6">
										<h2>Your staff can leave. Your compliance never does.</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											SentinelLayer is five autonomous AI agents that monitor every beneficiary, every transaction, and every grant disbursement around the clock. When thresholds approach or compliance issues emerge, SentinelLayer alerts your team with specific numbers and recommended actions.
										</p>
									</div>
									<ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
										<li className="flex flex-col gap-y-4">
											<div className="h-[50px] w-[50px]">
												<Image
													src="/assets/img_placeholder/th-1-violet/trending-up-icon.svg"
													alt="Watchdog agent"
													width={50}
													height={50}
													className="h-full w-full object-cover"
												/>
											</div>
											<h5>Watchdog Agent</h5>
											<p className="text-lg">
												Daily monitoring of SSI, SSDI, Medi-Cal, and CalFresh thresholds for every beneficiary, with 2025 California numbers built in.
											</p>
										</li>
										<li className="flex flex-col gap-y-4">
											<div className="h-[50px] w-[50px]">
												<Image
													src="/assets/img_placeholder/th-1-violet/cog-icon.svg"
													alt="Compliance agent"
													width={50}
													height={50}
													className="h-full w-full object-cover"
												/>
											</div>
											<h5>Compliance Monitor</h5>
											<p className="text-lg">
												Real-time MCC blocking on every card transaction, plus 6-hour deep scans that catch patterns humans miss.
											</p>
										</li>
									</ul>
								</div>
								{/* Content Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Content Section End :::... */}
				{/*...::: Content Section Start :::... */}
				<section id="content-section-2">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[150px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
								<div className="mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-[950px]">
									<h2>How the five SentinelLayer agents work together</h2>
								</div>
							</div>
							{/* Section Content Block */}
							<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,_1fr)_1.2fr] xl:gap-28 xxl:gap-32">
								{/* Content Left Block */}
								<div
									className="jos order-2 overflow-hidden rounded-md md:order-1"
									data-jos_animation="fade-left"
								>
									<Image
										src="/assets/img_placeholder/th-1/content-image-4.jpg"
										alt="SentinelLayer agents"
										width={529}
										height={500}
										className="h-auto w-full"
									/>
								</div>
								{/* Content Left Block */}
								{/* Content Right Block */}
								<div
									className="jos order-1 md:order-2"
									data-jos_animation="fade-right"
								>
									<ul className="flex flex-col gap-y-6">
										<li>
											<h5 className="mb-[10px]">
												1. Case Managers &amp; Program Staff:
											</h5>
											<p className="mb-7 last:mb-0">
												Receive daily threshold alerts with specific numbers. Review flagged expenses with risk classifications already applied. Act on recommendations, not spreadsheets.
											</p>
										</li>
										<li>
											<h5 className="mb-[10px]">
												2. Grant Writers &amp; Finance Officers:
											</h5>
											<p className="mb-7 last:mb-0">
												Weekly auto-drafted funder reports open in your inbox. Spending breakdowns by category, beneficiary impact summaries, and compliance proof — all pre-generated.
											</p>
										</li>
										<li>
											<h5 className="mb-[10px]">
												3. Platform Administrators:
											</h5>
											<p className="mb-7 last:mb-0">
												Oversee fleet-wide compliance health. Export audit-ready reports. Configure custom policy rules at the organization level.
											</p>
										</li>
									</ul>
								</div>
								{/* Content Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Content Section End :::... */}
				{/*...::: Funfact Section Start :::... */}
				<section id="funfact-section">
					<div className="mx-auto max-w-[1500px] px-5">
						<div className="jos grid grid-cols-1 overflow-hidden rounded-[30px] bg-black lg:rounded-[50px] xl:grid-cols-[minmax(400px,_1fr)_1.5fr] xxl:grid-cols-[1fr_minmax(800px,_1fr)]">
							{/* Funfact Left Block */}
							<div className="relative overflow-hidden rounded-[30px] lg:rounded-[50px]">
								<Image
									src="/assets/img_placeholder/th-1/funfact-image.jpg"
									alt="SentinelLayer dashboard"
									width={721}
									height={784}
									className="h-80 w-full object-cover object-center lg:h-[35rem] xl:h-full"
								/>
								{/* Video Play Button */}
								<button className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
									<div
										onClick={() => setToggler(!toggler)}
										className="relative flex h-[120px] w-[120px] items-center justify-center rounded-full border-[3px] border-black text-lg font-bold backdrop-blur-[2px] transition-all duration-300 hover:bg-colorViolet hover:text-white"
									>
										Play
										<div className="absolute -z-[1] h-[110%] w-[110%] animate-[ping_1.5s_ease-in-out_infinite] rounded-full bg-gray-600 opacity-30"></div>
									</div>
								</button>
								{/* Video Play Button */}
							</div>
							{/* Video lightbox removed — will add BenefitsSafe video later */}
							{/* Funfacct Left Block */}
							{/* Funfact Right Block */}
							<div className="self-center px-6 py-16 sm:py-20 md:px-16 xl:px-10 xl:py-24 xxl:py-32 xxl:pl-16 xxl:pr-28">
								{/* Section Content Block */}
								<div className="mb-8 lg:mb-16 xl:mb-6">
									<h2 className="text-white">
										Built to replace the spreadsheets nonprofits never should have used
									</h2>
								</div>
								{/* Section Content Block */}
								<div className="text-left text-lg leading-[1.4] text-white lg:text-[21px]">
									<p className="mb-7 last:mb-0">
										Nonprofit staff (humans) use BenefitsSafe (the product) while SentinelLayer (the invisible brain) runs compliance checks, threshold monitoring, and reporting — all without being asked.
									</p>
								</div>
								{/* Horizontal Separator */}
								<div className="my-14 h-[1px] w-full bg-colorCodGray" />
								{/* Counter Scroll */}
								<ul className="flex flex-col justify-center gap-x-11 gap-y-8 text-center sm:flex-row md:text-left xl:justify-normal xl:text-left xxl:gap-x-20">
									{/* Counter Items */}
									<li>
										<h3
											className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]"
											data-module="countup"
										>
											<span className="start-number" data-countup-number={92}>
												92
											</span>
											%
										</h3>
										<span className="block text-lg font-normal text-white lg:text-[21px]">
											Transactions scanned automatically
										</span>
									</li>
									{/* Counter Items */}
									{/* Counter Items */}
									<li>
										<h3
											className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]"
											data-module="countup"
										>
											<span className="start-number" data-countup-number={75}>
												75
											</span>
											%
										</h3>
										<span className="block text-lg font-normal text-white lg:text-[21px]">
											Reduction in manual review time
										</span>
									</li>
									{/* Counter Items */}
								</ul>
								{/* Counter Scroll */}
							</div>
							{/* Funfact Right Block */}
						</div>
					</div>
				</section>
				{/*...::: Funfact Section End :::... */}
				{/*...::: Content Section Start :::... */}
				<section id="content-section-3">
					{/* Section Spacer */}
					<div className="pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28">
								{/* Content Left Block */}
								<div
									className="jos order-2 overflow-hidden rounded-md"
									data-jos_animation="fade-left"
								>
									<Image
										src="/assets/img_placeholder/th-1/content-image-1.jpg"
										alt="Grant Reporter agent"
										width={526}
										height={450}
										className="h-auto w-full"
									/>
								</div>
								{/* Content Left Block */}
								{/* Content Right Block */}
								<div className="jos order-1" data-jos_animation="fade-right">
									{/* Section Content Block */}
									<div className="mb-6">
										<h2>Grant Reporter works while you sleep</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											Every week, the Grant Reporter agent assembles disbursement summaries for every active grant. Your grant writer opens BenefitsSafe Monday morning and the report is 80% done — just add narrative and send. SentinelLayer can automate many aspects of compliance monitoring and report generation, saving your team hours every week.
										</p>
									</div>
									<ul className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-1 xl:mt-14 xl:grid-cols-2">
										<li className="flex flex-col gap-y-4">
											<div className="h-[50px] w-[50px]">
												<Image
													src="/assets/img_placeholder/th-1-violet/icon-orange-clock.svg"
													alt="Watchdog agent"
													width={50}
													height={50}
													className="h-full w-full object-cover"
												/>
											</div>
											<h5>Trial Monitor</h5>
											<p className="text-lg">
												Watches subscription trials and sends handoff alerts 3 days before expiry. Your account manager never misses a renewal conversation.
											</p>
										</li>
										<li className="flex flex-col gap-y-4">
											<div className="h-[50px] w-[50px]">
												<Image
													src="/assets/img_placeholder/th-1-violet/icon-orange-cursor-click.svg"
													alt="Compliance agent"
													width={50}
													height={50}
													className="h-full w-full object-cover"
												/>
											</div>
											<h5>Onboarding Coordinator</h5>
											<p className="text-lg">
												Coming soon: guides new nonprofits through onboarding steps, bank connection, and first virtual card issuance — automatically.
											</p>
										</li>
									</ul>
								</div>
								{/* Content Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Content Section End :::... */}
				{/*...::: About Contact Section Start :::... */}
				<section id="about-conact">
					{/* Section Spacer */}
					<div className="bg-black pb-40 pt-20 xl:pb-[200px] xl:pt-[130px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,_1fr)_1.4fr]">
								{/* Content Left Block */}
								<div
									className="jos order-2 overflow-hidden rounded-[20px] md:order-1"
									data-jos_animation="fade-left"
								>
									<Image
										src="/assets/img_placeholder/th-1/about-contact-img.jpg"
										alt="BenefitsSafe platform"
										width={526}
										height={550}
										className="h-auto w-full"
									/>
								</div>
								{/* Content Left Block */}
								{/* Content Right Block */}
								<div
									className="jos order-1 md:order-2"
									data-jos_animation="fade-down"
								>
									{/* Section Content Block */}
									<div className="mb-8 max-w-sm md:max-w-max lg:mb-16 xl:mb-6">
										<h2 className="text-white">
											Ready to bring SentinelLayer to your nonprofit?
										</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-left text-lg leading-[1.4] text-white lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											AI accessible and beneficial for organizations, and we
											look forward to partnering with businesses to achieve
											their AI goals.
										</p>
									</div>
									<ul className="mt-10 flex flex-col gap-6 font-dmSans text-[30px] tracking-[1.33] lg:mt-14 lg:gap-y-3 xl:mt-[70px]">
										<li className="flex flex-col gap-x-2 leading-tight text-colorViolet lg:flex-row lg:leading-normal">
											Website:
											<Link
												rel="noopener noreferrer"
												href="https://benefitssafe.com"
												className="text-white hover:text-colorViolet"
											>
												benefitssafe.com
											</Link>
										</li>
										<li className="flex flex-col gap-x-2 leading-tight text-colorViolet lg:flex-row lg:leading-normal">
											Email:
											<Link
												href="mailto:support@benefitssafe.com"
												className="text-white hover:text-colorViolet"
											>
												support@benefitssafe.com
											</Link>
										</li>
										<li className="flex flex-col gap-x-2 leading-tight text-colorViolet lg:flex-row lg:leading-normal">
											Location:
											<Link
												href="/contact"
												className="text-white hover:text-colorViolet"
											>
												Oakland, California
											</Link>
										</li>
									</ul>
								</div>
								{/* Content Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: About Contact Section End :::... */}
			</main>
			<Footer_02 />
		</>
	);
}

export default ServiceDetails;
