import './styles/PledgeForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import postPledge from '../api/post-pledge';
import toast, { Toaster } from 'react-hot-toast';

const PledgeForm = ({ projectId }) => {
    const notify = () => toast('Thank you for your pledge!');
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
        if (
            pledge.supporter &&
            pledge.amount &&
            pledge.comment &&
            pledge.project &&
            pledge.anonymous
        ) {
            postPledge(
                auth.token,
                pledge.supporter,
                pledge.amount,
                pledge.comment,
                pledge.project,
                pledge.anonymous,
            ).then(() => {
                notify();
                setTimeout(() => {
                    navigate('/account');
                }, 2000);
            });
        }
    };

    return (
        <section className='pledge-form'>
            <Toaster />
            <h4>How much would you like to pledge?</h4>
            <form onSubmit={handleSubmitPledge}>
                <label htmlFor=''></label>
                <div className='amount-options'>
                    <button className='green-btn' value='5' id='amount' onClick={handleChange}>
                        $5
                    </button>
                    <button className='green-btn' value='10' id='amount' onClick={handleChange}>
                        $10
                    </button>
                    <button className='green-btn' value='20' id='amount' onClick={handleChange}>
                        $20
                    </button>
                    <button className='green-btn' value='50' id='amount' onClick={handleChange}>
                        $50
                    </button>
                    <button className='green-btn' value='100' id='amount' onClick={handleChange}>
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
                        <button className='green-btn' onClick={() => setOther(!other)}>Other</button>
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
                <button className='green-btn'>
                    Pledge
                </button>
            </form>
        </section>
    );
};
export default PledgeForm;
