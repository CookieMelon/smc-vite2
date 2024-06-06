import { Link } from 'react-router-dom';
import './privacystatement.scss';

export default function PrivacyStatement() {
	return (
		<div className='privacy-statement'>
			<div className='container-fluid-width'>
				<p>
					We have an updated Privacy Statement.{' '}
					<Link to='/corporate/corporate-governance/smc-privacy-statement'>
						Learn More
					</Link>
				</p>
				<button className='btn'>I Agree</button>
			</div>
		</div>
	);
}
