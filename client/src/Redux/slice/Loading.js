import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState ={
    loading:false
}

const loadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        setLoading:function(state){
            state.loading=true;
        }
    }
})

export default loadingSlice.reducer
export const {setLoading}= loadingSlice.actions