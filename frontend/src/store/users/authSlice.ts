import {createSlice} from "@reduxjs/toolkit"
import {I_User} from "src/utils/types.ts";

type T_initialState = {
    user: I_User | null
    is_authenticated: boolean
}

const initialState:T_initialState = {
	user: null,
	is_authenticated: false
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