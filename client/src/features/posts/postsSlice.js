import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    starredPosts: [],
    isLoading: false,
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setStarredPosts: (state, action) => {
            state.starredPosts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
            state.starredPosts = state.starredPosts.filter(post => post._id !== action.payload);
        },
        togglePostStar: (state, action) => {
            const post = state.posts.find(p => p._id === action.payload);
            if (post) {
                post.isStarred = !post.isStarred;
            }
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const {
    setPosts,
    setStarredPosts,
    addPost,
    removePost,
    togglePostStar,
    setLoading,
    setError
} = postsSlice.actions;

export default postsSlice.reducer;