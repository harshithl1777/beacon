import React from 'react';
import { Button } from 'components';

export const Primary = () => (
	<div>
		<h4>Default</h4>
		<Button type='primary' icon='IoArrowUpCircle'>
			Primary Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled type='primary'>
			Primary Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading>Creating your account</Button>
	</div>
);

export const Secondary = () => (
	<div>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' type='secondary'>
			Secondary Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled type='secondary'>
			Primary Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='secondary'>
			Creating your account
		</Button>
	</div>
);

export const Danger = () => (
	<div>
		<h4>Default</h4>
		<Button type='danger'>Danger Button</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='danger'>
			Danger Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='danger'>
			Creating your account
		</Button>
	</div>
);

export const Purple = () => (
	<div>
		<h4>Default</h4>
		<Button type='purple'>Purple Button</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='purple'>
			Purple Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='purple'>
			Creating your account
		</Button>
	</div>
);

export const Blue = () => (
	<div>
		<h4>Default</h4>
		<Button type='blue'>Blue Button</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='blue'>
			Blue Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='blue'>
			Creating your account
		</Button>
	</div>
);

export const Yellow = () => (
	<div>
		<h4>Default</h4>
		<Button type='yellow'>Yellow Button</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='yellow'>
			Yellow Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='yellow'>
			Creating your account
		</Button>
	</div>
);

export default {
	title: 'Design System/Button',
	component: Button,
};
