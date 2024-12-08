import './styles/PledgeForm.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import postPledge from '../api/post-pledge';

const PledgeForm = ({ projectId }) => {
    const navigate = useNavigate();

    const { auth } = useAuth();

    const [pledge, setPledge] = useState({
        supporter: auth.user,
        amount: '',
        comment: '',
        project: projectId,
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
            pledge.project
        ) {
            postPledge(
                pledge.supporter,
                pledge.amount,
                pledge.comment,
                pledge.project,
                auth.token,
                auth.username,
            );
            navigate('/')
        }
    };

    // navigate(0)

    return (
        <section className='pledge'>
            <h4>How much would you like to pledge {pledge.supporter}?</h4>
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
                    <p>{pledge.amount}</p>
                </div>
                <label htmlFor='amount'>Other Amount: </label>
                <input
                    onChange={handleChange}
                    type='number'
                    id='amount'
                    placeholder='$'
                    className='other'
                />

                <label htmlFor='comment'>Comment: </label>
                <textarea
                    className='comment'
                    name='comment'
                    id='comment'
                    rows={3}
                    onChange={handleChange}
                ></textarea>
                <button className='pledge-btn'>Pledge</button>
            </form>
        </section>
    );
};
export default PledgeForm;
