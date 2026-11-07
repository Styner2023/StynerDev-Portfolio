/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import React from "react";
import { useState } from "react";
import { ForgotPasswordFormData } from "@/app/types";

const ForgotPasswordForm = () => {
	const [formData, setFormData] = useState<ForgotPasswordFormData>({
		email: "",
		remember: false,
		error: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const { email } = formData;

		// Basic validation
		if (!email) {
			setFormData((prevData) => ({
				...prevData,
				error: "Please enter your email address.",
			}));
			return;
		}

		// Clear error
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
				<label>Your registered Email Address*</label>
				<input
					type="email"
					name="email"
					className="cs_form_field"
					value={formData.email}
					onChange={handleInputChange}
					placeholder="Enter your email"
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
						<label className="cs_custom_checkbox_label">Remember me</label>
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
					<b>Submit</b>
				</button>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
