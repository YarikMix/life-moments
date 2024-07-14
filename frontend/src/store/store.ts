import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import authReducer from "./users/authSlice"
import subscribersReducer from "./users/subscribersSlice"
import addPostFormReducer from "./posts/addPostFormSlice"
import postReducer from "./posts/postSlice"
import rootSaga from "store/sagas";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'auth',
    storage
}

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    post: postReducer,
    addPostForm: addPostFormReducer,
    subscribers: subscribersReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: false,
        serializableCheck: false
    }).concat(sagaMiddleware)
});

export const persister = persistStore(store)

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>