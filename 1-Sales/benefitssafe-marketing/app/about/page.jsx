import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import Image from "next/image";
import Link from "next/link";

function About() {
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
								<h1 className="breadcrumb-title">Our Mission: Protect the People Who Need It Most</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: About Us Section Start :::... */}
				<section id="about-hero-section">
					{/* Section Spacer */}
					<div className="mb-20 lg:mb-24">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-12 xl:mb-20">
								<div className="mx-auto md:max-w-xl lg:max-w-3xl xl:max-w-[950px]">
									<h2>Founded in Oakland, California, serving the 1.9 million US nonprofits managing funds for beneficiaries on SSI, SSDI, Medi-Cal, and CalFresh</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* About Hero Image */}
							<div
								className="jos overflow-hidden rounded-3xl"
								data-jos_animation="zoom"
							>
								<Image
									src="/assets/img_placeholder/homepage-assets/about-team.jpg"
									alt="BenefitsSafe team"
									width={1296}
									height={650}
									className="h-full w-full object-cover"
								/>
							</div>
							{/* About Hero Image */}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: About Us Section End :::... */}
				{/*...::: About Funfact Start :::... */}
				<section id="about-funfact-section">
					{/* Section Container */}
					<div className="global-container">
						{/* Counter Scroll */}
						<ul className="grid grid-cols-1 gap-10 gap-y-5 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
							{/* Counter Items */}
							<li className="jos" data-jos_delay="0.1">
								<h3
									className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-[80px]"
									data-module="countup"
								>
									<span className="start-number" data-countup-number={1.9}>
										1.9
									</span>
									M+
								</h3>
								<span className="block text-lg font-normal text-black">
									US nonprofits we serve
								</span>
							</li>
							{/* Counter Items */}
							{/* Counter Items */}
							<li className="jos" data-jos_delay="0.2">
								<h3
									className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-[80px]"
									data-module="countup"
								>
									<span className="start-number" data-countup-number={24}>
										24
									</span>
									/7
								</h3>
								<span className="block text-lg font-normal text-black">
									Autonomous compliance monitoring
								</span>
							</li>
							{/* Counter Items */}
							{/* Counter Items */}
							<li className="jos" data-jos_delay="0.3">
								<h3
									className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-[80px]"
									data-module="countup"
								>
									<span className="start-number" data-countup-number={4}>
										4
									</span>
								</h3>
								<span className="block text-lg font-normal text-black">
									Benefit programs monitored
								</span>
							</li>
							{/* Counter Items */}
							{/* Counter Items */}
							<li className="jos" data-jos_delay="0.4">
								<h3
									className="text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-[80px]"
									data-module="countup"
								>
									<span className="start-number" data-countup-number={10}>
										10
									</span>
									x
								</h3>
								<span className="block text-lg font-normal text-black">
									Cheaper than per-card competitors
								</span>
							</li>
							{/* Counter Items */}
						</ul>
						{/* Counter Scroll */}
					</div>
					{/* Section Container */}
				</section>
				{/*...::: About Funfact Start :::... */}
				{/*...::: Content Section Start :::... */}
				<section id="content-section-2">
					{/* Section Spacer */}
					<div className="pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]">
						{/* Section Container */}
						<div className="global-container">
							<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 xl:grid-cols-[minmax(0,_1.3fr)_1fr]">
								{/* Content Left Block */}
								<div
									className="jos order-2 overflow-hidden rounded-md"
									data-jos_animation="fade-left"
								>
									<Image
										src="/assets/img_placeholder/homepage-assets/about-mission.jpg"
										alt="BenefitsSafe platform"
										width={526}
										height={550}
										className="h-auto w-full"
									/>
								</div>
								{/* Content Left Block */}
								{/* Content Right Block */}
								<div className="jos order-1" data-jos_animation="fade-right">
									{/* Section Content Block */}
									<div className="mb-6">
										<h2>Compliance-grade fintech infrastructure for every nonprofit</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-lg leading-[1.4] lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											Our platform combines virtual card technology with
											autonomous AI monitoring to ensure every dollar is
											spent correctly and every beneficiary stays protected.
										</p>
										<p className="mb-7 last:mb-0">
											Nonprofits shouldn't need a six-figure legal
											retainer to disburse a grant safely. Federal and
											state compliance rules are built in, updated as
											regulations change, so your team can focus on mission.
										</p>
										<Link
											href="/contact"
											className="button mt-5 rounded-[50px] border-2 border-black bg-black py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white"
										>
											Get in touch
										</Link>
									</div>
								</div>
								{/* Content Right Block */}
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Content Section End :::... */}
				{/*...::: Core Value Section Start :::... */}
				<section id="core-value">
					{/* Section Spacer */}
					<div className="jos mx-5 rounded-[50px] bg-black px-[20px] py-20 sm:px-[50px] md:mx-[50px] lg:px-[100px] xl:py-[130px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="mb-10 text-center lg:mb-12 xl:mb-20">
								<div className="mx-auto md:max-w-xl lg:max-w-3xl xl:max-w-[745px]">
									<h2 className="text-white">
										The values that guide every decision
									</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* Horizontal Separator */}
							<div className="mb-6 h-[4px] w-full rounded bg-colorCodGray sm:mb-0" />
							{/* Core Value list */}
							<ul className="grid grid-cols-1 justify-between gap-6 md:grid-cols-2 xxl:flex xxl:flex-nowrap">
								{/* Core Value Item */}
								<li className="relative after:absolute after:-top-[3px] after:left-0 after:h-[5px] after:w-full after:scale-x-0 after:rounded-[5px] after:bg-colorViolet after:transition-all after:duration-300 hover:after:scale-x-0 sm:pt-6 lg:pt-10 xxl:hover:after:scale-x-100">
									<div className="mb-3 flex items-center gap-x-3 md:mb-6">
										<div className="h-[30px] w-[30px]">
											<Image
												src="/assets/img_placeholder/th-1-violet/core-value-icon-1.svg"
												alt="Protection First"
												width={30}
												height={30}
											/>
										</div>
										<h4 className="flex-1 text-white">Protection First</h4>
									</div>
									<p className="text-lg text-white lg:text-[21px]">
										Every feature starts with one question: does this protect the beneficiary?
									</p>
								</li>
								{/* Core Value Item */}
								{/* Core Value Item */}
								<li className="relative after:absolute after:-top-[3px] after:left-0 after:h-[5px] after:w-full after:scale-x-0 after:rounded-[5px] after:bg-colorViolet after:transition-all after:duration-300 hover:after:scale-x-0 sm:pt-6 lg:pt-10 xxl:hover:after:scale-x-100">
									<div className="mb-3 flex items-center gap-x-3 md:mb-6">
										<div className="h-[30px] w-[30px]">
											<Image
												src="/assets/img_placeholder/th-1-violet/core-value-icon-2.svg"
												alt="Compliance by Design"
												width={30}
												height={30}
											/>
										</div>
										<h4 className="flex-1 text-white">Compliance by Design</h4>
									</div>
									<p className="text-lg text-white lg:text-[21px]">
										Compliance is built into every card issuance, every transaction, every report.
										team
									</p>
								</li>
								{/* Core Value Item */}
								{/* Core Value Item */}
								<li className="relative after:absolute after:-top-[3px] after:left-0 after:h-[5px] after:w-full after:scale-x-0 after:rounded-[5px] after:bg-colorViolet after:transition-all after:duration-300 hover:after:scale-x-0 sm:pt-6 lg:pt-10 xxl:hover:after:scale-x-100">
									<div className="mb-3 flex items-center gap-x-3 md:mb-6">
										<div className="h-[30px] w-[30px]">
											<Image
												src="/assets/img_placeholder/th-1-violet/core-value-icon-3.svg"
												alt="Institutional Memory"
												width={30}
												height={30}
											/>
										</div>
										<h4 className="flex-1 text-white">Institutional Memory</h4>
									</div>
									<p className="text-lg text-white lg:text-[21px]">
										Your system remembers everything, even when staff turns over.
									</p>
								</li>
								{/* Core Value Item */}
								{/* Core Value Item */}
								<li className="relative after:absolute after:-top-[3px] after:left-0 after:h-[5px] after:w-full after:scale-x-0 after:rounded-[5px] after:bg-colorViolet after:transition-all after:duration-300 hover:after:scale-x-0 sm:pt-6 lg:pt-10 xxl:hover:after:scale-x-100">
									<div className="mb-3 flex items-center gap-x-3 md:mb-6">
										<div className="h-[30px] w-[30px]">
											<Image
												src="/assets/img_placeholder/th-1-violet/core-value-icon-4.svg"
												alt="Radical Accessibility"
												width={30}
												height={30}
											/>
										</div>
										<h4 className="flex-1 text-white">Radical Accessibility</h4>
									</div>
									<p className="text-lg text-white lg:text-[21px]">
										A church food pantry and a statewide foundation both deserve
										interactions
									</p>
								</li>
								{/* Core Value Item */}
							</ul>
							{/* Core Value list */}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Core Value Section End :::... */}
				{/*...::: Mission CTA Section Start :::... */}
				<section id="mission-cta">
					{/* Section Spacer */}
					<div className="py-20 xl:py-[130px]">
						<div className="global-container">
							<div className="jos rounded-[30px] bg-white shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] px-10 py-16 text-center lg:px-20 lg:py-24 xl:px-[150px]">
								<h2 className="mb-6 font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px]">
									Ready to protect your beneficiaries?
								</h2>
								<p className="mb-10 text-lg text-[#2C2C2C] mx-auto max-w-2xl">
									Join the nonprofits already using BenefitsSafe to disburse restricted grant funds without risking SSI, SSDI, or Medi-Cal eligibility. Start free with up to 10 beneficiaries.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<a
										href="https://app.benefitssafe.com/auth/register?plan=community"
										className="button rounded-[50px] border-2 border-colorViolet bg-colorViolet py-4 px-8 text-white after:bg-black hover:border-black hover:text-white"
									>
										Start Free Trial
									</a>
									<Link
										href="/contact"
										className="button rounded-[50px] border-2 border-black bg-transparent py-4 px-8 text-black after:bg-colorViolet hover:border-colorViolet hover:text-white"
									>
										Talk to Our Team
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/*...::: Mission CTA Section End :::... */}
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
									data-jos_animation="fade-right"
								>
									<Image
										src="/assets/img_placeholder/homepage-assets/about-office.jpg"
										alt="BenefitsSafe contact"
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
									<div className="mb-6 md:max-w-max">
										<h2 className="text-white">
											Let's talk about your mission
										</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-left text-lg leading-[1.4] text-white lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											Whether you're evaluating BenefitsSafe for your nonprofit, exploring a
											partnership, or joining the team look forward to partnering with businesses to achievemdash; we'd love to hear from you
											and answer any questions about the product.
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
			<Footer_02/>
		</>
	);
}

export default About;
