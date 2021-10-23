import { toast, ToastContainer } from 'react-toastify';
import 'App/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components';
import Random from 'App/Random';

const App = () => {
	function notify() {
		toast.dark('Hey 👋, see how easy!');
	}

	return (
		<>
			<div>
				{/* Hello world
				<Button onClick={notify}>Click me</Button> */}
				<Random />
			</div>
			<ToastContainer />
		</>
	);
};

export default App;
