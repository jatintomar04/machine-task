import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "./profileService";


const singleUser = JSON.parse(localStorage.getItem("singleUser"))


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    allprofiles: [],
    singleProfile: singleUser || {} ,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },

  reducers: { 
    resetProfile: (state) => {
      state.allprofiles = [];
      state.singleProfile = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      localStorage.removeItem("singleUser"); 
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getprofile.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(getprofile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.singleProfile = action.payload;
      
    });

    builder.addCase(getprofile.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.singleProfile = action.payload;
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.singleProfile = action.payload; 
      
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.singleProfile = action.payload;
    });
    builder.addCase(getalluser.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(getalluser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.allprofiles = action.payload;
  
    });

    builder.addCase(getalluser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.allprofiles = action.payload;
    });
    builder.addCase(getuser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });
    
    builder.addCase(getuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.singleProfile = action.payload;
     
    });
    
    builder.addCase(getuser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
      
    builder.addCase(deleteuser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    
    builder.addCase(deleteuser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
   
  },
});

export default profileSlice.reducer;

// get single user
export const getprofile = createAsyncThunk("FETCH/PROFILE", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return await profileService.getUser(token);

  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// update user profile
export const updateProfile = createAsyncThunk(
  "UPDATE/PROFILE",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await profileService.updateUser(formData, token); 
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create async thunk for uploading profile image
export const uploadProfileImage = createAsyncThunk(
 
  async (formData, thunkAPI) => { 
    console.log(formData); 
    let token = thunkAPI.getState().auth.user.token;
   
    try {
      return await profileService.updatePic(formData, token);
   
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// get all user admin
export const getalluser = createAsyncThunk("FETCH/ALLPROFILE", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return await profileService.getalluserProfile(token);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});


// getsingleuser admin

export const getuser = createAsyncThunk("FETCH/GETSINGLEUSER", async (id, thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;
  try {
    return await profileService.getUserById(id, token);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});
 
//  delete user admin
export const deleteuser = createAsyncThunk("FETCH/DELETEUSER", async (id, thunkAPI) => {

  const token = thunkAPI.getState().auth.user.token;
  try {
    return await profileService.deleteUser(id, token);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});




export const { resetProfile } = profileSlice.actions;



