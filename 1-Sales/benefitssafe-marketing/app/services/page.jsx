"use client";
import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import useAccordion from "@/components/hooks/useAccordion";
import Image from "next/image";
import Link from "next/link";

function Services() {
	const [activeIndex, handleAccordion] = useAccordion(0);

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
								<h1 className="breadcrumb-title">Our Services</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Service Section Start :::... */}
				<section id="section-service">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[150px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
								<div className="mx-auto max-w-md lg:max-w-xl xl:max-w-[950px]">
									<h2>Everything nonprofits need to disburse restricted funds safely</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* Service List */}
							<ul className="jos grid grid-cols-1 gap-[2px] overflow-hidden rounded-[10px] border-2 border-black bg-black sm:grid-cols-2 lg:grid-cols-4">
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-1.svg"
											alt="service-icon-black-1"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-1.svg"
											alt="service-icon-orange-1"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Resource Flexibility
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Issue Visa debit cards with built-in spending controls.
										Block merchants by category, set spending limits, and
										enforce curfews from one dashboard.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-2.svg"
											alt="service-icon-black-2"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-2.svg"
											alt="service-icon-orange-1"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Managed Services
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Track restricted funds across multiple grants with
										real-time balance monitoring. Every dollar is scoped to
										its grant, category, and beneficiary.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
									{/* Features Item */}
									{/* Features Item */}
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-3.svg"
											alt="service-icon-black-3"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-3.svg"
											alt="service-icon-orange-3"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Web-Based Access
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Five autonomous agents monitor your beneficiaries 24/7.
										Threshold warnings, transaction compliance, and funder
										reports generated automatically.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-4.svg"
											alt="service-icon-black-4"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-4.svg"
											alt="service-icon-orange-4"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Resource Flexibility
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Beneficiaries submit expenses, the compliance engine
										auto-classifies risk, and admins approve or reject with
										one click. Full audit trail included.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-5.svg"
											alt="service-icon-black-5"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-5.svg"
											alt="service-icon-orange-5"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Threshold Monitoring
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Detect when beneficiaries approach SSI asset limits. Get alerts
										before problems happen.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-6.svg"
											alt="service-icon-black-6"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-6.svg"
											alt="service-icon-orange-6"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Funder Reporting
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Auto-generate grant disbursement reports for funders.
										Weekly summaries, spending breakdowns, and compliance
										snapshots ready to send.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
									{/* Features Item */}
									{/* Features Item */}
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-7.svg"
											alt="service-icon-black-7"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-7.svg"
											alt="service-icon-orange-7"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Beneficiary Onboarding
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Onboard beneficiaries with benefit program tracking,
										eligibility screening, and OFAC compliance checks. Each
										beneficiary sees only their own data.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
								{/* Service Item */}
								<li className="group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-black">
									<div className="relative mb-9 h-[70px] w-[70px]">
										<Image
											src="/assets/img_placeholder/th-1/service-icon-black-8.svg"
											alt="service-icon-black-8"
											width={70}
											height={70}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/service-icon-orange-8.svg"
											alt="service-icon-orange-8"
											width={70}
											height={70}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</div>
									<h3 className="mb-4 block text-xl leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]">
										<Link
											href="#"
											className="hover:text-colorViolet"
										>
											Immutable Audit Trail
										</Link>
									</h3>
									<p className="mb-12 duration-300 group-hover:text-white">
										Every action is logged in an immutable audit trail.
										Expense approvals, card issuances, policy changes, and
										login events are permanently recorded.
									</p>
									<Link
										href="#"
										className="relative inline-block h-[30px] w-[30px] duration-300"
									>
										<Image
											src="/assets/img_placeholder/th-1/arrow-right-black.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
										/>
										<Image
											src="/assets/img_placeholder/th-1-violet/arrow-right-orange.svg"
											alt="arrow-right-black"
											width={30}
											height={30}
											className="absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100"
										/>
									</Link>
								</li>
								{/* Service Item */}
							</ul>
							{/* Service List */}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Service Section End :::... */}
				{/*...::: FAQ Section Start :::... */}
				<section className="faq-section">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[150px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
								{/* FAQ Left Block */}
								<div
									className="jos flex flex-col"
									data-jos_animation="fade-right"
								>
									{/* Section Content Block */}
									<div className="mb-6">
										<div className="mx-auto md:mx-0 md:max-w-none">
											<h2>Freely ask us for more information</h2>
										</div>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											BenefitsSafe can be set up in under 24 hours, enabling
											nonprofits to start disbursing funds compliantly without
											lengthy onboarding or complex integrations in mission-critical
											nonprofit operations.
										</p>
										<Link
											href="/contact"
											className="button mt-5 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white"
										>
											Ask a Question
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
											className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex == 0 && "active"
											}`}
										>
											<div
												onClick={() => handleAccordion(0)}
												className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]"
											>
												<p>How do I get started with BenefitsSafe?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														alt="plus"
														width={24}
														height={24}
													/>
												</div>
											</div>
											<div className="accordion-content text-[#2C2C2C]">
												<p>
													Sign up at benefitssafe.com and
													create your organization. You'll need to provide your
													EIN, connect a bank account, and you're ready to issue cards.
												</p>
											</div>
										</li>
										{/* Accordion items */}
										{/* Accordion items */}
										<li
											className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex == 1 && "active"
											}`}
										>
											<div
												onClick={() => handleAccordion(1)}
												className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]"
											>
												<p>Can I customize compliance rules for my state?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														alt="plus"
														width={24}
														height={24}
													/>
												</div>
											</div>
											<div className="accordion-content text-[#2C2C2C]">
												<p>
													Sign up at benefitssafe.com and
													create your organization. You'll need to provide your
													EIN, connect a bank account, and you're ready to issue cards.
												</p>
											</div>
										</li>
										{/* Accordion items */}
										{/* Accordion items */}
										<li
											className={`accordion-item border-b-[1px] border-[#DBD6CF] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
												activeIndex == 2 && "active"
											}`}
										>
											<div
												onClick={() => handleAccordion(2)}
												className="accordion-header flex items-center justify-between font-dmSans text-xl font-bold leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]"
											>
												<p>How does BenefitsSafe protect beneficiaries?</p>
												<div className="accordion-icon">
													<Image
														src="/assets/img_placeholder/plus.svg"
														alt="plus"
														width={24}
														height={24}
													/>
												</div>
											</div>
											<div className="accordion-content text-[#2C2C2C]">
												<p>
													Sign up at benefitssafe.com and
													create your organization. You'll need to provide your
													EIN, connect a bank account, and you're ready to issue cards.
												</p>
											</div>
										</li>
									</ul>
									{/* Accordion*/}
								</div>
								{/* FAQ Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: FAQ Section End :::... */}
				{/*...::: Testimonial Section Start :::... */}
				<section className="testimonial-section">
					{/* Section Spacer */}
					<div className="bg-black pb-40 pt-20 xl:pb-[200px] xl:pt-[130px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
								<div className="mx-auto max-w-[300px] lg:max-w-[600px] xl:max-w-[680px]">
									<h2 className="text-white">
										Positive feedback from our users
									</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* Testimonial List */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-left"
									data-jos_delay="0.1"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;We switched from paper checks to virtual cards and cut our disbursement time from 2 weeks to 2 minutes.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-1.jpg"
												alt="Finance Director testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Finance Director
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Community Foundation
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-left"
									data-jos_delay="0.2"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;The free tier gave us everything we needed to start. When we grew past 10 beneficiaries, upgrading was a no-brainer.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-2.jpg"
												alt="Executive Director testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Executive Director
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Mutual Aid Collective
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-left"
									data-jos_delay="0.3"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;Our last case manager left with six months of client knowledge. With BenefitsSafe, the system remembers everything.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-3.jpg"
												alt="Operations Manager testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Operations Manager
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Social Services Agency
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-right"
									data-jos_delay="0.1"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;True Link wanted $600/month for 50 cards. BenefitsSafe gives us 50 cards for $49.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-4.jpg"
												alt="Treasurer testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Treasurer
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Faith-Based Nonprofit
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-right"
									data-jos_delay="0.2"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;We used to spend 20 hours a month on grant compliance reports. Now they&apos;re ready when I log in Monday morning.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-5.webp"
												alt="Program Director testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Program Director
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Housing Nonprofit
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
								{/* Testimonial Item */}
								<div
									className="jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-colorCodGray p-[30px] text-white"
									data-jos_animation="fade-right"
									data-jos_delay="0.3"
								>
									<div className="block">
										<Image
											src="/assets/img_placeholder/th-1-violet/rating.svg"
											alt="rating"
											width={146}
											height={25}
										/>
									</div>
									<p>
										&ldquo;A beneficiary&apos;s family deposited a birthday check that almost pushed her over the SSI limit. BenefitsSafe caught it before we did.&rdquo;
									</p>
									<div className="flex items-center gap-x-4">
										<div className="h-[60px] w-[60px] overflow-hidden rounded-full">
											<Image
												src="/assets/img_placeholder/homepage-assets/face-6.jpg"
												alt="Case Manager testimonial"
												width={60}
												height={60}
												className="h-full w-full object-cover object-center"
											/>
										</div>
										<div className="flex flex-col gap-y-1">
											<span className="block text-lg font-semibold leading-[1.6]">
												Case Manager
											</span>
											<span className="block text-sm font-light leading-[1.4]">
												Disability Services
											</span>
										</div>
									</div>
								</div>
								{/* Testimonial Item */}
							</div>
							{/* Testimonial List */}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Testimonial Section Start :::... */}
			</main>
			<Footer_02 />
		</>
	);
}

export default Services;
