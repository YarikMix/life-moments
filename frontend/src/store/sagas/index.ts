import {all} from "redux-saga/effects";
import {
    authWatcherSaga
} from "../sagas/auth.ts";
import {postWatcherSaga} from "store/sagas/post.ts";
import {subscribersWatcherSaga} from "store/sagas/subscribers.ts";
import {userWatcherSaga} from "store/sagas/user.ts";

export default function* rootSaga() {
    yield all([
        authWatcherSaga(),
        postWatcherSaga(),
        subscribersWatcherSaga(),
        userWatcherSaga()
    ])
}