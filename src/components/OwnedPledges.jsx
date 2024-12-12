import './styles/OwnedPledges.css';

import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa6';

import usePledges from '../hooks/use-pledges';
import useProject from '../hooks/use-project';

const OwnedPledges = () => {
    const { pledges } = usePledges();
    const { auth } = useAuth();
    //const { project } = useProject(pledges.project);
    const userId = auth.user;

    const [usersPledges, setUsersPledges] = useState([]);
    const [showData, setShowData] = useState(false);
    const handleShowData = () => setShowData(!showData);

    useEffect(() => {
        let list = [];
        for (let id = 0; id < pledges.length; id++) {
            if (pledges[id].supporter == userId) {
                list.push(pledges[id]);
            }
        }
        setUsersPledges(list);
    }, [pledges]);

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
                        {usersPledges.map((pledge, i) => (
                            <li className='item' key={i}>
                                ${pledge.amount} for {pledge.project}
                            </li>
                        ))}
                    </ul>
                    <p className='summary'>
                        In total you've pledged: lol i dont know yet
                    </p>
                </>
            ) : null}
        </section>
    );
};
export default OwnedPledges;
