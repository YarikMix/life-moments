import {all} from "redux-saga/effects";
import {
    authWatcherSaga
} from "../sagas/auth.ts";
import {postWatcherSaga} from "store/sagas/post.ts";

export default function* rootSaga() {
    yield all([
        authWatcherSaga(),
        postWatcherSaga()
    ])
}