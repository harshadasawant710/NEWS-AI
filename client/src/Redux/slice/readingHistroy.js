import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils";

const initialState = {
    loading: false,
    readingHistory: [],
    error: null,
};

export const addReadingHistory = createAsyncThunk(
    '/reading-history',
    async (data, { rejectWithValue }) => {
        const id = getCookie('id');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history`, data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getReadingHistory = createAsyncThunk(
    '/getreading-history',
    async (_, { rejectWithValue }) => {
        const id = getCookie('id');
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearReadingHistory = createAsyncThunk(
    '/deleteReadingHistory',
    async (articleId, { rejectWithValue }) => {
        const id = getCookie('id');
        try {
            const url = articleId
                ? `${import.meta.env.VITE_API_URL}/api/${id}/reading-history?articleId=${articleId}`
                : `${import.meta.env.VITE_API_URL}/api/${id}/reading-history`;

            await axios.delete(url);
            return articleId || 'all';
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const readingHistory = createSlice({
    name: 'readingHistory', 
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addReadingHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReadingHistory.fulfilled, (state, action) => {
                state.loading = false;
                //console.log("Added:", action.payload);
                state.readingHistory.push(action.payload); 
            })
            .addCase(addReadingHistory.rejected, (state, action) => {
                state.loading = false;
                //console.error("Add Failed:", action.payload);
                state.error = action.payload;
            })
            .addCase(getReadingHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReadingHistory.fulfilled, (state, action) => {
                state.loading = false;
                //console.log("Fetched:", action.payload);
                state.readingHistory = action.payload.data; 
            })
            .addCase(getReadingHistory.rejected, (state, action) => {
                state.loading = false;
                //console.error("Fetch Failed:", action.payload);
                state.error = action.payload;
            })
            .addCase(clearReadingHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearReadingHistory.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload === 'all') {
                    state.readingHistory = [];
                } else {
                    state.readingHistory = state.readingHistory.filter((item) => item.articleId !== action.payload);
                }
            })
            .addCase(clearReadingHistory.rejected, (state, action) => {
                state.loading = false;
                //console.error("Clear Failed:", action.payload);
                state.error = action.payload;
            })
            ;
    },
});

export default readingHistory.reducer;
