import * as Dialog from '@radix-ui/react-dialog';
import * as Form from '@radix-ui/react-form';

import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { PiXCircle } from 'react-icons/pi';
import Column from 'src/CMS/Column/column';
import { useSendEmail } from 'src/data/data';

import 'src/styles/radix-dialog.scss';
import 'src/styles/radix-form.scss';

const captcha_key = import.meta.env.VITE_API_CaptchaKey;

export default function SMAIForm() {
	console.log(captcha_key);
	const [open, setOpen] = useState(false);

	const recaptcha = useRef();

	const [complete, setComplete] = useState(false);
	const [data, setData] = useState({});
	const { success, error } = useSendEmail(complete, data);

	const [captchaError, setCaptchaError] = useState(false);

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
		<Column>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className='DialogOverlay' />
					<Dialog.Content className='DialogContent' data-lenis-prevent='true'>
						{error && (
							<>
								<h3 className='DialogContent-title'>
									Oops! Something went wrong
								</h3>
								<p>{error.message}</p>
							</>
						)}
						{success && (
							<>
								<h3 className='DialogContent-title'>Thank you!</h3>
								<p>
									We have received your message. For urgent concerns, please
									contact us at Tel. No:{' '}
									<a href='tel: (+632) 8667-5150'>(+632) 8667-5150</a>.
								</p>
							</>
						)}

						<Dialog.Close className='IconButton' aria-label='Close' asChild>
							<PiXCircle size={'2rem'} />
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
			<Form.Root
				encType='multipart/form-data'
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

				<Form.Field className='FormField full' name={`message`}>
					<Form.Label className='FormLabel'>
						<span>*</span> Enter your message
					</Form.Label>
					<Form.Control asChild>
						<textarea required></textarea>
					</Form.Control>
					<Form.Message className='FormMessage' match='valueMissing'>
						Please enter your message
					</Form.Message>
				</Form.Field>

				<Form.Submit className='submit grid-end btn btn-bordered'>
					Submit
				</Form.Submit>
				<Form.Field className='FormField' data-invalid={captchaError}>
					<ReCAPTCHA
						ref={recaptcha}
						// size='compact'
						sitekey={captcha_key}
						// onChange={onChange}
					/>
					{captchaError && (
						<Form.Message className='FormMessage'>
							Please complete captcha verification to proceed.
						</Form.Message>
					)}
				</Form.Field>
			</Form.Root>
		</Column>
	);
}
