import { Link } from 'react-router-dom';
import './styles/Footer.css';
import footerImg from '/images/footer.jpg';
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
                <Link to='/about'>about</Link>
                <Link to='/'>home</Link>
                {auth.token ? (
                    <>
                        <Link to='/account'>account</Link>
                        <p onClick={handleLogout}>log out</p>
                    </>
                ) : (
                    <>
                        <Link to='/login'>log in</Link>
                        <Link to='/signup'>sign up</Link>
                    </>
                )}
            </section>
        </footer>
    );
};
export default Footer;
