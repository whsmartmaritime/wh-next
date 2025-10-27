'use client';
import type React from 'react';
import type { ButtonProps } from '../Button';
import Button from '../Button';

export type SubmitProps = ButtonProps & {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: 'button' | 'submit' | 'reset';
};

export default function Submit({
	children,
	className,
	arrowRotation = 0,
	onClick,
	type = 'submit',
	...rest
}: SubmitProps) {
	// Không dùng href, chỉ dùng cho submit hoặc button có onClick
	return (
		<Button
			className={className}
			arrowRotation={arrowRotation}
			onClick={onClick}
			type={type}
			{...rest}
		>
			{children}
		</Button>
	);
}
