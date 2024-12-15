import { Link } from 'react-router-dom';

const NotFound = ({ error }) => {
    return (
        <section className='error-page'>
            <h4>{error}</h4>
            <Link to='/'>Return Home</Link>
        </section>
    );
};
export default NotFound;
