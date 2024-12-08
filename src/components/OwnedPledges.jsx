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
            <h3>My Pledges</h3>
            <ul>
              {usersPledges.map((pledge, i) => (
                <li key={i}>{pledge.amount}</li>
              ))}
            </ul>
            <p>In total you've pledged: not sure yet :(</p>
        </div>
    );
};
export default OwnedPledges;


// const project = {
//     goal: 3000,
//     pledges: [
//         { user: '1', amount: 300 },
//         { user: '2', amount: 100 },
//         { user: '4', amount: 100 },
//     ],
// };

// const totalPledges = project.pledges.reduce(
//     (acc, pledge) => acc + pledge.amount,
//     0
// );

// const remaining = project.goal - totalPledges;
// console.log(remaining);