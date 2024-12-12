import './styles/PledgeForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import postPledge from '../api/post-pledge';

const PledgeForm = ({ projectId }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [other, setOther] = useState(false);

    const [pledge, setPledge] = useState({
        supporter: auth.user,
        amount: '',
        comment: '',
        project: projectId,
        anonymous: true,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
        }));
    };

    const handleSubmitPledge = async (e) => {
        e.preventDefault();
        console.log(pledge);
        if (
            pledge.supporter &&
            pledge.amount &&
            pledge.comment &&
            pledge.project &&
            pledge.anonymous
        ) {
            postPledge(
                pledge.supporter,
                pledge.amount,
                pledge.comment,
                pledge.project,
                pledge.anonymous,
                auth.token,
                auth.username
            );
            navigate('/');
        }
    };

    return (
        <section className='pledge-form'>
            <h4>How much would you like to pledge?</h4>
            <form onSubmit={handleSubmitPledge}>
                <label htmlFor=''></label>
                <div className='amount-options'>
                    <button value='5' id='amount' onClick={handleChange}>
                        $5
                    </button>
                    <button value='10' id='amount' onClick={handleChange}>
                        $10
                    </button>
                    <button value='20' id='amount' onClick={handleChange}>
                        $20
                    </button>
                    <button value='50' id='amount' onClick={handleChange}>
                        $50
                    </button>
                    <button value='100' id='amount' onClick={handleChange}>
                        $100
                    </button>
                    {other ? (
                        <input
                            onChange={handleChange}
                            type='number'
                            id='amount'
                            placeholder='$'
                            className='other'
                        />
                    ) : (
                        <button onClick={() => setOther(!other)}>Other</button>
                    )}
                </div>
                <p className='pledge-amount'>${pledge.amount}</p>

                <label htmlFor='comment' className='comment-label'>
                    Comment:{' '}
                </label>
                <textarea
                    className='comment'
                    name='comment'
                    id='comment'
                    rows={3}
                    onChange={handleChange}
                ></textarea>
                {auth.token ? (
                    <label className='anonymous' htmlFor='anonymous'>
                        Pledge anonymously?
                        <select
                            className='selector'
                            id='anonymous'
                            onChange={handleChange}
                        >
                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </label>
                ) : (
                    <p>
                        If you don't want your pledge to be anonymous
                        <Link to='/login'>log in</Link>
                        or
                        <Link to='/signup'>create an account</Link>!
                    </p>
                )}
                <button className='pledge-btn'>Pledge</button>
            </form>
        </section>
    );
};
export default PledgeForm;
