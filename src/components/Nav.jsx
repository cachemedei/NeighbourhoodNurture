import './styles/Nav.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import NurtureLogo from '/images/logo-green.png';

const Nav = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('username');
        setAuth({ token: null, user: '', username: '' });
        navigate('/');
        navigate(0);
    };

    return (
        <>
            <nav>
                <img src={NurtureLogo} alt='' />
                <div className='nav-links'>
                    <Link to='/'>Home</Link>
                    {auth.token ? (
                        <>
                            <Link to='/account'>Account</Link>
                            <Link to='/' onClick={handleLogout}>
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>Log In</Link>
                            <Link to='/signup'>Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};
export default Nav;
