import { useContext } from 'react';
import { useState } from 'react';
import { FirebaseContext } from '../Contexts/FirebaseContext'
import { useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useFetchPostParam = (colName, slug) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const { db } = useContext(FirebaseContext);

    const getData = useCallback(async () => {
        setLoading(true)

        try {
            const colRef = collection(db, colName);
            const q = query(colRef, where('slug', '==', slug));
            const res = await getDocs(q);

            const resData = res.docs.map((doc) => {
                const resAnother = doc.data();
                return {
                    id: doc.id,
                    ...resAnother,
                    createdAt: resAnother.createdAt.toDate()
                }
            })

            if (resData && resData.length) {
                setData(resData[0])
            }
        } catch (error) {
            setError(error.message)
        }

        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { data, error, getData, loading }
}

export default useFetchPostParam