"use client";
import Footer_02 from "@/components/footer/Footer_02";
import Header_02 from "@/components/header/Header_02";
import useAccordion from "@/components/hooks/useAccordion";
import Image from "next/image";
import Link from "next/link";

const Faq_1 = () => {
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
								<h1 className="breadcrumb-title">Frequently Asked Questions</h1>
							</div>
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: Breadcrumb Section End :::... */}
				{/*...::: FAQ Section Start :::... */}
				<section className="faq-section">
					{/* Section Spacer */}
					<div className="pb-20 xl:pb-[130px]">
						{/* Section Container */}
						<div className="global-container">
							{/* Section Content Block */}
							<div className="jos mb-10 text-center lg:mb-16 xl:mb-20">
								<div className="mx-auto max-w-md lg:max-w-3xl xl:max-w-[950px]">
									<h2>Answers for nonprofits, case managers, and funders</h2>
								</div>
							</div>
							{/* Section Content Block */}
							{/* Accordion*/}
							<ul className="accordion flex flex-col gap-y-6">
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 0 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(0)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>What is BenefitsSafe?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											BenefitsSafe is a fintech compliance platform that helps nonprofits manage restricted grant funds and disburse them via virtual debit cards — without beneficiaries losing their government benefits like SSI, Medi-Cal, or CalFresh.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 1 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(1)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>How does BenefitsSafe protect beneficiaries?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											Our SentinelLayer AI monitors every beneficiary's financial picture daily across all benefit programs. If someone approaches their SSI asset limit or Medi-Cal income threshold, the system alerts their case manager with specific numbers and recommended actions — automatically.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 2 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(2)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>Is BenefitsSafe a bank?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											No. BenefitsSafe is a software platform. Cards are issued by Stripe's FDIC-insured bank partners (Sutton Bank and Evolve Bank & Trust). We never hold, transmit, or control your funds.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 3 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(3)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>Can I use BenefitsSafe for Special Needs Trusts?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											Yes. SNT trustees can connect the trust's bank account and issue cards with POMS-compliant spending controls. Available on Core plans and above.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 4 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(4)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>Do you support ABLE accounts?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											ABLE account balance tracking is available on Network plans and above. We track balances for unified asset monitoring across all benefit programs.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 5 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(5)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>What happens after my 14-day trial?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											You choose a paid plan or automatically move to our free Community tier (10 beneficiaries, daily monitoring). You never lose access to basic protection.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 6 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(6)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>Is my data secure?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											BenefitsSafe passed an OWASP ZAP penetration test with zero high/critical findings. We use AES-256-GCM encryption, session fingerprinting, TOTP MFA, and are CCPA-compliant.
										</p>
									</div>
								</li>
								{/* Accordion items */}
								{/* Accordion items */}
								<li
									className={`jos accordion-item is-2 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
										activeIndex === 7 ? "active" : ""
									}`}
									data-jos_delay="0.1"
									onClick={() => handleAccordion(7)}
								>
									<div className="accordion-header flex items-center justify-between text-xl leading-[1.2] -tracking-[0.5px] lg:text-[28px]">
										<h5>Can multiple staff members use BenefitsSafe?</h5>
										<div className="accordion-icon">
											<Image
												src="/assets/img_placeholder/plus.svg"
												width={24}
												height={24}
												alt="plus"
											/>
										</div>
									</div>
									<div className="accordion-content text-[#2C2C2C]">
										<p>
											Yes. Role-based access supports admins, case managers, CPAs, auditors, and attorneys. Each role sees only what they need.
										</p>
									</div>
								</li>
								{/* Accordion items */}
							</ul>
							{/* Accordion*/}
						</div>
						{/* Section Container */}
					</div>
					{/* Section Spacer */}
				</section>
				{/*...::: FAQ Section End :::... */}
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
										src="/assets/img_placeholder/faq.png"
										alt="BenefitsSafe FAQ"
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
											Still have questions?
										</h2>
									</div>
									{/* Section Content Block */}
									<div className="text-left text-lg leading-[1.4] text-white lg:text-[21px]">
										<p className="mb-7 last:mb-0">
											Our team is ready to walk you through compliance, onboarding, and how BenefitsSafe fits your specific grant workflow.
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
};

export default Faq_1;
