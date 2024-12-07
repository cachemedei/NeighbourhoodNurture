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

    const signupSchema = z.object({
        fName: z.string().min(1, 'Enter your first name'),
        lName: z.string().min(1, 'Enter your last name'),
        email: z.string()
            .min(1, 'Enter your email')
            .email(),
        username: z.string().min(1, 'Enter a username'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = signupSchema.safeParse(credentials)
        if(!result.success) {
            const error = result.error.errors?.[0]
            if (error) {
                alert(error.message)
            } return
        } else {
            postSignup(result.data.fName, result.data.lName, result.data.email, result.data.username, result.data.password)
            .then((response) => {
                    postLogin(result.data.username, result.data.password).then(
                        (loginResponse) => {
                            window.localStorage.setItem('token', loginResponse.token),
                            window.localStorage.setItem('id', loginResponse.id),
                            setAuth({
                                token: loginResponse.token,
                                username: result.data.username,
                                id: loginResponse.user_id,
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
                    <label htmlFor='fName'>First Name:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='fName'
                    />
                </div>
                <div className='form-container'>
                    <label htmlFor='lName'>Last Name:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='lName'
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
