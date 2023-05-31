import { ReducerLogin,ReducerRegister,getFollower,getAllUserReducer,followUnfollow,currentUserReducer } from "../reducers/AuthReducer";
import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import localStorage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from "redux-persist";
import { postShareReducer,currentPost,CreatestoryReduces,getstoryReducer } from "../reducers/postShareReducer";
import thunk from "redux-thunk";



const persistConfig={
    key:"root",
    version:1,
    storage:storage

}

// const persistedState = loadState()
const rootreducer=combineReducers({
    ReducerLogin,
    ReducerRegister,
    postShareReducer,
    getFollower,
    getAllUserReducer,
    followUnfollow,
    currentUserReducer,
    currentPost,
    CreatestoryReduces,
    getstoryReducer
})

const persistedReducer=persistReducer(persistConfig,rootreducer)

const storages = localStorage.getItem("Auth");


const store=configureStore(
  
   {reducer:persistedReducer,
    middleware: [thunk]
}

)

export default store;