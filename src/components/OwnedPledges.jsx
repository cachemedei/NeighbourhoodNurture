import './styles/OwnedPledges.css';

import { useAuth } from '../hooks/use-auth';
import { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6';

import usePledges from '../hooks/use-pledges';
import PledgeProjectTitle from './PledgeProjectTitle';

const OwnedPledges = () => {
    const { auth } = useAuth();
    const userId = auth.user;
    const { ownedPledges } = usePledges(userId);

    const [showData, setShowData] = useState(true);
    const handleShowData = () => setShowData(!showData);

    return (
        <section className='owned-pledges'>
            <h1 onClick={handleShowData} className='title'>
                my pledges
                {!showData ? (
                    <FaChevronRight size={15} />
                ) : (
                    <FaChevronDown size={15} />
                )}
            </h1>
            {showData ? (
                <>
                    <ul className='list'>
                        {ownedPledges?.map((pledge, i) => (
                            <div className='info-container'>
                                <PledgeProjectTitle id={pledge.project} />
                                <li className='value' key={i}>
                                    ${pledge.amount}
                                </li>
                            </div>
                        ))}
                    </ul>
                </>
            ) : null}
        </section>
    );
};
export default OwnedPledges;
