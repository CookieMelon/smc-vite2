import { Link } from 'react-router-dom';
import './privacystatement.scss';

export default function PrivacyStatement() {
	return (
		<div className='privacy-statement'>
			<div className='container-fluid-width medium'>
				<h2 className='heading-2'>We have an updated Privacy Statement</h2>

				<p>
					San Miguel Corporation and its subsidiaries ("<b>SMC</b>," "<b>We</b>
					," "<b>us</b>" or "<b>our</b>") respect your privacy and will keep
					secure and confidential all personal and sensitive information that
					you may provide to SMC, and/or those that SMC may collect from you ("
					<b>Personal Data</b>").
				</p>
				<p>
					Please read carefully the SMC Privacy Statement to understand how we
					treat Personal Data.
				</p>
				<p>
					<Link to='/corporate/smc-privacy-statement' target='_blank'>
						<b>Click here to read the Privacy Statement in full.</b>
					</Link>
				</p>
				{/* <p>
					<button class='btn' aria-label='I Agree'>
						<span class='btn-label'>Close</span>
					</button>
				</p> */}
			</div>
		</div>
	);
}
