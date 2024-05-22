import { getColors } from './hooks/use-color';

export default function ErrorPage() {
	const { red, yellow } = getColors;
	return (
		<>
			<h1
				style={{
					fontSize: '12rem',
					lineHeight1: 1,
					margin: 0,
					backgroundImage: `linear-gradient(90deg, ${red}, ${yellow})`,
					backgroundClip: 'text',
					color: 'transparent',
				}}>
				404
			</h1>
			<p
				style={{
					margin: 0,
					fontSize: '2.75rem',
					lineHeight: 1.35,
				}}>
				Page Not Found
			</p>
			<p
				style={{
					margin: 0,
				}}>
				The page you are looking for does not exist!
			</p>

			<p>
				{/* <Button link='/' className={'btn-bordered pri-btn'}> */}
				Go back Home
				{/* </Button> */}
			</p>
		</>
	);
}
