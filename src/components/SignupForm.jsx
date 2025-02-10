import './styles/SignupForm.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import z from 'zod';

import postSignup from '../api/post-signup';
import postLogin from '../api/post-login';

const signupSchema = z.object({
    fName: z.string().min(1, 'Enter your first name'),
    lName: z.string().min(1, 'Enter your last name'),
    email: z.string().min(1, 'Enter your email').email(),
    username: z.string().min(1, 'Enter a username'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignupForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        fName: '',
        lName: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = signupSchema.safeParse(credentials);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                toast(error.message);
            }
            return;
        }
        try {
            await postSignup(
                result.data.fName,
                result.data.lName,
                result.data.email,
                result.data.username,
                result.data.password
            );

            const loginResponse = await postLogin(
                result.data.username,
                result.data.password
            );
            window.localStorage.setItem('token', loginResponse.token),
                window.localStorage.setItem('id', loginResponse.id),
                setAuth({
                    token: loginResponse.token,
                    username: result.data.username,
                    id: loginResponse.user_id,
                });

            navigate('/');
        } catch (error) {
            toast(error.message);
        }
    };

    return (
        <section className='signup'>
            {/* title */}
            <h1 className='title'>Sign Up</h1>
            <Toaster position='bottom-center' />

            {/* signup form */}
            <form onSubmit={handleSignup}>
                <div className='input-container'>
                    <label htmlFor='fName'>First Name:</label>
                    <input onChange={handleChange} type='text' id='fName' />
                </div>
                <div className='input-container'>
                    <label htmlFor='lName'>Last Name:</label>
                    <input onChange={handleChange} type='text' id='lName' />
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email:</label>
                    <input onChange={handleChange} type='email' id='email' />
                </div>
                <div className='input-container'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='username'
                        autoCapitalize='none'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        id='password'
                    />
                </div>
                <div className='btn-container'>
                    <button className='green-btn' type='submit'>
                        Create Account
                    </button>
                </div>
                <p>
                    Already have an account?
                    <Link className='login-link' to='/login'>
                        Log In
                    </Link>
                </p>
            </form>
        </section>
    );
};
export default SignupForm;
