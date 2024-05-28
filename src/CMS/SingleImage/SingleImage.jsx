import SingleParallax from 'src/CMS/SingleParallax/single-parallax';

export default function SingleImage({ image }) {
	return (
		<div classname='image-content'>
			<div classname='img-container'>
				<SingleParallax>
					<img src={image.src} alt={image.alt} />
				</SingleParallax>
			</div>
		</div>
	);
}
