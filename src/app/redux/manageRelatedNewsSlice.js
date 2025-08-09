import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Define the async thunk for fetching user data
export const fetchRelatedNewsData = createAsyncThunk('fetchRelatedNewsData', async (courses) => {
    const response = await fetch(`/api/relatednews/${courses}`);
    const jsonData = await response.json();    
    return jsonData;
  });


export const manageRelatedNewsSlice = createSlice({
    name: 'relatedNews',
    initialState: { data: null, loading: false, error: null },
    reducers: {
        openModel: (state) => {
            state.isOpen = true
        },
        closeModel: (state) => {
            state.isOpen = false
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchRelatedNewsData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchRelatedNewsData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchRelatedNewsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
        },
  })
  
  // Action creators are generated for each case reducer function
//   export const { openModel, closeModel } = manageRelatedNewsSlice.actions
  
  export default manageRelatedNewsSlice.reducer