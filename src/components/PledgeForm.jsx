import './styles/PledgeForm.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import z from 'zod';

import postPledge from '../api/post-pledge';
import toast, { Toaster } from 'react-hot-toast';

const PledgeForm = ({ projectId }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [other, setOther] = useState(false);

    const pledgeSchema = z.object({
        amount: z.string().min(1, 'Donations must be at least $1'),
        comment: z.string().min(1, 'Please add a comment'),
    });
    const [pledge, setPledge] = useState({
        supporter: auth.user,
        amount: '',
        comment: '',
        project: projectId,
        anonymous: false,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPledge((prevPledge) => ({
            ...prevPledge,
            [id]: value,
        }));
    };

    const handlePledgeSubmit = async (e) => {
        e.preventDefault();
        const result = pledgeSchema.safeParse(pledge);
        if (!result.success) {
            const error = result.error.errors?.[0];
            if (error) {
                toast(error.message);
            }
            return;
        }
        try {
            await postPledge(
                auth.token,
                pledge.supporter,
                pledge.amount,
                pledge.comment,
                pledge.project,
                pledge.anonymous
            );
            toast('Thank you for your donation!');
            setTimeout(() => {
                navigate('/account');
            }, 2000);
        } catch (error) {
            toast(error.message);
        }
    };

    return (
        <section className='pledge-form'>
            <Toaster position='bottom-center' />
            <h4>How much would you like to pledge?</h4>
            <form onSubmit={handlePledgeSubmit}>
                <label htmlFor=''></label>
                <div className='amount-options'>
                    <button
                        type='button'
                        className='number-btn'
                        value='5'
                        id='amount'
                        onClick={handleChange}
                    >
                        $5
                    </button>
                    <button
                        type='button'
                        className='number-btn'
                        value='10'
                        id='amount'
                        onClick={handleChange}
                    >
                        $10
                    </button>
                    <button
                        type='button'
                        className='number-btn'
                        value='20'
                        id='amount'
                        onClick={handleChange}
                    >
                        $20
                    </button>
                    <button
                        type='button'
                        className='number-btn'
                        value='50'
                        id='amount'
                        onClick={handleChange}
                    >
                        $50
                    </button>
                    <button
                        type='button'
                        className='number-btn'
                        value='100'
                        id='amount'
                        onClick={handleChange}
                    >
                        $100
                    </button>
                    {other ? (
                        <input
                            onChange={handleChange}
                            type='number'
                            id='amount'
                            placeholder='$'
                            className='number-btn'
                        />
                    ) : (
                        <button
                            type='button'
                            className='number-btn'
                            onClick={() => setOther(!other)}
                        >
                            Other
                        </button>
                    )}
                </div>
                <p className='pledge-amount'>$ {pledge.amount}</p>

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
                <button className='green-btn' type='submit'>
                    Pledge
                </button>
            </form>
        </section>
    );
};
export default PledgeForm;
