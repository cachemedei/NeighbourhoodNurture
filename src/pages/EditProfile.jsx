import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';

import './styles/EditProfile.css';
import useUser from '../hooks/use-user';

const EditProfile = () => {
    const { auth } = useAuth();
    const { user } = useUser(auth.user);



    return (
        <section className='edit-profile'>
            <h1>Edit Profile</h1>
            <form>
                {/* first name */}
                <div className='input-container'>
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' id='fname' value={user?.first_name} />
                </div>

                {/* last name */}
                <div className='input-container'>
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' id='lname' value={user?.last_name} />
                </div>

                {/* email */}
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={user?.email} />
                </div>

                {/* username */}
                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value={user?.username} />
                </div>

                {/* password */}
                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={user?.password}
                    />
                </div>

                <div className='btn-container'>
                    <button>Submit</button>
                    <button>Discard</button>
                </div>
            </form>
        </section>
    );
};
export default EditProfile;
