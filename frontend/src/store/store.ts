import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects'

import authReducer, {
    CHECK_USER,
    checkUserSaga, checkWatcherSaga,
    LOGIN_USER,
    loginUserSaga, loginWatcherSaga, LOGOUT_USER, logoutUserSaga, logoutWatcherSaga,
    REGISTER_USER,
    registerUserSaga, registerWatcherSaga
} from "./users/authSlice"
import subscribersReducer from "./users/subscribersSlice"
import addPostFormReducer from "./posts/addPostFormSlice"
import postReducer from "./posts/postSlice"

const sagaMiddleware = createSagaMiddleware();

// function* sagas() {
//     yield all([
//         checkWatcherSaga(),
//         loginWatcherSaga(),
//         registerWatcherSaga(),
//         logoutWatcherSaga()
//     ]);
// }

function* sagas() {
    yield takeEvery(CHECK_USER, checkUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        addPostForm: addPostFormReducer,
        subscribers: subscribersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>