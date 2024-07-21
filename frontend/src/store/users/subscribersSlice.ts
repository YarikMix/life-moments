import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {I_User} from "utils/types.ts";

const initialState:T_initialState = {
    isOpen: false,
    subscribers: [],
}

type T_initialState = {
    isOpen: boolean,
    subscribers: I_User[]
}

const subscribersSlice = createSlice({
    name: 'subscribers',
    initialState: initialState,
    reducers: {
        updateIsOpen: (state, action:PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
        updateSubscribers: (state, action:PayloadAction<I_User[]>) => {
            state.subscribers = action.payload
        }
    }
})

export const { updateSubscribers, updateIsOpen } = subscribersSlice.actions

export default subscribersSlice.reducer