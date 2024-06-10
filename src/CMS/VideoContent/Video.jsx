import { CgPlayButtonO } from 'react-icons/cg';

export default function VideoContent({ src, poster }) {
	return (
		<div className='video-content'>
			<video preload='auto' playsInline src={src} poster={poster}></video>
			<button
				className='video-play'
				onClick={(event) => {
					let video = event.target
						.closest('.video-content')
						.querySelector('video');
					video.play();
					video.classList.add('playing');
					if (video.requestFullscreen) {
						video.requestFullscreen();
					}
					if (video.webkitRequestFullscreen) {
						/* Safari */
						video.webkitRequestFullscreen();
					}
					if (video.msRequestFullscreen) {
						/* IE11 */
						video.msRequestFullscreen();
					}

					let fullScreenChanged = function (e) {
						if (!document.fullscreenElement) {
							video.classList.remove('playing');
							video.pause();
						}
					};

					document.removeEventListener('fullscreenchange', fullScreenChanged);

					document.addEventListener('fullscreenchange', fullScreenChanged);
				}}>
				<CgPlayButtonO size={'7rem'} color='white' />
			</button>
		</div>
	);
}
