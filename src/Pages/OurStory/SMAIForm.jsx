import * as Form from '@radix-ui/react-form';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Column from 'src/CMS/Column/column';

import 'src/styles/radix-form.scss';
const captcha_key = import.meta.env.VITE_API_CaptchaKey;

export default function SMAIForm() {
	const recaptcha = useRef();

	console.log(captcha_key);

	const submitForm = (event) => {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
	};
	return (
		<Column>
			<Form.Root
				enctype='multipart/form-data'
				className='Form grid form smai-from'
				onSubmit={(event) => {
					submitForm(event);
				}}>
				<Form.Field className='FormField' name='first_name'>
					<Form.Label className='FormLabel'>First Name</Form.Label>
					<Form.Control className='FormControl' type='text' />
				</Form.Field>
				<Form.Field className='FormField' name='last_name'>
					<Form.Label className='FormLabel'>Last Name</Form.Label>
					<Form.Control className='FormControl' type='text' />
				</Form.Field>

				<Form.Field className='FormField full' name={`report_details`}>
					<Form.Label className='FormLabel'>
						<span>*</span> What wrongdoing occurred?
					</Form.Label>
					<Form.Control asChild>
						<textarea required></textarea>
					</Form.Control>
					<Form.Message className='FormMessage' match='valueMissing'>
						Please enter your message
					</Form.Message>
				</Form.Field>

				<ReCAPTCHA
					ref={recaptcha}
					size='compact'
					sitekey={captcha_key}
					// onChange={onChange}
				/>

				<Form.Submit className='submit grid-end btn btn-bordered'>
					Submit
				</Form.Submit>
			</Form.Root>
		</Column>
	);
}
