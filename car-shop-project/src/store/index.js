import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import agreeReducer from './slices/agreeFormSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        agree: agreeReducer,
    }
})