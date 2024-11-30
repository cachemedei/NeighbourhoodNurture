import './styles/Nav.css';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import NurtureLogo from '/images/logo-green.png';

const Nav = () => {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        setAuth({ token: null });
    };

    return (
        <>
            <nav>
                <img src={NurtureLogo} alt='' />
                <div className='nav-links'>
                    <Link to='/'>Home</Link>
                    {auth.token ? (
                        <Link to='/' onClick={handleLogout}>
                            Log Out
                        </Link>
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
