import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { Link, useParams } from 'react-router-dom';
import postPledge from '../api/post-pledge';

const PledgeForm = ({ projectId }) => {
    const id = projectId;
    const navigate = useNavigate();

    const { auth, setAuth } = useAuth();

    const [pledge, setPledge] = useState({
        supporter: auth.username,
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

    const handleSubmitPledge = (e) => {
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
                auth.token
            );
        }
    };

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
                    <label htmlFor='amount'>Other Amount: </label>
                    <input
                        onChange={handleChange}
                        type='number'
                        id='amount'
                        placeholder='$'
                    />
                </div>
                <p>${pledge.amount}</p>
                <label htmlFor='comment'>Comment: </label>
                <textarea
                    name='comment'
                    id='comment'
                    rows={3}
                    onChange={handleChange}
                ></textarea>
                <button>Pledge</button>
            </form>
        </section>
    );
};
export default PledgeForm;
