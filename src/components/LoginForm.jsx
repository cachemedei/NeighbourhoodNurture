import './styles/LoginForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import toast, { Toaster } from 'react-hot-toast';
import z from 'zod';

import postLogin from '../api/post-login';

const notify = (msg) => toast(msg);

const LoginForm = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    const loginSchema = z.object({
        username: z.string().min(1, { message: 'Username required' }),
        password: z.string().min(1, { message: 'Please enter your password' }),
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                console.log(response);
            }
            return;
        } else {
            postLogin(result.data.username, result.data.password).then(
                (response) => {
                    window.localStorage.setItem('token', response.token);
                    window.localStorage.setItem(
                        'username',
                        result.data.username
                    );
                    window.localStorage.setItem('id', response.user_id);
                    setAuth({
                        token: response.token,
                        username: result.data.username,
                        user: response.user_id,
                    });
                    navigate('/');
                }
            );
        }
    };

    return (
        <section className='login'>
            {/* title */}
            <h1>Welcome back</h1>
            <Toaster position='bottom-center' />

            {/* login form */}
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
                    <input onChange={handleChange} type='text' id='username' />
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
                    <button type='submit'>Log In</button>
                </div>
                <p>
                    Don't have an account yet?
                    <Link className='signup-link' to='/signup'>Sign up</Link>
                </p>
            </form>
        </section>
    );
};
export default LoginForm;

// const [errors, setErrors] = useState({
//      username: null,
//      password: null,
// })

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     const result = loginSchema.safeParse(credentials);
//     if (!result.success) {
//         const error = result.error.errors?.[0];
//         if (error) {
//             setErrors(error.message);
//         }
//         return;
//     } else {
//         postLogin(result.data.username, result.data.password).then(
//             (response) => {
//                 window.localStorage.setItem('token', response.token);
//                 setAuth({
//                     token: response.token,
//                 });
//                 navigate('/');
//             }
//         );
//     }
// };

// return (
//      <div>{errors}</div>
// )
