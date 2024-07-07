import {all} from "redux-saga/effects";
import {
    authWatcherSaga
} from "../sagas/auth.ts";

export default function* rootSaga() {
    yield all([
        authWatcherSaga()
    ])
}