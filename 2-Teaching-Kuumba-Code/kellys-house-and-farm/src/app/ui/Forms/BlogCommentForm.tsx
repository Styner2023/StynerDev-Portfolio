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

// Define the form data structure
interface FormData {
	fullname: string;
	email: string;
	website: string;
	message: string;
}

const BlogCommentForm = () => {
	const [form, setForm] = useState<FormData>({
		fullname: "",
		email: "",
		website: "",
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

		// Validation
		if (!form.fullname.trim()) {
			return toast.error("Full Name field is required!");
		}
		if (!form.email.trim()) {
			return toast.error("Email field is required!");
		}
		if (!isValidEmail(form.email)) {
			return toast.error("Please enter a valid email address!");
		}
		if (!form.website.trim()) {
			return toast.error("Please enter a valid website URL!");
		}
		if (!form.message.trim()) {
			return toast.error("Message field is required!");
		}
		const apiKey = process.env.NEXT_PUBLIC_API_KEY;

		const formData = new FormData();
		formData.append("access_key", apiKey || "");
		formData.append("fullname", form.fullname);
		formData.append("email", form.email);
		formData.append("website", form.website);
		formData.append("message", form.message);

		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				toast.success("Message sent successfully!");
				setForm({
					fullname: "",
					email: "",
					website: "",
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
		<form onSubmit={handleSubmit} className="row">
			<div className="col-lg-6">
				<label>Full Name*</label>
				<input
					type="text"
					name="fullname"
					className="cs_form_field cs_mb_15"
					placeholder="Full Name"
					value={form.fullname}
					onChange={handleChange}
				/>
			</div>

			<div className="col-lg-6">
				<label>Email*</label>
				<input
					type="email"
					name="email"
					className="cs_form_field cs_mb_15"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
			</div>

			<div className="col-lg-12">
				<label>Website</label>
				<input
					type="text"
					name="website"
					className="cs_form_field cs_mb_15"
					placeholder="Website"
					value={form.website}
					onChange={handleChange}
				/>
			</div>

			<div className="col-lg-12">
				<label>Write Your Comment*</label>
				<textarea
					name="message"
					className="cs_form_field cs_mb_15"
					placeholder="Message"
					rows={7}
					value={form.message}
					onChange={handleChange}
				/>
			</div>

			<div className="col-lg-12">
				<button
					type="submit"
					className="cs_btn cs_style_1 cs_bold cs_heading_bg cs_white_color"
				>
					<span>Send Message</span>
				</button>
			</div>
		</form>
	);
};

export default BlogCommentForm;
