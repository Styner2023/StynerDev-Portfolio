/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { LoginFormData } from "@/app/types";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
	// Initialize state with LoginFormData type
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
		remember: false,
		error: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { email, password } = formData;

		// Basic validation
		if (!email || !password) {
			setFormData((prevData) => ({
				...prevData,
				error: "Please fill in all fields.",
			}));
			return;
		}

		// Clear error and proceed
		setFormData((prevData) => ({
			...prevData,
			error: "",
		}));
	};

	// Handling input changes and updating formData state
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
			<div className="cs_card_row_1 cs_mb_15">
				<div className="cs_custom_checkbox">
					<input
						className="cs_custom_checkbox_input"
						type="checkbox"
						name="remember"
						checked={formData.remember}
						onChange={handleInputChange}
					/>
					<label className="cs_custom_checkbox_label">Remember me</label>
				</div>

				<div>
					<Link href="/forgot-password" className="cs_card_text_btn">
						Forgot Password?
					</Link>
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
					<b>Login</b>
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
				Dont have an account?{" "}
				<Link href="/signup" className="cs_card_text_btn">
					Register Now
				</Link>
			</p>
		</form>
	);
};

export default LoginForm;
