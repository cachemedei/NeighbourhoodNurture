import { useAuth } from '../hooks/use-auth';
import './styles/ErrorPage.css';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const { auth } = useAuth();

    if (auth.token) {
        return (
            <section className='error-page'>
                <h1>Oops!</h1>
                <p className=''>Looks like you're already logged in</p>
                <Link to='/' className='error-link'>Return Home</Link>
            </section>
        );
    } else
        return (
            <section className='error-page'>
                <h1>Oops!</h1>
                <p>
                    Please
                    <Link to='/login' className='error-link'>
                        {' '}
                        log in{' '}
                    </Link>
                    or
                    <Link to='/signup' className='error-link'>
                        {' '}
                        sign up{' '}
                    </Link>
                    to view this page
                </p>
            </section>
        );
};
export default ErrorPage;
