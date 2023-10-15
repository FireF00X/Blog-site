import React from 'react'
import { FirebaseProvider } from './FirebaseContext'
import { PostsProvider } from './PostsContext'

const AppProviders = ({ children }) => {
    return (
        <FirebaseProvider>
            <PostsProvider>
                {children}
            </PostsProvider>
        </FirebaseProvider>
    )
}

export default AppProviders