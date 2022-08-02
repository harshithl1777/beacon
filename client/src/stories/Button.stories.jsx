import { Button } from 'components';
import { toast } from 'react-toastify';

export const Primary = () => (
	<div>
		<h4>Default</h4>
		<Button variant='primary' icon='IoArrowUpCircle' onClick={() => toast('Default')}>
			Primary Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled variant='primary'>
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
		<Button icon='IoArrowUpCircle' variant='secondary'>
			Secondary Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled variant='secondary'>
			Primary Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading variant='secondary'>
			Creating your account
		</Button>
	</div>
);

export const Danger = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' variant='danger'>
			Danger Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' variant='danger'>
			Danger Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading variant='danger'>
			Creating your account
		</Button>
	</>
);

export const Purple = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' variant='purple'>
			Purple Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' variant='purple'>
			Purple Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading variant='purple'>
			Creating your account
		</Button>
	</>
);

export const Blue = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' variant='blue'>
			Blue Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' variant='blue'>
			Blue Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading variant='blue'>
			Creating your account
		</Button>
	</>
);

export const Yellow = () => (
	<>
		<h4>Default</h4>
		<Button icon='IoArrowUpCircle' variant='yellow'>
			Yellow Button
		</Button>
		<h4>Disabled</h4>
		<Button disabled text='Disabled' variant='yellow'>
			Yellow Disabled
		</Button>
		<h4>Loading</h4>
		<Button loading variant='yellow'>
			Creating your account
		</Button>
	</>
);

const ButtonStory = {
	title: 'Design System/Button',
	component: Button,
};

export default ButtonStory;
