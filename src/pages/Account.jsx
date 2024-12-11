import './styles/Account.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import bannerImg from '/images/footer2.jpg';

const Account = () => {
    const { auth } = useAuth();
    const username = auth.username;

    return (
        <section className='account'>
            <img src={bannerImg} alt='' />
            <div className='dashboard'>
                <h1>Hey {username},</h1>
                <div className='links-container'>
                    <Link to='/activity' className='link'>
                        Activity
                    </Link>
                    <Link to='/newproject' className='link'>
                        Create Project
                    </Link>
                    <Link to='/editprofile' className='link'>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Account;
