import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {I_Moment, I_User} from "utils/types.ts";
import {AxiosResponse} from "axios";
import {api} from "modules/api.ts";
import {put, takeEvery} from "redux-saga/effects";
import {updatePost} from "store/posts/postSlice.ts";

export const FETCH_POST = "posts/fetchPosts"
export const fetchPost = createAction<string>(FETCH_POST)

export function* fetchPostSaga(action:PayloadAction<string>) {
    console.log("fetchPostSaga")
    try {
        const response:AxiosResponse<I_User> = yield api.get(`moments/${action.payload}/`) as Promise<AxiosResponse<I_Moment>>;
        console.log(response)
        if (response.status == 200) {
            yield put(updatePost(response.data));
        }
    } catch {

    }
}



export function* postWatcherSaga() {
    yield takeEvery(FETCH_POST, fetchPostSaga);
}
