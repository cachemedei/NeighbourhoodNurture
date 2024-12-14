import './styles/EditProfile.css';

import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

import useUser from '../hooks/use-user';
import putUser from '../api/put-user';
import useLoader from '../hooks/use-loader';
import SmlLoader from './SmlLoader';

const EditProfile = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user } = useUser(auth.user);
    const { loading } = useLoader(600);
    const [editing, setEditing] = useState(false);
    const handleEditing = () => setEditing(!editing);

    //set users details as state for input fields
    
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        fname: '',
        lname: '',
        email: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            putUser(
                userDetails?.username,
                userDetails?.password,
                userDetails?.fname,
                userDetails?.lname,
                userDetails?.email,
                user,
                auth.token
            );
            navigate(0);
            setEditing(!editing);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <SmlLoader />;
    }

    return (
        <section className='edit-profile'>
            <h1>Edit Profile</h1>

            {!editing ? (
                <section className='user-details'>
                    <ul>
                        <li>{user?.username}</li>
                        <li>{user?.first_name}</li>
                        <li>{user?.last_name}</li>
                        <li>{user?.email}</li>
                    </ul>
                    <button className='green-btn' onClick={handleEditing}>Edit</button>
                </section>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* first name */}
                    <div className='input-container'>
                        <label htmlFor='fname'>First Name</label>
                        <input onChange={handleChange} type='text' id='fname' />
                    </div>

                    {/* last name */}
                    <div className='input-container'>
                        <label htmlFor='lname'>Last Name</label>
                        <input onChange={handleChange} type='text' id='lname' />
                    </div>

                    {/* email */}
                    <div className='input-container'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            id='email'
                        />
                    </div>

                    {/* username */}
                    <div className='input-container'>
                        <label htmlFor='username'>Username</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            id='username'
                        />
                    </div>

                    {/* password */}
                    <div className='input-container'>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            id='password'
                        />
                    </div>

                    <div className='btn-container'>
                        <button className='green-btn' type='submit'>Submit</button>
                        <button className='green-btn' onClick={handleEditing}>Discard</button>
                    </div>
                </form>
            )}
        </section>
    );
};
export default EditProfile;
