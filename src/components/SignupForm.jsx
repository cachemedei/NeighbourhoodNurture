import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postSignup from '../api/post-signup';
import postLogin from '../api/post-login';
import './styles/SignupForm.css'

const SignupForm = () => {
    const navigate = useNavigate();
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
        if (credentials.username && credentials.password) {
            postSignup(credentials.username, credentials.password).then(
                (response) => {
                    console.log(response);
                }
            );
            postLogin(credentials.username, credentials.password).then(
                (response) => {
                    window.localStorage.setItem('token', response.token);
                    navigate('/');
                }
            );
        }
    };

    return (
        <section className='signup'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='username'
                        placeholder='Enter username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        id='password'
                        placeholder='Password'
                    />
                </div>
                <button type='submit'>Create Account</button>
            </form>
        </section>
    );
};
export default SignupForm;
