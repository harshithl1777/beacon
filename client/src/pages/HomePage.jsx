import { useNavigate } from 'react-router-dom';
import { authAPI } from 'services/api';

const Home = () => {
	const navigate = useNavigate();

	const logout = async () => {
		await authAPI.remove();
		navigate('/', { replace: true });
	};

	return <button onClick={logout}>Logout</button>;
};

export default Home;
