import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    opened: false,
    loading: false,
    summaries : '',
    error: null
}

export const generateSummary = createAsyncThunk(
    '/generateSummary' , async(article, {rejectWithValue}) =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/summarize`, {
                url: article.url
            }
            );
            return res.data
        }
        catch (error) {
            return rejectWithValue(error.res.data)
        }
    }
    
)

    


const summarySlice = createSlice({
    name: 'summary',
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(generateSummary.pending, (state)=>{
            state.opened=true;
            state.loading=true;

        }).addCase(generateSummary.fulfilled, (state, action)=>{
            state.summary= action.payload.summary
        }).addCase(generateSummary.rejected, (state, action)=>{
            console.log(action.payload)
        })
    }

})

export default summarySlice.reducer