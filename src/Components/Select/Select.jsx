import * as SelectPrimitive from '@radix-ui/react-select';

import React from 'react';
import { PiCaretDown, PiCaretUp, PiCheckLight } from 'react-icons/pi';
import './radix-select.scss';

export const Select = React.forwardRef(
	({ children, ...props }, forwardedRef) => {
		// console.log(props);
		return (
			<SelectPrimitive.Root {...props}>
				<SelectPrimitive.Trigger className='SelectTrigger' ref={forwardedRef}>
					<SelectPrimitive.Value placeholder={props.placeholder} />
					<SelectPrimitive.Icon className='SelectIcon'>
						<PiCaretDown />
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>
				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						position='popper'
						sticky='always'
						className='SelectContent'
						data-lenis-prevent='true'
						sideOffset={5}>
						<SelectPrimitive.ScrollUpButton className='SelectScrollButton'>
							<PiCaretUp />
						</SelectPrimitive.ScrollUpButton>
						<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
						<SelectPrimitive.ScrollDownButton className='SelectScrollButton'>
							<PiCaretDown />
						</SelectPrimitive.ScrollDownButton>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>
		);
	}
);

export const SelectItem = React.forwardRef(
	({ children, ...props }, forwardedRef) => {
		return (
			<SelectPrimitive.Item
				className='SelectItem'
				{...props}
				ref={forwardedRef}>
				<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
				<SelectPrimitive.ItemIndicator className='SelectItemIndicator'>
					<PiCheckLight />
				</SelectPrimitive.ItemIndicator>
			</SelectPrimitive.Item>
		);
	}
);
