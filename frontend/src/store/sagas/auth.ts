import {createAction, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {I_User, T_UserLoginCredentials, T_UserRegisterCredentials} from "src/utils/types.ts";
import {api} from "modules/api.ts";
import {put, takeEvery, call } from "redux-saga/effects";
import {errorMessage, successMessage} from "src/utils/toasts.ts";
import {cleanUser, updateAuthenticated, updateUser} from "store/users/authSlice.ts";

type T_UserGreetingsMessage = {
    cb?: (succsess: boolean) => {}
}

export const checkUser = createAction<T_UserGreetingsMessage>("auth/checkUser")
export const loginUser = createAction<T_UserLoginCredentials>("auth/loginUser")
export const registerUser = createAction<T_UserRegisterCredentials>("auth/registerUser")
export const logoutUser = createAction("auth/logoutUser")

export function* checkUserSaga(action: ReturnType<typeof checkUser>) {
    console.log("checkUserSaga")
    console.log(action.payload)
    try {
        const response:AxiosResponse<I_User> = yield api.post("users/check/");
        console.log(response)
        if (response.status == 200) {
            yield put(updateUser(response.data));
            yield put(updateAuthenticated(true));
            action.payload.cb?.(true)
        }
    } catch {
        console.log("error")
        yield put(cleanUser());
        action.payload.cb?.(false)
    }
}

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

export function* registerUserSaga(action:PayloadAction<T_UserRegisterCredentials>) {
    console.log("registerUserSaga")
    try {
        const response:AxiosResponse<I_User> = yield api.post(`users/register/`, action.payload) as Promise<AxiosResponse<I_User>>;
        console.log(response)
        if (response.status == 201) {
            yield put(checkUser({cb: (sucsess: boolean) => {
                    sucsess && successMessage(`Добро пожаловать, ${response.data.firstName} ${response.data.lastName}!`);
                }}))
        }
    } catch {
        errorMessage("Пользователь с такой почтой уже существует!")
    }
}

export function* logoutUserSaga() {
    console.log("logoutUserSaga")
    const response:AxiosResponse = yield api.post(`users/logout/`) as Promise<AxiosResponse>;
    if (response.status == 200) {
        yield put(cleanUser());
    }
}



export function* authWatcherSaga() {
    yield takeEvery(checkUser.type, checkUserSaga);
    yield takeEvery(loginUser.type, loginUserSaga);
    yield takeEvery(registerUser.type, registerUserSaga);
    yield takeEvery(logoutUser.type, logoutUserSaga);
}
