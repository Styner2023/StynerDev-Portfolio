/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { RegisterFormData } from "@/app/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
	// Initialize state variables with correct types
	const [formData, setFormData] = useState<RegisterFormData>({
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
		remember: false,
		error: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { email, password, confirmPassword } = formData;

		// Basic validation
		if (!email || !password || !confirmPassword) {
			setFormData((prevData) => ({
				...prevData,
				error: "Please fill in all fields.",
			}));
			return;
		}

		// Password match validation
		if (password !== confirmPassword) {
			setFormData((prevData) => ({
				...prevData,
				error: "Passwords do not match.",
			}));
			return;
		}

		// Clear error and proceed
		setFormData((prevData) => ({
			...prevData,
			error: "",
		}));
	};

	// Handling input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="cs_mb_15">
				<label>Name*</label>
				<input
					type="text"
					name="name"
					className="cs_form_field"
					value={formData.name}
					onChange={handleInputChange}
				/>
			</div>
			<div className="cs_mb_15">
				<label>Email*</label>
				<input
					type="email"
					name="email"
					className="cs_form_field"
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div className="cs_mb_15">
				<label>Password*</label>
				<input
					type="password"
					name="password"
					className="cs_form_field"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>
			<div className="cs_mb_15">
				<label>Confirm Password*</label>
				<input
					type="password"
					name="confirmPassword"
					className="cs_form_field"
					value={formData.confirmPassword}
					onChange={handleInputChange}
				/>
			</div>
			<div className="cs_card_row_1 cs_mb_15">
				<div>
					<div className="cs_custom_checkbox">
						<input
							className="cs_custom_checkbox_input"
							type="checkbox"
							name="remember"
							checked={formData.remember}
							onChange={handleInputChange}
						/>
						<label className="cs_custom_checkbox_label">
							I agree with the Terms & Services.
						</label>
					</div>
				</div>
			</div>
			{formData.error && (
				<div className="cs_error_message cs_mb_15">
					<p>{formData.error}</p>
				</div>
			)}
			<div className="cs_mb_20">
				<button
					type="submit"
					className="cs_btn cs_style_1 cs_type_1 cs_bold cs_heading_bg cs_white_color w-100"
				>
					<b>Register</b>
				</button>
			</div>
			<p className="cs_mb_20 cs_or_login">
				<span>Or login with</span>
			</p>
			<div className="cs_social_btns cs_mb_20">
				<Link
					href="/auth/facebook"
					className="cs_social_btn cs_social_btn_facebook"
				>
					<i className="d-flex">
						<Icon icon="fa6-brands:facebook" width="16" height="16" />
					</i>
					Login With Facebook
				</Link>
				<Link
					href="/auth/google"
					className="cs_social_btn cs_social_btn_google"
				>
					<i className="d-flex">
						<Icon icon="fa6-brands:google" width="16" height="16" />
					</i>
					Login With Google
				</Link>
			</div>
			<p className="mb-0 cs_primary_color">
				Already have an account?{" "}
				<Link href="/login" className="cs_card_text_btn">
					Sign In Now
				</Link>
			</p>
		</form>
	);
};

export default RegisterForm;
