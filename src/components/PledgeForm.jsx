import './styles/PledgeForm.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import postPledge from '../api/post-pledge';

const PledgeForm = ({ projectId }) => {
    const navigate = useNavigate();
    const [other, setOther] = useState(false)

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
                    <button value='50' id='amount' onClick={handleChange}>
                        $50
                    </button>
                    <button value='100' id='amount' onClick={handleChange}>
                        $100
                    </button>
                    <button onClick={() => setOther(!other)}>Other</button>
                    <p>{pledge.amount}</p>
                </div>
                {other ? (
                    <div className='other-container'>
                        <label htmlFor='amount'>Other: </label>
                        <input
                            onChange={handleChange}
                            type='number'
                            id='amount'
                            placeholder='$'
                            className='other'
                        />
                    </div>
                ) : null}

                <label htmlFor='comment' className='comment-label'>Comment: </label>
                <textarea
                    className='comment'
                    name='comment'
                    id='comment'
                    rows={4}
                    onChange={handleChange}
                ></textarea>
                <button className='pledge-btn'>Pledge</button>
            </form>
        </section>
    );
};
export default PledgeForm;
