import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {I_User, T_UserLoginCredentials, T_UserRegisterCredentials} from "src/utils/types.ts";
import {api} from "modules/api.ts";
import {put, takeEvery, call } from "redux-saga/effects";
import {errorMessage, successMessage} from "src/utils/toasts.ts";
import {cleanUser, updateAuthenticated, updateUser} from "store/users/authSlice.ts";

type T_UserGreetingsMessage = {
    greetingsMessage?: boolean
}

export const CHECK_USER = "auth/checkUser"
export const checkUser = createAction(CHECK_USER)

export function* checkUserSaga(action:PayloadAction<T_UserGreetingsMessage>) {
    console.log("checkUserSaga")
    console.log(action.payload)
    try {
        const response:AxiosResponse<I_User> = yield api.post("users/check/");
        console.log(response)
        if (response.status == 200) {
            yield put(updateUser(response.data));
            yield put(updateAuthenticated(true));
            action.payload?.greetingsMessage && successMessage(`Добро пожаловать, ${response.data.firstName} ${response.data.lastName}!`)
        }
    } catch {
        console.log("error")
        yield put(cleanUser());
    }
}



export const LOGIN_USER = "auth/loginUser"
export const loginUser = createAction<T_UserLoginCredentials>(LOGIN_USER)

export function* loginUserSaga(action:PayloadAction<T_UserLoginCredentials>) {
    console.log("loginUserSaga")
    try {
        const response:AxiosResponse<I_User> = yield api.post("users/login/", action.payload);
        if (response.status == 200) {
            yield put(updateUser(response.data));
            yield put(updateAuthenticated(true));
            successMessage(`Добро пожаловать, ${response.data.firstName} ${response.data.lastName}!`)
        }
    } catch {
        errorMessage("Неверный логин или пароль!")
    }
}


export const REGISTER_USER = "auth/registerUser"
export const registerUser = createAction<T_UserRegisterCredentials>(REGISTER_USER)

export function* registerUserSaga(action:PayloadAction<T_UserRegisterCredentials>) {
    console.log("registerUserSaga")
    try {
        const response:AxiosResponse<I_User> = yield api.post(`users/register/`, action.payload) as Promise<AxiosResponse<I_User>>;
        console.log(response)
        if (response.status == 201) {
            yield call(checkUserSaga, {greetingsMessage: true});
        }
    } catch {
        errorMessage("Пользователь с такой почтой уже существует!")
    }
}


export const LOGOUT_USER = "auth/logoutUser"
export const logoutUser = createAction(LOGOUT_USER)

export function* logoutUserSaga() {
    console.log("logoutUserSaga")
    const response:AxiosResponse = yield api.post(`users/logout/`) as Promise<AxiosResponse>;
    if (response.status == 200) {
        yield put(cleanUser());
    }
}



export function* authWatcherSaga() {
    yield takeEvery(CHECK_USER, checkUserSaga);
    yield takeEvery(LOGIN_USER, loginUserSaga);
    yield takeEvery(REGISTER_USER, registerUserSaga);
    yield takeEvery(LOGOUT_USER, logoutUserSaga);
}
