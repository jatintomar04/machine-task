import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


const userExit = JSON.parse(localStorage.getItem("user"))

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : userExit || null,
        isLoading: false,
        isSuccess : false,
        isError : false,
        message : ""
    },
    reducers : {},
    
    extraReducers : builder => {
        builder
        .addCase(registerUser.pending, (state, action)=> {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(registerUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload

        })

        .addCase(loginUser.pending, (state, action)=> {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(loginUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isError = false
        })
        .addCase(loginUser.rejected, (state, action)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload

        })
        .addCase(logoutUser.fulfilled, (state, action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = ""
            state.user = null

        })
    },

});


// register 
export const registerUser = createAsyncThunk('AUTH/REGISTER', async(formData, thunkAPI) => {
    try {
        return await authService.register(formData)
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }

});

//LOGIN
export const loginUser = createAsyncThunk('AUTH/LOGIN', async(formData, thunkAPI) => {

    try {
        return await authService.login(formData)
    
        
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }


});

// LOGOUT
export const logoutUser = createAsyncThunk('AUTH/LOGOUT', async(formData, thunkAPI) => {

    localStorage.removeItem("user")

});

export default authSlice.reducer;