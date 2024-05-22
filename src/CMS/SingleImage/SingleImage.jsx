import SingleParallax from 'src/CMS/SingleParallax/single-parallax';

export default function SingleImage({ image }) {
	return (
		<div class='image-content'>
			<div class='img-container'>
				<SingleParallax>
					<img src={image.src} />
				</SingleParallax>
			</div>
		</div>
	);
}
