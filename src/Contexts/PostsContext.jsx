import { createContext, useCallback } from "react";
import useFetchPosts from "../hooks/useFetchPosts";



export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {

    const { data, getData, loading, error, lastPost, getNextData, fetching } = useFetchPosts('Posts');

    const fetch = useCallback(() => {
        if (!data) {
            getData(4);
        }
    }, [data, getData]);

    const fetchNextPosts = useCallback(() => {
        if (data && !loading && !fetching && lastPost) {
            getNextData(lastPost);
        }
    }, [data, getNextData, loading, fetching, lastPost]);


    return (
        <PostsContext.Provider value={{ getData, fetch, data, loading, error, fetchNextPosts, fetching }}>
            {children}
        </PostsContext.Provider>
    )
}