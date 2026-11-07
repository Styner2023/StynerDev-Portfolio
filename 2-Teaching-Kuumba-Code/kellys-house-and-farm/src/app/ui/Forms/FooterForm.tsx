/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
interface FormState {
	email: string;
}

// FormSubmit emails each sign-up to this inbox. The very first submission
// sends an "Activate Form" email there; nothing is delivered until someone
// clicks it.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/lashakelly@gmail.com";

const FooterForm = () => {
	const [form, setForm] = useState<FormState>({ email: "" });
	const [sending, setSending] = useState<boolean>(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const isValidEmail = (email: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.email.trim()) {
			return toast.error("Email field is required!");
		}
		if (!isValidEmail(form.email)) {
			return toast.error("Please enter a valid email address!");
		}

		setSending(true);
		try {
			const res = await fetch(FORM_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					// FormSubmit uses a field named "email" as the reply-to address.
					email: form.email,
					_subject: "New sign-up from the Kelly’s House and Farm website",
					_template: "table",
				}),
			});
			const result = await res.json().catch(() => null);

			// FormSubmit answers { success: "true" | "false", message }.
			if (res.ok && String(result?.success) === "true") {
				toast.success("Thank you! You’re signed up.");
				setForm({ email: "" });
			} else {
				toast.error("Sign-up didn’t go through. Please try again later.");
			}
		} catch {
			toast.error("Network error. Please try again later.");
		} finally {
			setSending(false);
		}
	};
	return (
		<form className="cs_newsletter cs_style_1" onSubmit={handleSubmit}>
			<input
				type="email"
				name="email"
				className="cs_newsletter_input"
				placeholder="Enter your email address ..."
				aria-label="Your email address"
				value={form.email}
				onChange={handleChange}
			/>
			<button
				type="submit"
				className="cs_newsletter_btn cs_arrow_btn cs_white_bg cs_heading_color"
				aria-label="Sign up"
				disabled={sending}
			>
				<svg
					width={16}
					height={16}
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.3846 0H0.615385C0.275692 0 0 0.275692 0 0.615385C0 0.955077 0.275692 1.23077 0.615385 1.23077H13.8988L0.180308 14.9495C-0.06 15.1898 -0.06 15.5794 0.180308 15.8197C0.300615 15.94 0.457846 16 0.615385 16C0.772923 16 0.930461 15.94 1.05046 15.8197L14.7692 2.10092V15.3846C14.7692 15.7243 15.0449 16 15.3846 16C15.7243 16 16 15.7243 16 15.3846V0.615385C16 0.275692 15.7243 0 15.3846 0Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</form>
	);
};

export default FooterForm;
