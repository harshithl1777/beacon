import { Button } from 'components';
import { toast } from 'react-toastify';

export const Primary = () => (
	<div>
		<h4>Default</h4>
		<Button type='primary' icon='IoArrowUpCircle' onClick={() => toast('Default')}>
			Primary Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled type='primary'>
			Primary Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading>Creating your account</Button>
		<h4>With Tooltip</h4>
		<Button tooltip='This is a tooltip'>Hover here!</Button>
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
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' type='danger'>
			Danger Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='danger'>
			Danger Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='danger'>
			Creating your account
		</Button>
	</>
);

export const Purple = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' type='purple'>
			Purple Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='purple'>
			Purple Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='purple'>
			Creating your account
		</Button>
	</>
);

export const Blue = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' type='blue'>
			Blue Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='blue'>
			Blue Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='blue'>
			Creating your account
		</Button>
	</>
);

export const Yellow = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' type='yellow'>
			Yellow Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' type='yellow'>
			Yellow Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading type='yellow'>
			Creating your account
		</Button>
	</>
);

const ButtonStory = {
	title: 'Design System/Button',
	component: Button,
};

export default ButtonStory;
