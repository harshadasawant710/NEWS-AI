import reducer from './slice/authSlice'
import authreduce from './slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import loadingReduces from './slice/Loading'
import newsReducer from './slice/newsSlice'
import readingHistoryReducer from './slice/readingHistroy'; 
import bookmarksReducer from './slice/BookMarkSlice'; 
import summariesReducer from './slice/summarySlice'
import userReducer from './slice/userSlice'

const store = configureStore({
    reducer: {
        loading: loadingReduces,
        auth: authreduce,
        news: newsReducer,
        readingHistory: readingHistoryReducer,
        bookmarks: bookmarksReducer,
        summaries: summariesReducer,
        users: userReducer,

    }
})

export default store;