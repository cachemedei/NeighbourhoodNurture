import './styles/Account.css';

import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import accountImg from '/images/accountimg.webp';

const Account = () => {
    const { auth } = useAuth();
    const username = auth.username;

    return (
        <section className='account'>
            <img src={accountImg} alt='' />

            <h1 className='title'>Hey {username},</h1>
            <div className='dashboard'>
                <div className='links-container'>
                    <Link to='/account' className='link'>
                        Activity
                    </Link>
                    <Link to='/account/editprofile' className='link'>
                        Edit Profile
                    </Link>
                    <Link to='/newproject' className='link'>
                        Create Project
                    </Link>
                </div>
                <Outlet />
            </div>
        </section>
    );
};
export default Account;
