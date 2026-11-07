/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
	label: string;
	href: string;
	children?: { label: string; href: string }[];
};

const data: { logo: string; logoUrl: string; menuItems: MenuItem[] } = {
	logo: "/assets/img/logo.svg",
	logoUrl: "/",
	// One page: every item jumps to a section on the home page.
	menuItems: [
		{ label: "OUR STORY", href: "/#story" },
		{ label: "THE GARDEN NOW", href: "/#garden-now" },
		{ label: "WHAT COMES NEXT", href: "/#next" },
		{ label: "YEARS OF GROWING", href: "/#growing" },
		{ label: "SUPPORT", href: "/#support" },
	],
};

const Header = () => {
	const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false);
	const [openMobileSubmenuIndex, setOpenMobileSubmenuIndex] = useState<
		number[]
	>([]);
	const [isSticky, setIsSticky] = useState<string>("");
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

	const handleOpenMobileSubmenu = (index: number) => {
		setOpenMobileSubmenuIndex((prev) =>
			prev.includes(index) ? prev.filter((f) => f !== index) : [...prev, index]
		);
	};

	useEffect(() => {
		const handleScroll = () =>
			setIsSticky(window.scrollY > 100 ? "cs_sticky_active" : "");
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<header
				className={`cs_site_header cs_style_1 cs_sticky_header ${
					isSticky ? isSticky : ""
				}`}
			>
				<div className="cs_main_header">
					<div className="container">
						<div className="cs_main_header_in">
							<div className="cs_main_header_left">
								<Link className="cs_site_branding" href={data.logoUrl}>
									<Image
										src={data.logo}
										alt="Kelly’s House and Farm"
										width={178}
										height={40}
										className="object-contain"
									/>
								</Link>
							</div>
							<div className="cs_main_header_center">
								<div className="cs_nav cs_heading_color">
									<nav
										className={`cs_nav_list_wrap text-uppercase ${
											isShowMobileMenu ? "cs_active" : ""
										}`}
									>
										<ul className={`cs_nav_list`}>
											{data.menuItems.map((item, index) => (
												<li
													key={index}
													className={
														item.children ? "menu-item-has-children" : ""
													}
												>
													<Link
														href={item.href}
														onClick={() => setIsShowMobileMenu(false)}
													>
														{item.label}
													</Link>
													{item.children && (
														<>
															<ul
																style={{
																	display: openMobileSubmenuIndex.includes(
																		index
																	)
																		? "block"
																		: "none",
																}}
															>
																{item.children.map((child, i) => (
																	<li
																		key={i}
																		onClick={() =>
																			setIsShowMobileMenu(!isShowMobileMenu)
																		}
																	>
																		<Link href={child.href}>{child.label}</Link>
																	</li>
																))}
															</ul>
															<span
																className={`cs_munu_dropdown_toggle ${
																	openMobileSubmenuIndex.includes(index)
																		? "active"
																		: ""
																}`}
																onClick={() => handleOpenMobileSubmenu(index)}
															>
																<span />
															</span>
														</>
													)}
												</li>
											))}
										</ul>
									</nav>
									<span
										className={`cs_menu_toggle ${
											isShowMobileMenu && "cs_toggle_active"
										}`}
										onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
									>
										<span></span>
									</span>
								</div>
							</div>
							<div className="cs_main_header_right">
								<div className="cs_header_icon_btns">
									{/* Login hidden for now: no accounts yet. Uncomment to bring it back.
									<Link href="/login" className="cs_header_icon_btn cs_center">
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M17.0711 12.9289C15.9819 11.8398 14.6855 11.0335 13.2711 10.5454C14.786 9.50199 15.7812 7.75578 15.7812 5.78125C15.7812 2.59348 13.1878 0 10 0C6.81223 0 4.21875 2.59348 4.21875 5.78125C4.21875 7.75578 5.21402 9.50199 6.72898 10.5454C5.31453 11.0335 4.01813 11.8398 2.92895 12.9289C1.0402 14.8177 0 17.3289 0 20H1.5625C1.5625 15.3475 5.34754 11.5625 10 11.5625C14.6525 11.5625 18.4375 15.3475 18.4375 20H20C20 17.3289 18.9598 14.8177 17.0711 12.9289ZM10 10C7.67379 10 5.78125 8.1075 5.78125 5.78125C5.78125 3.455 7.67379 1.5625 10 1.5625C12.3262 1.5625 14.2188 3.455 14.2188 5.78125C14.2188 8.1075 12.3262 10 10 10Z"
												fill="currentColor"
											/>
										</svg>
									</Link>
									*/}
									<Link
										href="/#support"
										className="cs_btn cs_style_1 cs_bold cs_heading_color cs_white_bg cs_header_donate_btn"
									>
										Donate
									</Link>
									<button
										type="button"
										className="cs_header_icon_btn cs_search_tobble_btn cs_center"
										onClick={() => setIsSearchActive(!isSearchActive)}
									>
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g>
												<path
													d="M19.7556 18.5774L14.0682 12.89C15.1699 11.5292 15.8332 9.8 15.8332 7.91669C15.8332 3.55174 12.2815 9.15527e-05 7.91656 9.15527e-05C3.55161 9.15527e-05 0 3.5517 0 7.91666C0 12.2816 3.55165 15.8333 7.9166 15.8333C9.7999 15.8333 11.5291 15.1699 12.8899 14.0683L18.5773 19.7557C18.7398 19.9182 18.9531 19.9999 19.1665 19.9999C19.3798 19.9999 19.5932 19.9182 19.7557 19.7557C20.0815 19.4299 20.0815 18.9032 19.7556 18.5774ZM7.9166 14.1666C4.46996 14.1666 1.66666 11.3633 1.66666 7.91666C1.66666 4.47001 4.46996 1.66672 7.9166 1.66672C11.3632 1.66672 14.1665 4.47001 14.1665 7.91666C14.1665 11.3633 11.3632 14.1666 7.9166 14.1666Z"
													fill="currentColor"
												/>
											</g>
											<defs>
												<clipPath>
													<rect width={20} height={20} fill="currentColor" />
												</clipPath>
											</defs>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<div
				className={`cs_header_form_wrap cs_center ${
					isSearchActive ? "active" : ""
				}`}
			>
				<div
					className="cs_header_form_overlay"
					onClick={() => setIsSearchActive(!isSearchActive)}
				/>
				<form action="#" className="cs_header_form">
					<input
						type="text"
						className="cs_header_form_input"
						placeholder="Search..."
					/>
					<button type="button" className="cs_header_form_btn cs_center">
						<svg
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g>
								<path
									d="M19.7556 18.5774L14.0682 12.89C15.1699 11.5292 15.8332 9.8 15.8332 7.91669C15.8332 3.55174 12.2815 9.15527e-05 7.91656 9.15527e-05C3.55161 9.15527e-05 0 3.5517 0 7.91666C0 12.2816 3.55165 15.8333 7.9166 15.8333C9.7999 15.8333 11.5291 15.1699 12.8899 14.0683L18.5773 19.7557C18.7398 19.9182 18.9531 19.9999 19.1665 19.9999C19.3798 19.9999 19.5932 19.9182 19.7557 19.7557C20.0815 19.4299 20.0815 18.9032 19.7556 18.5774ZM7.9166 14.1666C4.46996 14.1666 1.66666 11.3633 1.66666 7.91666C1.66666 4.47001 4.46996 1.66672 7.9166 1.66672C11.3632 1.66672 14.1665 4.47001 14.1665 7.91666C14.1665 11.3633 11.3632 14.1666 7.9166 14.1666Z"
									fill="currentColor"
								/>
							</g>
							<defs>
								<clipPath>
									<rect width={20} height={20} fill="currentColor" />
								</clipPath>
							</defs>
						</svg>
					</button>
				</form>
			</div>
		</>
	);
};

export default Header;
