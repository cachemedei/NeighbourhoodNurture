import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postLogin from '../api/post-login';
import { useAuth } from '../hooks/use-auth';
import './styles/LoginForm.css'

const LoginForm = () => {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

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
            postLogin(credentials.username, credentials.password).then(
                (response) => {
                    window.localStorage.setItem('token', response.token);
                    setAuth({
                        token: response.token,
                    });
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
                <button type='submit'>Log In</button>
            </form>
        </section>
    );
};
export default LoginForm;
