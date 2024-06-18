import { CgPlayButtonO } from 'react-icons/cg';
import { PiXBold } from 'react-icons/pi';

export default function VideoContent({ src, poster }) {
	return (
		<div className='video-content'>
			<video preload='auto' playsInline src={src} poster={poster}></video>
			<button
				className='video-close'
				onClick={(event) => {
					let content = event.target.closest('.section-content');
					let body = document.querySelector('body');
					let video = event.target
						.closest('.video-content')
						.querySelector('video');

					video.pause();
					video.classList.remove('playing');
					content.classList.remove('fixed-video');
					body.style.overflow = 'auto';
					video.controls = false;
				}}>
				<PiXBold size={'3rem'} color='white' />
			</button>
			{/* <video
				preload='auto'
				playsInline
				src={
					'https://112.199.66.199/storage/page-assets/4/2/cctAz3KRpFtQv5fvrgB9ZyanTczjQ0ueE0TuMSSk0YRGPz14D3Fo7Na7CDWU/orig/j0vNsT5Mo6HlN7h3Y9Qb8QlHighIiW5LwFEQiLM9.mp4'
				}
				poster={poster}></video> */}
			<button
				className='video-play'
				onClick={(event) => {
					let content = event.target.closest('.section-content');
					let body = document.querySelector('body');
					let video = event.target
						.closest('.video-content')
						.querySelector('video');

					if (!video.classList.contains('playing')) {
						video.play();
						video.classList.add('playing');
						content.classList.add('fixed-video');
						body.style.overflow = 'hidden';
						video.controls = true;
					}

					// if (video.requestFullscreen) {
					// 	video.requestFullscreen();
					// }
					// if (video.webkitRequestFullscreen) {
					// 	/* Safari */
					// 	video.webkitRequestFullscreen();
					// }
					// if (video.msRequestFullscreen) {
					// 	/* IE11 */
					// 	video.msRequestFullscreen();
					// }

					// let fullScreenChanged = function (e) {
					// 	if (!document.fullscreenElement) {
					// 		video.classList.remove('playing');
					// 		video.pause();
					// 	} else {
					// 	}
					// };

					// document.removeEventListener('fullscreenchange', fullScreenChanged);
					// document.addEventListener('fullscreenchange', fullScreenChanged);
				}}>
				<CgPlayButtonO size={'7rem'} color='white' />
			</button>
		</div>
	);
}
