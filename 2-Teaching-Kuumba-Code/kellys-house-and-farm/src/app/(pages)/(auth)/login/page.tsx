/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/app/ui/Forms/LoginForm";

function Login() {
	return (
		<div className="cs_card cs_style_10">
			<div className="cs_card_left">
				<div className="cs_card_card_out">
					<Link href="/" className="cs_login_logo">
						{/* img -> next/image */}
						<Image
							src="/assets/img/logo_2.svg"
							alt="Kelly’s House and Farm"
							width={178}
							height={40}
							priority
						/>
					</Link>
					<div className="cs_card_card_in">
						<h1 className="cs_section_title cs_fs_32 cs_bold cs_medium cs_mb_30">
							Login with your account
						</h1>
						<LoginForm />
					</div>
				</div>
			</div>

			<div
				className="cs_card_right cs_bg_filed"
				style={{
					backgroundImage: `url(/assets/img/login_img.jpg)`,
				}}
			/>
		</div>
	);
}

export default Login;
