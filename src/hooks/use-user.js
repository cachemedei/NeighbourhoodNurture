import { useEffect, useState } from 'react';
import getUser from '../api/get-user';

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getUser(userId)
            .then((user) => {
                setUser(user);
            })
            .catch((error) => {
                setError(error);
            });
    }, [userId]);

    return { user, error };
}
