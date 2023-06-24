import { createSlice } from "@reduxjs/toolkit";
import { addToLocal, getLocal } from "./localStorage";


// state.userinfo.push is used for adding data to current state

//to add data to state use useDispatch in ReactCrudFormik.js file on submit button

// state.userinfo.splice is used for removing data from current state

// to remove data from state use useDispatch in Contact.js file on delete button

// to view the data in state use useSelector in Home.js file

// addToLocal(state.userInfo) is used for adding data to local storage

// getLocal() is used for getting data from local storage'

// Json functions are created and exported from file localStorage.js


const initialState = {
  userInfo: getLocal() || [],
  isOpen: false,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = [...state.userInfo, action.payload];
      addToLocal(state.userInfo);
    },
    removeUser: (state, action) => {
      state.userInfo = state.userInfo.filter((user, index) => index !== action.payload);
      state.isOpen = false;
      addToLocal(state.userInfo);
    },

    editUser: (state, action) => {
      state.userInfo = state.userInfo.map((user) => {
        return user.id === action.payload.id ? action.payload : user;
      }
      );
      addToLocal(state.userInfo);
    },
    toggleModal: (state, action) => {
      state.isOpen = !state.isOpen;
    }
  }
});



export const { addUser, removeUser, editUser, toggleModal } = userSlice.actions;
export default userSlice.reducer;

// state means what is being shown
//  post = change where
//  push = method

