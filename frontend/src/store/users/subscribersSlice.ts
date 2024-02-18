import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    subscribers: undefined,
}


const subscribersSlice = createSlice({
    name: 'subscribers',
    initialState: initialState,
    reducers: {
        updateIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        updateSubscribers: (state, action) => {
            state.subscribers = action.payload
        }
    }
})

export const { updateSubscribers, updateIsOpen } = subscribersSlice.actions

export default subscribersSlice.reducer