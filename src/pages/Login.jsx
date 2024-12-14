import { useAuth } from '../hooks/use-auth';

import LoginForm from '../components/LoginForm';
import LrgLoader from '../components/LrgLoader';
import ErrorPage from '../components/ErrorPage';
import useLoader from '../hooks/use-loader';

const Login = () => {
    const { loading } = useLoader(400);
    const { auth } = useAuth();

    if (auth.token) {
        return <ErrorPage />;
    } else if (loading) {
        return <LrgLoader />;
    } else return <LoginForm />;
};
export default Login;
