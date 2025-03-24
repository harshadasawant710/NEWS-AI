import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users: [],
    status: null, 
    error: null,
};

export const fetchUsers = createAsyncThunk('/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/users`);
        console.log(response.data)
        return response.data; // Ensure this matches backend response format
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

export const deleteUsers = createAsyncThunk('/deleteUsers', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/auth/users/${id}`);
        console.log(response.data)
        return response.data; // Ensure this matches backend response format
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.status = "loading"; 
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; 
                state.status = "success"; 
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.status = "failed"; 
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
