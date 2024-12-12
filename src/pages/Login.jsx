import LoginForm from '../components/LoginForm';
import LrgLoader from '../components/LrgLoader';
import useLoader from '../hooks/use-loader';

const Login = () => {
    const { loading } = useLoader(400);

    return loading ? <LrgLoader /> : <LoginForm />;
};
export default Login;
