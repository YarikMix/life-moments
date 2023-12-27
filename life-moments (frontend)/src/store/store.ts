import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./users/authSlice"
import subscribersReducer from "./users/subscribersSlice"
import addPostFormReducer from "./posts/addPostFormSlice"
import postReducer from "./posts/postSlice"

export default configureStore({
    reducer: {
        user: authReducer,
        post: postReducer,
        addPostForm: addPostFormReducer,
        subscribers: subscribersReducer
    }
});