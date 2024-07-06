import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {put, takeLatest} from 'redux-saga/effects'
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {I_User} from "src/utils/types.ts";
import {successMessage} from "src/utils/toasts.ts";

type T_initialState = {
    user: I_User | null
    is_authenticated: boolean
}

const initialState:T_initialState = {
	user: null,
	is_authenticated: false
}

export const CHECK_USER = "auth/checkUser"
export const checkUser = createAction(CHECK_USER)

export function* checkUserSaga() {
    const response:AxiosResponse<I_User> = yield api.post(`check/`) as Promise<AxiosResponse<I_User>>;
    console.log("easdf12")
    if (response.status == 200) {
        yield put(updateUser(response.data));
        yield put(updateAuthenticated(true));
    }
}

export function* checkWatcherSaga() {
    yield takeLatest(CHECK_USER, checkUserSaga);
}

export type T_UserLoginCredentials = {
    email: string
    password: string
}

export const LOGIN_USER = "auth/loginUser"
export const loginUser = createAction<T_UserLoginCredentials>(LOGIN_USER)

export function* loginUserSaga(action:PayloadAction<T_UserLoginCredentials>) {
    const response:AxiosResponse<I_User> = yield api.post(`login/`, action.payload) as Promise<AxiosResponse<I_User>>;
    if (response.status == 200) {
        yield put(updateUser(response.data));
        yield put(updateAuthenticated(true));
        successMessage(`Добро пожаловать, ${response.data["username"]}!`)
    }
}

export function* loginWatcherSaga() {
    yield takeLatest(LOGIN_USER, loginUserSaga);
}


export type T_UserRegisterCredentials = {
    username: string
    email: string
    password: string
}

export const REGISTER_USER = "auth/registerUser"
export const registerUser = createAction<T_UserRegisterCredentials>(REGISTER_USER)

export function* registerUserSaga(action:PayloadAction<T_UserRegisterCredentials>) {
    const response:AxiosResponse<I_User> = yield api.post(`register/`, action.payload) as Promise<AxiosResponse<I_User>>;
    if (response.status == 200) {
        yield put(updateUser(response.data));
        yield put(updateAuthenticated(true));
        successMessage(`Добро пожаловать, ${response.data["username"]}!`)
    }
}

export function* registerWatcherSaga() {
    yield takeLatest(REGISTER_USER, registerUserSaga);
}


export const LOGOUT_USER = "auth/logoutUser"
export const logoutUser = createAction(LOGOUT_USER)

export function* logoutUserSaga() {
    const response:AxiosResponse = yield api.post(`logout/`) as Promise<AxiosResponse>;
    if (response.status == 200) {
        yield put(cleanUser());
    }
}
export function* logoutWatcherSaga() {
    yield takeLatest(LOGOUT_USER, logoutUserSaga);
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		updateUser: (state, action) => {
			state.user = action.payload
		},
		updateAuthenticated: (state, action) => {
			state.is_authenticated = action.payload
		},
		cleanUser: (state) => {
			state.is_authenticated = false
			state.user = null
		}
	}
})

export const { updateUser, updateAuthenticated, cleanUser } = authSlice.actions

export default authSlice.reducer