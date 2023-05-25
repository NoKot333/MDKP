import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchPopularPosts = createAsyncThunk('posts/fetchPosts',async () => {
    const {data} = await axios.get('./posts/popular');
    return data;
});

export const fetchPostsTag = createAsyncThunk('posts/fetchPostsTag',async (tag) => {
    const {data} = await axios.get(`./posts/tags/${tag}`);
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags',async () => {
    const {data} = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost',async (id) => 
    await axios.delete(`/posts/${id}`),
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer:{},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state,action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchPostsTag.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsTag.fulfilled]: (state,action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsTag.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state,action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        },
    },
});
export const postsReducer = postsSlice.reducer;