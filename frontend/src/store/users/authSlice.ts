import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	user: {},
	is_authenticated: false,
}

const authSlice = createSlice({
	name: 'user',
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
			state.user = {}
		}
	}
})

export const { updateUser, updateAuthenticated, cleanUser } = authSlice.actions

export default authSlice.reducer