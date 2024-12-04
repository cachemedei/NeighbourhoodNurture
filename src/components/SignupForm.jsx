import './styles/SignupForm.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Link } from 'react-router-dom';

import z from 'zod'

import postSignup from '../api/post-signup';
import postLogin from '../api/post-login';

const SignupForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

    // const signupSchema = z.object({
    //     fName: z.string().min(1, { message: 'Please enter your first name' }),
    //     lName: z.string().min(1, { message: 'Please enter your last name' }),
    //     email: z
    //         .string()
    //         .min(1, { message: 'Please enter a valid email' })
    //         .email('This is not a valid email'),
    //     username: z.string().min(1, { message: 'Username required' }),
    //     password: z
    //         .string()
    //         .min(8, { message: 'Password must be at least 8 characters long' }),
    // });

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
        if (credentials.username && credentials.password) {
            postSignup(credentials.username, credentials.password).then(
                (response) => {
                    postLogin(credentials.username, credentials.password).then(
                        (loginResponse) => {
                            window.localStorage.setItem(
                                'token',
                                loginResponse.token
                            ),
                                setAuth({
                                    token: response.token,
                                }),
                                navigate('/');
                        }
                    );
                }
            );
        }
    };

    return (
        <section className='signup'>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <label htmlFor='f-name'>First Name:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='f-name'
                    />
                </div>
                <div className='form-container'>
                    <label htmlFor='l-name'>Last Name:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='l-name'
                    />
                </div>
                <div className='form-container'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        id='email'
                    />
                </div>
                <div className='form-container'>
                    <label htmlFor='username'>Username:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='username'
                    />
                </div>
                <div className='form-container'>
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        id='password'
                    />
                </div>
                <button type='submit'>Create Account</button>
                <p>
                    Already have an account?
                    <Link to='/signup'>Log In</Link>
                </p>
            </form>
        </section>
    );
};
export default SignupForm;
