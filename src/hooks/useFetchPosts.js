import { useCallback, useContext, useState } from 'react'
import { FirebaseContext } from "../Contexts/FirebaseContext"
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';

const useFetchPosts = (colName) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [lastPost, setLastPost] = useState(null);

    const { db } = useContext(FirebaseContext);
    
    const getData = useCallback(async (numOfPosts) => {
        setLoading(true)
        try {
            const colRef = collection(db, colName);
            const q = query(colRef, orderBy('createdAt', 'desc'), limit(numOfPosts));
            const res = await getDocs(q);

            const resData = res.docs.map(doc => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                    createdAt: docData.createdAt.toDate()
                }
            })
            setData(resData);
            setLastPost(res.docs[res.docs.length - 1])
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getNextData = useCallback(async (lastVisible) => {
        setFetching(true)
        try {
            const colRef = collection(db, colName);
            const q = query(colRef, orderBy('createdAt', 'desc'), limit(4),
                startAfter(lastVisible));
            const res = await getDocs(q);

            const resData = res.docs.map(doc => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    ...docData,
                    createdAt: docData.createdAt.toDate()
                }
            })
            setData(data => [...data, ...resData]);
            setLastPost(res.docs[res.docs.length - 1]);
        } catch (error) {
            setError(error.message)
        }
        setFetching(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, error, loading, getData, lastPost, getNextData, fetching }
}

export default useFetchPosts