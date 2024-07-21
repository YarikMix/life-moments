import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {I_User} from "utils/types.ts";
import {api} from "modules/api.ts";
import {put, takeEvery} from "redux-saga/effects";
import {cleanUser, updateUser} from "store/users/authSlice.ts";
import {successMessage} from "utils/toasts.ts";

type T_UserUpdateProfileData = {
    userId: string
    firstName: string
    lastName: string
    email: string
    photo: File
}

export const UPDATE_PROFILE = "user/updateProfile"
export const updateProfile = createAction<T_UserUpdateProfileData>(UPDATE_PROFILE)

export function* updateUserSaga(action:PayloadAction<T_UserUpdateProfileData>) {
    console.log("checkUserSaga")
    console.log(action.payload)
    try {
        const form_data = new FormData()

        form_data.append('firstName', action.payload.firstName)
        form_data.append('lastName', action.payload.lastName)
        form_data.append('email', action.payload.email)

        if (action.payload.photo != undefined) {
            form_data.append('photo', action.payload.photo, action.payload.photo.name)
        }

        const response:AxiosResponse<I_User> = yield api.put(`users/${action.payload.userId}`, form_data);
        console.log(response)
        if (response.status == 200) {
            yield put(updateUser(response.data))
            successMessage("Настройки профиля успешно сохранены!")
        }
    } catch {
        console.log("error")
        yield put(cleanUser());
    }
}


export function* userWatcherSaga() {
    yield takeEvery(UPDATE_PROFILE, updateUserSaga);
}
