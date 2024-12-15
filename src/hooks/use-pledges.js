import { useEffect, useState } from 'react';

import getPledges from '../api/get-pledges';

export default function usePledges(userId) {
    const [pledges, setPledges] = useState([]);
    const [ownedPledges, setOwnedPledges] = useState();
    const [pledgesError, setPledgesError] = useState();

    useEffect(() => {
        getPledges()
            .then((pledges) => {
                setPledges(pledges);
                let list = []
                for (let id = 0; id < pledges.length; id++) {
                    if (pledges[id].supporter.id == userId) {
                        list.push(pledges[id]);
                    }
                    setOwnedPledges(list)
                }
            })
            .catch((error) => {
                setPledgesError(error);
            });
    }, []);

    return { pledges, pledgesError, ownedPledges };
}
