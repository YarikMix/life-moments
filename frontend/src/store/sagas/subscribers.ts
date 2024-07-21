import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {I_Moment, I_User} from "utils/types.ts";
import {api} from "modules/api.ts";
import {put, takeEvery} from "redux-saga/effects";
import {updateSubscribers} from "store/users/subscribersSlice.ts";

export const FETCH_SUBSCRIBERS = "posts/fetchPosts"
export const fetchSubscribers = createAction<string>(FETCH_SUBSCRIBERS)

export function* fetchSubscribersSaga(action:PayloadAction<string>) {
    console.log("fetchSubscribers")
    try {
        const response:AxiosResponse<I_User> = yield api.get(`users/${action.payload}/subscribers/`, {
            params: {
                limit: 6
            }
        }) as Promise<AxiosResponse<I_Moment>>

        console.log(response)
        if (response.status == 200) {
            yield put(updateSubscribers(response.data.data));
        }
    } catch {

    }
}

export function* subscribersWatcherSaga() {
    yield takeEvery(FETCH_SUBSCRIBERS, fetchSubscribersSaga);
}
