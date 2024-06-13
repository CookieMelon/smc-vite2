import * as Form from '@radix-ui/react-form';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { PiXCircle } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import { useSendEmail } from 'src/data/data';
import { removeItem } from 'src/helper/form-helper';

import 'src/styles/radix-form.scss';

const captcha_key = import.meta.env.VITE_API_CaptchaKey;

export default function WhistleBlowingForm() {
	console.log(captcha_key);
	const recaptcha = useRef();
	const [captchaError, setCaptchaError] = useState(false);

	const personCount = useRef(0);
	const [persons, setPersons] = useState([0]);

	const reportCount = useRef(0);
	const [reports, setReports] = useState([0]);

	const [count, setCount] = useState(1);

	const [complete, setComplete] = useState(false);
	const [data, setData] = useState({});
	const { success, error } = useSendEmail(complete, data);

	useEffect(() => {
		if (success || error) setOpen(true);
	}, [success, error]);

	const submitForm = (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));

		if (recaptcha.current.getValue()) {
			setData(data);
			setComplete(true);
		} else {
			setCaptchaError(true);
		}
	};
	return (
		<Fade>
			<PageBanner
				title='Whistle Blowing Form'
				widgetClasses={'smc-blue no-bg'}
				containerSize='small'
			/>
			<Section containerClass={'small'}>
				<Column>
					<p
						className='small-text'
						style={{
							textAlign: 'right',
							margin: '2rem 0',
						}}>
						<Link
							style={{
								marginLeft: 'auto',
							}}
							className='btn btn-bordered grid-end'
							to='/storage/files/reports/2023_Whistle_Blowing_Report_Form.pdf'
							target='_blank'>
							Download a printable version of this form
						</Link>
					</p>
					<p className='small-text full'>
						<i>
							<b>NOTE:</b> The Company shall treat the details of this Form with
							utmost confidentiality, and the identities of the Whistleblower
							and witnesses will be protected to ensure that they remain
							anonymous to the full extent allowed by applicable laws. The
							Company further assures that all personal data pertaining to the
							Whistleblower and the witnesses provided in this Form will be
							stored and processed in accordance with the Data Privacy Act of
							2012 and the Company's Personal Data Privacy Statement, which can
							be found in its website - www.sanmiguel.com.ph Note that
							accomplishing this Form is not a requirement for a Whistleblower
							to report a reportable conduct under the Amended SMC
							Whistle-Blowing Policy. This Report is only one of the other
							available Reporting Channels provided under the Amended SMC
							Whistle-Blowing Policy. You can learn about the whistleblowing
							reporting channels, investigation procedure, confidentiality of
							information, and protections for the Whistleblower by reading the
							SMC Whistle-Blowing Policy, which may be accessed at [*].
						</i>
					</p>
					<Form.Root
						encType='multipart/form-data'
						className='Form grid form whistle-from'
						onSubmit={(event) => {
							submitForm(event);
						}}>
						<p className='small-text full'>
							<b>
								<span>*</span> Required fields
							</b>
						</p>

						<Form.Field
							className='FormField'
							name='form_no'
							// serverInvalid={serverErrors.email}
						>
							<Form.Label className='FormLabel'>
								Whistle-Blowing Report Form No.
							</Form.Label>
							<Form.Control className='FormControl' type='text' />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter your email.
							</Form.Message>
						</Form.Field>

						<p className='full FormHeader'>
							<b>Your Contact Information</b>
						</p>
						<Form.Field className='FormField' name='first_name'>
							<Form.Label className='FormLabel'>
								<span>*</span> First Name
							</Form.Label>
							<Form.Control className='FormControl' type='text' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter your First Name.
							</Form.Message>
						</Form.Field>
						<Form.Field className='FormField' name='last_name'>
							<Form.Label className='FormLabel'>
								<span>*</span> Last Name
							</Form.Label>
							<Form.Control className='FormControl' type='text' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter your Last Name
							</Form.Message>
						</Form.Field>
						<div>
							<span className='FormLabel'>
								<span>*</span> Status
							</span>
							<div
								className='flex'
								style={{ alignItems: 'center', gap: '10px' }}>
								<Form.Field className='FormField' name='status'>
									<Form.Label className='FormLabel'>
										<Form.Control
											className='FormControl'
											type='radio'
											value='Employee'
											required
										/>
										Employee
									</Form.Label>
								</Form.Field>
								<Form.Field className='FormField' name='status'>
									<Form.Label className='FormLabel'>
										<Form.Control
											className='FormControl'
											type='radio'
											value='Business Partner'
											required
										/>
										Business Partner
									</Form.Label>
								</Form.Field>
								<Form.Field className='FormField' name='status'>
									<Form.Label className='FormLabel'>
										<Form.Control
											className='FormControl'
											type='radio'
											value='Others'
											required
										/>
										Others
									</Form.Label>
								</Form.Field>
							</div>
						</div>
						<Form.Field className='FormField' name='address'>
							<Form.Label className='FormLabel'>
								Work Location / Address
							</Form.Label>
							<Form.Control className='FormControl' type='text' />
						</Form.Field>
						<Form.Field className='FormField' name='employer_unit'>
							<Form.Label className='FormLabel'>Employer / Unit</Form.Label>
							<Form.Control className='FormControl' type='text' />
						</Form.Field>
						<Form.Field className='FormField' name='phone'>
							<Form.Label className='FormLabel'>Phone</Form.Label>
							<Form.Control className='FormControl' type='text' />
						</Form.Field>
						<Form.Field className='FormField' name='home_address'>
							<Form.Label className='FormLabel'>Home Address</Form.Label>
							<Form.Control className='FormControl' type='text' />
						</Form.Field>
						<Form.Field className='FormField' name='email'>
							<Form.Label className='FormLabel'>
								<span>*</span> Email Address
							</Form.Label>
							<Form.Control className='FormControl' type='email' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter your Email Address
							</Form.Message>
						</Form.Field>
						<Form.Field className='FormField' name='cellphone'>
							<Form.Label className='FormLabel'>
								<span>*</span> Cellphone No.
							</Form.Label>
							<Form.Control className='FormControl' type='text' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter your Cellphone No.
							</Form.Message>
						</Form.Field>

						<div className='full FormLabel'>
							Best Date / Time / Place to reach you
						</div>

						<Form.Field className='FormField' name='date'>
							<Form.Label className='FormLabel'>
								<span>*</span> Date
							</Form.Label>
							<Form.Control className='FormControl' type='date' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please select date
							</Form.Message>
						</Form.Field>

						<Form.Field className='FormField' name='time'>
							<Form.Label className='FormLabel'>
								<span>*</span> Time
							</Form.Label>
							<Form.Control className='FormControl' type='time' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please select time
							</Form.Message>
						</Form.Field>
						<Form.Field className='FormField' name='location'>
							<Form.Label className='FormLabel'>
								<span>*</span> Location
							</Form.Label>
							<Form.Control className='FormControl' type='text' required />
							<Form.Message className='FormMessage' match='valueMissing'>
								Please enter location
							</Form.Message>
						</Form.Field>

						<p className='full FormHeader'>
							<b>PERSON(S) OF INTEREST</b>
						</p>

						<p className='small-text full'>
							<i>
								Please provide the following information about the person(s)
								involved or being reported
							</i>
						</p>
						<div className='grid full parent'>
							{persons.map((p, index) => {
								return (
									<Persons
										key={index}
										id={index}
										persons={persons}
										setPersons={setPersons}
									/>
								);
							})}
						</div>

						<button
							className='btn grid-end'
							onClick={(event) => {
								event.preventDefault();
								personCount.curent++;
								setPersons([...persons, personCount.curent]);
							}}>
							Add more
						</button>

						<p className='full small-text'>
							<i>
								<b>NOTE:</b> Please briefly describe below the reportable
								conduct and how you know about it. A detailed narration of the
								relevant facts will assist the Company's investigation. If there
								is more than one allegation, number each allegation and use as
								many pages as necessary.
							</i>
						</p>
						<div className='grid full parent'>
							{reports.map((r, index) => {
								return (
									<Reports
										key={index}
										id={index}
										reports={reports}
										setReports={setReports}
									/>
								);
							})}
						</div>

						<button
							className='btn grid-end'
							onClick={(event) => {
								event.preventDefault();
								reportCount.curent++;
								setReports([...reports, reportCount.curent]);
							}}>
							Add more
						</button>

						<ReCAPTCHA
							ref={recaptcha}
							// size='compact'
							sitekey={captcha_key}
							// onChange={onChange}
						/>

						<Form.Submit className='submit grid-end btn btn-bordered'>
							Submit
						</Form.Submit>
					</Form.Root>
				</Column>
			</Section>
		</Fade>
	);
}

function Persons({ persons, setPersons, id }) {
	const ref = useRef();

	return (
		<div className='grid full' ref={ref}>
			<div className='grid-end'>
				<button
					type='button'
					className='remove'
					onClick={() => {
						const newItems = [...persons];
						removeItem(newItems, id);
						setPersons(newItems);
					}}>
					<PiXCircle size={'2rem'} />
				</button>
			</div>
			<Form.Field className='FormField' name={`person_name[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> Name
				</Form.Label>
				<Form.Control className='FormControl' type='text' required />
			</Form.Field>
			<Form.Field className='FormField' name={`person_address[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> Address
				</Form.Label>
				<Form.Control className='FormControl' type='text' required />
			</Form.Field>
			<Form.Field className='FormField' name={`person_phone1[${id}]`}>
				<Form.Label className='FormLabel'>Phone</Form.Label>
				<Form.Control className='FormControl' type='text' />
			</Form.Field>
			<Form.Field className='FormField' name={`person_department[${id}]`}>
				<Form.Label className='FormLabel'>Department</Form.Label>
				<Form.Control className='FormControl' type='text' />
			</Form.Field>
			<Form.Field className='FormField' name={`person_position[${id}]`}>
				<Form.Label className='FormLabel'>Position</Form.Label>
				<Form.Control className='FormControl' type='text' />
			</Form.Field>
			<Form.Field className='FormField' name={`person_phone2[${id}]`}>
				<Form.Label className='FormLabel'>Phone</Form.Label>
				<Form.Control className='FormControl' type='text' />
			</Form.Field>
			<div className='seperator full'></div>
		</div>
	);
}

function Reports({ reports, setReports, id }) {
	return (
		<div className='grid full'>
			<div className='grid-end'>
				<button
					type='button'
					className='remove'
					onClick={() => {
						const newItems = [...reports];
						removeItem(newItems, id);
						setReports(newItems);
					}}>
					<PiXCircle size={'2rem'} />
				</button>
			</div>
			<p className='full'>
				<b>REPORT NO. {id + 1}</b>
			</p>
			<Form.Field className='FormField full' name={`report_details_1[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> What wrongdoing occurred?
				</Form.Label>
				<Form.Control asChild>
					<textarea required></textarea>
				</Form.Control>
			</Form.Field>
			<Form.Field className='FormField full' name={`report_details_2[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> When did this occur?
				</Form.Label>
				<Form.Control asChild>
					<textarea required></textarea>
				</Form.Control>
			</Form.Field>
			<Form.Field className='FormField full' name={`report_details_3[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> Who did the wrongdoing?
				</Form.Label>
				<Form.Control asChild>
					<textarea required></textarea>
				</Form.Control>
			</Form.Field>
			<Form.Field className='FormField full' name={`report_details_4[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> Where did this happen?
				</Form.Label>
				<Form.Control asChild>
					<textarea required></textarea>
				</Form.Control>
			</Form.Field>
			<Form.Field className='FormField full' name={`report_details_5[${id}]`}>
				<Form.Label className='FormLabel'>
					<span>*</span> What enabled this to happen (How)?
				</Form.Label>
				<Form.Control asChild>
					<textarea required></textarea>
				</Form.Control>
			</Form.Field>
			<Form.Field className='FormField full' name={`report_files_[${id}]`}>
				<Form.Label className='FormLabel'>
					Please attach any document/s that will support your report.
				</Form.Label>
				<Form.Control
					type='file'
					accept='.xls, .xlsx, .docx, .doc, .pdf, image/.jpg'
				/>
				<p className='small-text'>
					Only acceptable files are .xls, .xlsx, .docx, .doc, pdf, and .jpg.
					Maximum upload file size will be 1.5mb only.
				</p>
			</Form.Field>
		</div>
	);
}
