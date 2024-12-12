import { useEffect, useState } from 'react';

export default function useLoader(timer) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, timer);

        return () => clearTimeout(timeout);
    }, []);

    return { loading };
}
