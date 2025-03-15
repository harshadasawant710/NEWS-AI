import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils";

const initialState = {
    loading: false,
    bookmarks: [],
    error: null,
};

export const addBookmarks = createAsyncThunk('/addBookmark', async (data, { rejectWithValue }) => {
    const id = getCookie('id')
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`, data)
        return res.data
    }
    catch (error) {
        return rejectWithValue(error.message)
    }
})

export const removeBookmarks = createAsyncThunk('/removeBookmark', async (articleUrl, { rejectWithValue }) => {
    const id = getCookie('id')
    try {
        const url = articleUrl
            ? `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks?articleUrl=${articleUrl}`
            : `${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`;

            //console.log("Delete Request URL:", url);


        await axios.delete(url);
        return articleUrl || 'all';
    }
    catch (error) {
        return rejectWithValue(error.message)
    }
})

export const getBookmarks = createAsyncThunk(
    '/getBookmarks',
    async (_, { rejectWithValue }) => {
        const id = getCookie('id');
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const bookmarks = createSlice({
    name: 'bookmarks',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBookmarks.fulfilled, (state, action) => {
                console.log("Added:", action.payload);
                state.loading = false;
            })
            .addCase(addBookmarks.rejected, (state, action) => {
                //console.error("Add Failed: bookmark", action.payload);
                state.loading = false;
            })
            .addCase(getBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookmarks.fulfilled, (state, action) => {
                //console.log("Added bookmark get", action.payload);
                state.loading = false;
                state.bookmarks = action.payload.data;
            })
            .addCase(getBookmarks.rejected, (state, action) => {
                //console.error("Add Failed bookmark get", action.payload);
                state.loading = false;
            })
            .addCase(removeBookmarks.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeBookmarks.fulfilled, (state, action) => {
                //console.log("Removed", action.payload);
                state.loading = false;
                if (action.payload === 'all') {
                    state.bookmarks = [];
                } else {
                    state.bookmarks = state.bookmarks.filter(
                        (bookmark) => bookmark.url !== action.payload
                    );
                }
            })
            .addCase(removeBookmarks.rejected, (state, action) => {
                //console.error("Remove Failed bookmark", action.payload);
                state.loading = false;
            })

    },
});

export default bookmarks.reducer;
