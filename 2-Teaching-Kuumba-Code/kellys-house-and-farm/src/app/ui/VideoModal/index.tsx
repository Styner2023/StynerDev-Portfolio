/**
 * Developer: StynerDev
 * Dev Website: https://www.styner.dev/
 * Website URL: https://www.stynerdev.com/
 *
 * Copyright (c) 2026
 */

type VideoModalProps = {
	isTrue: boolean;
	iframeSrc: string;
	poster?: string;
	handelClose: () => void;
};

// Local clips (e.g. phone footage in /public) play in a native player;
// anything else (YouTube, Vimeo) is embedded in an iframe.
const isVideoFile = (src: string) => /\.(mp4|webm|mov)([?#]|$)/i.test(src);

export default function VideoModal({
	isTrue,
	iframeSrc,
	poster,
	handelClose,
}: VideoModalProps) {
	const isFile = isVideoFile(iframeSrc);

	return (
		<div className={`cs_video_popup ${isTrue ? "active" : ""}`}>
			<div className="cs_video_popup-overlay"></div>
			<div className="cs_video_popup-content">
				<div className="cs_video_popup-layer"></div>
				<div
					className={`cs_video_popup-container ${isFile ? "cs_type_file" : ""}`}
				>
					<div className="cs_video_popup-align">
						{isFile ? (
							<video
								className="cs_video_popup-video"
								src={iframeSrc}
								poster={poster}
								controls
								autoPlay
								playsInline
							/>
						) : (
							<div className="embed-responsive embed-responsive-16by9">
								<iframe
									className="embed-responsive-item"
									src={iframeSrc}
									title="Video"
									allowFullScreen
								></iframe>
							</div>
						)}
					</div>
					<div className="cs_video_popup-close" onClick={handelClose} />
				</div>
			</div>
		</div>
	);
}
