import { Spinner } from 'components';

export const Light = () => (
	<>
		<h4>Small</h4>
		<div
			style={{ background: 'black', width: 'fit-content', borderRadius: '4px', padding: '10px' }}
		>
			<Spinner color='light' size='small' />
		</div>
		<h4>Medium</h4>
		<div
			style={{ background: 'black', width: 'fit-content', borderRadius: '4px', padding: '10px' }}
		>
			<Spinner color='light' />
		</div>
		<h4>Large</h4>
		<div
			style={{ background: 'black', width: 'fit-content', borderRadius: '4px', padding: '10px' }}
		>
			<Spinner color='light' size='large' />
		</div>
		<h4>Massive</h4>
		<div
			style={{ background: 'black', width: 'fit-content', borderRadius: '4px', padding: '10px' }}
		>
			<Spinner color='light' size='massive' />
		</div>
	</>
);

export const Dark = () => (
	<>
		<h4>Small</h4>
		<Spinner size='small' />
		<h4>Medium</h4>
		<Spinner />
		<h4>Large</h4>
		<Spinner size='large' />
		<h4>Massive</h4>
		<Spinner size='massive' />
	</>
);

const SpinnerStory = {
	title: 'Design System/Spinner',
	component: Spinner,
};

export default SpinnerStory;
