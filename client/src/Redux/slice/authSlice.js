import { setCookie, removeCookie, getCookie } from '../../utils/utils/';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
//import { data } from 'react-router-dom';
import { toast } from 'sonner'
import { auth, googleAuthProvider } from '../../config/firebase.js'
import { signInWithPopup } from 'firebase/auth';



const initialState = {
    loading: false,
    authenticated: getCookie('isAuthenticated') || false,
    name: getCookie('name') || null,
    id: getCookie('id') || null,
    preferences: JSON.parse(localStorage.getItem('preferences')) || [],
}

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        //console.log("sending data", data)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error);
        // return rejectWithValue(error.response?.data);    
    }
});

export const LoginUser = createAsyncThunk('auth/Login', async (data, { rejectWithValue }) => {
    try {
        //console.log("sending data", data)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/Login`, data, { withCredentials: true });
        const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, { withCredentials: true })
        return { ...res.data, ...verifyres.data };
    } catch (error) {
        return rejectWithValue(error);
        // return rejectWithValue(error.response?.data);    
    }
});

export const signInWithGoogle = createAsyncThunk('/google-login', async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const idToken = await result.user.getIdToken();
        // console.log(result.user.getIdToken())
        // console.log(idToken)

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, { idToken },{ withCredentials: true })
        const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, { withCredentials: true })
        return { ...res.data, ...verifyres.data };
        //return response.data
    }
    catch (error) {

    }


})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: function (state) {
            state.authenticated = false;
            state.id = null;
            state.name = null;
            state.email = null;
            removeCookie('isAuthenticated')
            removeCookie('name')
            removeCookie('id')
            removeCookie('email')
        }
    },
    extraReducers: (builder) => {

        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload.message)
            toast.success(action.payload.message)
        }).addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            console.log(action.payload.message)
            toast.error(action.payload.response.data.message)
        }).addCase(LoginUser.pending, (state) => {
            state.loading = true
        }).addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.authenticated = action.payload.authenticated
            state.name = action.payload.name
            state.id = action.payload.id
            setCookie('isAuthenticated', action.payload.authenticated)
            setCookie('email', action.payload.email)
            setCookie('name', action.payload.name)
            setCookie('id', action.payload.id)
            state.preferences = action.payload.preferences
            localStorage.setItem('preferences', JSON.stringify(action.payload.preferences))
            console.log(action.payload)
            toast.success(action.payload.message)
        }).addCase(LoginUser.rejected, (state, action) => {
            state.loading = false
            console.log(action.payload.response.data.message)
            toast.error(action.payload.response.data.message)
        }).addCase(signInWithGoogle.pending, (state, action) => {
            state.loading = true
        }).addCase(signInWithGoogle.fulfilled, (state,action) =>{
            state.loading = false
            state.authenticated = action.payload.authenticated;
            state.name = action.payload.name
            state.id = action.payload.id
            setCookie('isAuthenticated', action.payload.authenticated)
            setCookie('email', action.payload.email)
            setCookie('name', action.payload.name)
            setCookie('id', action.payload.id)
            state.preferences = action.payload.preferences
            localStorage.setItem('preferences', JSON.stringify(action.payload.preferences))
            console.log(action.payload)
            toast.success(action.payload.message)
        }).addCase(signInWithGoogle.rejected, (state, action) => {
            state.loading = false
            console.log(action.payload.response.data.message)
            toast.error(action.payload.response.data.message)
        })

    }
})

export default authSlice.reducer
export const { signOut } = authSlice.actions