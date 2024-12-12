import SignupForm from '../components/SignupForm';
import useLoader from '../hooks/use-loader';
import LrgLoader from '../components/LrgLoader';

const Signup = () => {
    const { loading } = useLoader(400);

    return loading ? <LrgLoader /> : <SignupForm />;
};
export default Signup;
