import './styles/LoginForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import z from 'zod';

import postLogin from '../api/post-login';

const LoginForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const loginSchema = z.object({
        username: z.string().min(1, { message: 'Username required' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' }),
    });

    const [credentials, setCredentials] = useState({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                alert(error.message);
            }
            return;
        } else {
            postLogin(result.data.username, result.data.password).then(
                (loginResponse) => {
                    window.localStorage.setItem('token', loginResponse.token);
                    navigate('/');
                }
            );
        }
    };

    return (
        <section className='login'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        id='password'
                    />
                </div>
                <button type='submit'>Log In</button>
                <p>
                    Don't have an account yet?
                    <Link to='/signup'>Sign up</Link>
                </p>
            </form>
        </section>
    );
};
export default LoginForm;
