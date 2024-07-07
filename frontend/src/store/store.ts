import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import authReducer from "./users/authSlice"
import subscribersReducer from "./users/subscribersSlice"
import addPostFormReducer from "./posts/addPostFormSlice"
import postReducer from "./posts/postSlice"
import rootSaga from "store/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        addPostForm: addPostFormReducer,
        subscribers: subscribersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>