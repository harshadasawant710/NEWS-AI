import { createSlice, createAsyncThunk, asyncThunkCreator } from "@reduxjs/toolkit";
import { setCookie, removeCookie, getCookie } from '../../utils/utils/';
import axios from "axios";

const initialState = {
    loading: false,
    data: null,
    error: null,
    news: [],
    totalPages: 0,
    totalCount: 0,
    totalItems: 0
}

//const id = getCookie('id');

export const setPrefrenece = createAsyncThunk('/prefereneces', async (data, { rejectWithValue }) => {
    try {
        const id = getCookie('id');  
        if (!id) throw new Error("User ID is missing!");
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/preferences/${id}`, data);
        return res.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "something went wrong")
    }
})

export const fetchAllNews = createAsyncThunk('/fetchallnews', async ({ currentPage, category = '', search }, { rejectWithValue }) => {
    console.log(search)
    try {
        // const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news?page=${currentPage}&category=${category}&keyword=${search}`)

        let apiUrl = `${import.meta.env.VITE_API_URL}/api/news?page=${currentPage}`;

        if (search) {
            apiUrl += `&keyword=${search}`;
        }
        if (category && !search) {
            apiUrl += `&category=${category}`;
        }

        //console.log("Fetching news from:", apiUrl);

        const response = await axios.get(apiUrl);
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "something went wrong")
    }

})

const newsSlice = createSlice({
    name: 'news',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(setPrefrenece.pending, (state) => {
            state.loading = true
        })
            .addCase(setPrefrenece.fulfilled, (state) => {
                state.loading = false

            })
            .addCase(setPrefrenece.rejected, (state) => {
                state.loading = false
            })
            .addCase(fetchAllNews.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllNews.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.totalPages = action.payload.totalPages,
                    state.news = action.payload.data,
                    state.totalItems = action.payload.length,
                    state.totalCount = action.payload.totalCount
            })
            .addCase(fetchAllNews.rejected, (state) => {
                state.loading = false
            })
    }
})

export default newsSlice.reducer

