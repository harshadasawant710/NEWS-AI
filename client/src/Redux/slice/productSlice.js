import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState ={
    product:[],
    loading:false,
    error:null
}

const fetchProduct = createAsyncThunk('/fetch_product', async()=>{
    
})