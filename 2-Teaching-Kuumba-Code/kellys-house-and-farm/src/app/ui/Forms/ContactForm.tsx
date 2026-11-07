/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

"use client";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	email: string;
	message: string;
}

const ContactForm = () => {
	const [form, setForm] = useState<FormData>({
		name: "",
		email: "",
		message: "",
	});

	const isValidEmail = (email: string): boolean => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Field validation
		if (!form.name.trim()) {
			return toast.error("Name field is required!");
		}
		if (!form.email.trim()) {
			return toast.error("Email field is required!");
		}
		if (!isValidEmail(form.email)) {
			return toast.error("Please enter a valid email address!");
		}
		if (!form.message.trim()) {
			return toast.error("Message field is required!");
		}

		const apiKey = process.env.NEXT_PUBLIC_API_KEY;

		const formData = new FormData();
		formData.append("access_key", apiKey || "");
		formData.append("name", form.name);
		formData.append("email", form.email);
		formData.append("message", form.message);

		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				toast.success("Message sent successfully!");
				setForm({
					name: "",
					email: "",
					message: "",
				});
			} else {
				toast.error("Failed to send message. Try again.");
			}
		} catch (err) {
			toast.error("Network error. Please try again later.");
		}
	};
	return (
		<form
			method="POST"
			className="row cs_gap_y_24"
			id="cs_form"
			onSubmit={handleSubmit}
		>
			<div className="col-sm-6">
				<input
					type="text"
					name="name"
					className="cs_form_field"
					placeholder="Name"
					value={form.name}
					onChange={handleChange}
				/>
			</div>
			<div className="col-sm-6">
				<input
					type="email"
					name="email"
					className="cs_form_field"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
			</div>
			<div className="col-lg-12">
				<textarea
					className="cs_form_field"
					name="message"
					placeholder="Message"
					rows={5}
					value={form.message}
					onChange={handleChange}
				/>
			</div>
			<div className="col-lg-12">
				<button
					className="cs_btn cs_style_1 cs_type_1 cs_bold cs_heading_bg cs_white_color w-100"
					type="submit"
				>
					<span>Send Message</span>
				</button>
				<div id="cs_result" className="cs_heading_color" />
			</div>
		</form>
	);
};

export default ContactForm;
