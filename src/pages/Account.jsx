import './styles/Account.css'

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const Account = () => {
    const { auth } = useAuth();
    const username = auth.username

    return (
        <section className='account'>
            <h1>Hey there, {username}!</h1>
            <p>
                ** note: plans to make this a drop down menu when account link
                is clicked/hovered over **
            </p>
            <div className='links-container'>
                <Link to='/' className='link'>
                    Profile
                </Link>
                <Link to='/activity' className='link'>
                    Activity
                </Link>
                <Link to='/newproject' className='link'>Create Project</Link>
            </div>
        </section>
    );
};
export default Account;
