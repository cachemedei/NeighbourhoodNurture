import { useAuth } from '../hooks/use-auth';
import { useEffect, useState } from 'react';

import usePledges from '../hooks/use-pledges';

const OwnedPledges = () => {
    const { auth } = useAuth();
    const userId = auth.user;

    const { pledges } = usePledges();

    const [usersPledges, setUsersPledges] = useState([]);

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
        <div>
            <h1>My Pledges</h1>
            <ul>
              {usersPledges.map((pledge, i) => (
                <li key={i}>{pledge.amount}</li>
              ))}
            </ul>
            <p>In total you've pledged: lol i dont know yet</p>
        </div>
    );
};
export default OwnedPledges;