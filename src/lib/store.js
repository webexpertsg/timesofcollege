import { configureStore } from '@reduxjs/toolkit'

import manageModelReducer from '@/app/redux/manageModelSlice'

export const store = configureStore({
    reducer: {
        manageModel: manageModelReducer,
    },
})