import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import Image from "next/image";
import Link from "next/link";

function TeamDetails() {
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
								<h1 className="breadcrumb-title">Join the BenefitsSafe Team</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: Team Details Section Start :::... */}
				<section id="team-details-section">
					{/* Section Spacer */}
					<div className="pb-40 xl:pb-[220px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Team Details Top Block*/}
							<div className="grid items-center gap-x-16 gap-y-16 md:grid-cols-2 lg:grid-cols-[minmax(0,_1.2fr)_auto] xl:gap-x-20 xxl:gap-x-32">
								{/* Team Content Left Block */}
								<div
									className="jos order-2 md:order-1"
									data-jos_animation="fade-left"
								>
									{/* Section Content Block */}
									<div className="mb-6">
										<h2>We&apos;re hiring for roles that protect people</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											We're building technology that protects the most vulnerable members of our communities. Our small, mission-driven team is looking for engineers, compliance specialists, and partnership leads who share that mission.
										</p>
										<p className="mb-7 last:mb-0">
											Every engineer we hire will help a nonprofit disburse grants without their beneficiaries losing SSI. Every partnership we form brings compliance-safe infrastructure to more communities. Remote-friendly, competitive compensation, and generous equity for founding team members.
										</p>
										<p className="mb-7 font-semibold last:mb-0">
											What we look for in every hire:
										</p>
									</div>
								</div>
								{/* Team Content Left Block */}
								{/* team Content Right Block */}
								<div
									className="jos order-1 md:order-2"
									data-jos_animation="fade-right"
								>
									{/* Team Member Item */}
									<div className="rounded-[20px] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.05)] p-[20px]">
										<div className="xl:h[300px] w-full overflow-hidden rounded-[20px] xxl:h-[400px]">
											<Image
												src="/assets/img_placeholder/th-1/team-member-img-1.jpg"
												alt="Join BenefitsSafe"
												width={376}
												height={400}
												className="h-full w-full object-cover"
											/>
										</div>
										<div className="mt-5">
											<div className="mt-3 flex flex-col justify-between gap-3 xxl:flex-row xxl:flex-wrap xxl:items-center">
												<h4 className="text-[21px] leading-[1.33]">
													Remote &mdash; Oakland HQ
												</h4>
												<ul className="mt-auto flex gap-x-[15px]">
													<li>
														<Link
															rel="noopener noreferrer"
															href="http://www.facebook.com"
															className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorViolet"
														>
															<Image
																src="/assets/img_placeholder/th-1/facebook-icon-white.svg"
																alt="facebook"
																width={14}
																height={14}
																className="opacity-100 group-hover:opacity-0"
															/>
															<Image
																src="/assets/img_placeholder/th-1/facebook-icon-black.svg"
																alt="facebook"
																width={14}
																height={14}
																className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
															/>
														</Link>
													</li>
													<li>
														<Link
															rel="noopener noreferrer"
															href="http://www.twitter.com"
															className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorViolet"
														>
															<Image
																src="/assets/img_placeholder/th-1/twitter-icon-white.svg"
																alt="twitter"
																width={14}
																height={14}
																className="opacity-100 group-hover:opacity-0"
															/>
															<Image
																src="/assets/img_placeholder/th-1/twitter-icon-black.svg"
																alt="twitter"
																width={14}
																height={14}
																className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
															/>
														</Link>
													</li>
													<li>
														<Link
															rel="noopener noreferrer"
															href="http://www.linkedin.com"
															className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorViolet"
														>
															<Image
																src="/assets/img_placeholder/th-1/linkedin-icon-white.svg"
																alt="linkedin"
																width={14}
																height={14}
																className="opacity-100 group-hover:opacity-0"
															/>
															<Image
																src="/assets/img_placeholder/th-1/linkedin-icon-black.svg"
																alt="linkedin"
																width={14}
																height={14}
																className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
															/>
														</Link>
													</li>
													<li>
														<Link
															rel="noopener noreferrer"
															href="http://www.instagram.com"
															className="group relative flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-black hover:bg-colorViolet"
														>
															<Image
																src="/assets/img_placeholder/th-1/instagram-icon-white.svg"
																alt="instagram"
																width={14}
																height={14}
																className="opacity-100 group-hover:opacity-0"
															/>
															<Image
																src="/assets/img_placeholder/th-1/instagram-icon-black.svg"
																alt="instagram"
																width={14}
																height={14}
																className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
															/>
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
									{/* Team Member Item */}
								</div>
								{/* team Content Right Block */}
							</div>
							{/* Team Details Top Block*/}
							{/* Horizontal Separator */}
							<div className="my-20 h-[1px] w-full bg-[#EAEDF0]" />
							{/* Horizontal Separator */}
							{/* Team Details Bottom Block*/}
							<div>
								{/* Team Member Skill List */}
								<ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.1"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											1. Mission alignment:
										</div>
										<p>
											You understand why protecting government benefits matters — and you want to work on something that impacts real lives, not shareholder slides.
										</p>
									</li>
									{/* Team Member Skill Item */}
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.2"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											2. Nonprofit empathy:
										</div>
										<p>
											You've worked with or for nonprofits and you understand their constraints: limited budgets, overworked staff, high stakes on every decision.
										</p>
									</li>
									{/* Team Member Skill Item */}
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.3"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											3. Fintech discipline:
										</div>
										<p>
											You take financial data seriously. Every transaction is immutable, every audit trail is permanent, every compliance check has to work the first time.
										</p>
									</li>
									{/* Team Member Skill Item */}
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.4"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											4. Strong ownership:
										</div>
										<p>
											You ship without being asked. You know the difference between done and shipped, between working and trustworthy.
										</p>
									</li>
									{/* Team Member Skill Item */}
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.5"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											5. Clear communication:
										</div>
										<p>
											You explain technical concepts to case managers, compliance decisions to executives, and product tradeoffs to funders — all in the same week.
										</p>
									</li>
									{/* Team Member Skill Item */}
									{/* Team Member Skill Item */}
									<li
										className="jos flex flex-col gap-y-4 lg:text-[21px]"
										data-jos_delay="0.6"
									>
										<div className="text-2xl lg:text-3xl font-bold leading-[1.4] -tracking-[1px]">
											6. Long-term thinking:
										</div>
										<p>
											You understand that building financial infrastructure is a 10-year project, not a 10-month sprint. You're in it for the mission, not the exit.
										</p>
									</li>
									{/* Team Member Skill Item */}
								</ul>
								{/* Team Member Skill List */}
							</div>
							{/* Team Details Bottom Block*/}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Team Details Section End :::... */}
			</main>
			<Footer_02 />
		</>
	);
}

export default TeamDetails;
