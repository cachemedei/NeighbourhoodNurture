import './styles/LoginForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import toast, { Toaster } from 'react-hot-toast';

import z from 'zod';

import postLogin from '../api/post-login';

const loginSchema = z.object({
    username: z.string().min(1, { message: 'Username required' }),
    password: z.string().min(1, { message: 'Please enter your password' }),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    const { auth, setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                toast(error.message);
            }
            return;
        } else {
            try {
                const response = await postLogin(
                    result.data.username,
                    result.data.password
                );
                window.localStorage.setItem('token', response.token);
                window.localStorage.setItem('username', result.data.username);
                window.localStorage.setItem('id', response.user_id);
                setAuth({
                    token: response.token,
                    username: result.data.username,
                    user: response.user_id,
                });
                navigate(from);
            } catch (error) {
                toast(error.message);
            }
        }
    };

    return (
        <section className='login'>
            {/* title */}
            <h1 className='title'>Welcome back</h1>
            <Toaster position='bottom-center' />

            {/* login form */}
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='username'
                        autoCapitalize='none'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        id='password'
                    />
                </div>
                <div className='btn-container'>
                    <button className='green-btn' type='submit'>
                        Log In
                    </button>
                </div>
                <p>
                    Don't have an account yet?
                    <Link className='signup-link' to='/signup'>
                        Sign up
                    </Link>
                </p>
            </form>
        </section>
    );
};
export default LoginForm;
