import { useEffect, useState } from 'react';
import getUser from '../api/get-user';

export default function useUser(userId) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();

    useEffect(() => {
        getUser(userId)
            .then((user) => {
                setUser(user);
                setLoading(false)
            })
            .catch((error) => {
                setError(error);
                                setLoading(false);

            });
    }, [userId]);

    return { user, loading, error };
}
