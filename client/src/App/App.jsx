import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components';
import { showToast } from 'services/helpers';
import 'app/global.scss';

const App = () => {
	return (
		<>
			<div>
				Hello world
				<Button onClick={() => showToast.success('It worked', 'This is a success toast')}>
					Click me
				</Button>
			</div>
			<ToastContainer />
		</>
	);
};

export default App;
