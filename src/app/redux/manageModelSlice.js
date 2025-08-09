import { createSlice } from '@reduxjs/toolkit'

export const manageModelSlice = createSlice({
    name: 'manageModel',
    initialState: {
      isOpen: false,
    },
    reducers: {
      openModel: (state) => {
        state.isOpen = true
      },
      closeModel: (state) => {
        state.isOpen = false
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { openModel, closeModel } = manageModelSlice.actions
  
  export default manageModelSlice.reducer