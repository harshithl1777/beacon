import React from 'react';
import { Button } from 'components';
import { Icon } from 'components';

export const Primary = () => (
	<div>
		<h4>Default</h4>
		<Button text='Default' type='primary'>
			Default
		</Button>
		<h4>Disabled</h4>
		<Icon name='feather-FiAirplay' color='light' stroke={64} />
		<Button disabled type='primary'>
			Disabled
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
