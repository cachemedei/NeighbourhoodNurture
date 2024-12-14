import { useAuth } from '../hooks/use-auth';

import SignupForm from '../components/SignupForm';
import ErrorPage from '../components/ErrorPage';
import useLoader from '../hooks/use-loader';
import LrgLoader from '../components/LrgLoader';

const Signup = () => {
    const { loading } = useLoader(400);
    const { auth } = useAuth();

    if (auth.token) {
        return <ErrorPage />;
    } else if (loading) {
        return <LrgLoader />;
    } else return <SignupForm />;
};
export default Signup;
