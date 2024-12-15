import './styles/ErrorPage.css';
import tree from '/favicon.svg';

import { MdOutlineThumbDownAlt } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NotFound = ({ error }) => {
    return (
        <section className='error-page'>
            <h2>Oh no, looks like something bad happened on our end!</h2>
            <MdOutlineThumbDownAlt size={30} />
            <p>{error}</p>
            <Link to='/'>
                <img className='tree' src={tree} alt='' />
            </Link>
            <Link to='/'>Return Home</Link>
        </section>
    );
};
export default NotFound;
