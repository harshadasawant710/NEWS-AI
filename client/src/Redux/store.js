import reducer from './slice/authSlice'
import authreduce from './slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import loadingReduces from './slice/Loading'
import newsReducer from './slice/newsSlice'
import readingHistoryReducer from './slice/readingHistroy'; // ✅ Fixed the import name
import bookmarksReducer from './slice/BookMarkSlice'; // ✅ Correct import
import summariesReducer from './slice/summarySlice'

const store = configureStore({
    reducer: {
        loading: loadingReduces,
        auth: authreduce,
        news: newsReducer,
        readingHistory: readingHistoryReducer,
        bookmarks: bookmarksReducer,
        summaries: summariesReducer

    }
})

export default store;