import './styles/Nav.css';

import { Link, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

import nurtureLogo from '/images/logo-green.png';
import Footer from '../components/Footer';

const Nav = () => {
    const { auth, setAuth } = useAuth();
    const [showNav, setShowNav] = useState(false);
    const handleShowMenu = () => setShowNav(!showNav);
    const navigate = useNavigate();

    const handleLogout = () => {
        setShowNav(false);
        navigate('/');
        setTimeout(() => {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('username');
            setAuth({ token: null, user: '', username: '' });
        }, 1000);
    };

    return (
        <nav>
            <div className='nav'>
                <Link to='/' onClick={() => setShowNav(false)}>
                    <img src={nurtureLogo} alt='' />
                </Link>

                {/* desktop menu */}
                <section className='desktop-menu'>
                    <Link className='link' to='/'>
                        Home
                    </Link>
                    {auth.token ? (
                        <>
                            <Link className='link' to='/account'>
                                Account
                            </Link>
                            <button
                                className='link logout'
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className='link' to='/login'>
                                Log In
                            </Link>
                            <Link className='link' to='/signup'>
                                Sign Up
                            </Link>
                        </>
                    )}
                </section>

                {/* hamburger */}
                <div onClick={handleShowMenu} className='hamburger'>
                    {showNav ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                </div>
            </div>

            {/* mobile menu */}
            {showNav ? (
                <div className='mobile-links'>
                    <Link onClick={handleShowMenu} className='link' to='/'>
                        Home
                    </Link>
                    {auth.token ? (
                        <>
                            <Link
                                onClick={handleShowMenu}
                                className='link'
                                to='/account'
                            >
                                Account
                            </Link>
                            <Link
                                onClick={handleShowMenu}
                                className='link'
                                to='/newproject'
                            >
                                Create Project
                            </Link>
                            <Link
                                className='link'
                                to='/'
                                onClick={handleLogout}
                            >
                                Log Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                onClick={handleShowMenu}
                                className='link'
                                to='/login'
                            >
                                Log In
                            </Link>
                            <Link
                                onClick={handleShowMenu}
                                className='link'
                                to='/signup'
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            ) : null}
            <ScrollRestoration />
            <Outlet context={{ showNav, setShowNav }} />
            <Footer />
        </nav>
    );
};
export default Nav;
