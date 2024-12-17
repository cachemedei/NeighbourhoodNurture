import './styles/Footer.css';

import footerImg from '/images/footer.jpg';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const Footer = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('username');
        setAuth({ token: null, user: '', username: '' });
        setShowNav(false);
    };

    return (
        <footer>
            <img src={footerImg} alt='' />
            <section className='footer-links'>
                <Link to='/'>Home</Link>
                {auth.token ? (
                    <>
                        <Link to='/account'>Account</Link>
                        <p onClick={handleLogout}>Log Out</p>
                    </>
                ) : (
                    <>
                        <Link to='/login'>Log In</Link>
                        <Link to='/signup'>Sign Up</Link>
                    </>
                )}
            </section>
        </footer>
    );
};
export default Footer;
