import React from 'react';
import { Button } from 'components';

export const Primary = () => (
	<div>
		<h4>Default</h4>
		<Button type='primary' icon='IoArrowUpCircle'>
			Create your account
		</Button>
		<h4>Disabled</h4>
		<Button disabled type='primary'>
			Create your account
		</Button>
	</div>
);

export const Secondary = () => (
	<div>
		<h4>Default</h4>
		<Button text='Default' type='secondary' />
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='secondary' />
	</div>
);

export const Danger = () => {
	<div>
		<h4>Default</h4>
		<Button text='Default' type='secondary' />
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='secondary' />
	</div>;
};

export default {
	title: 'Design System/Button',
	component: Button,
};
