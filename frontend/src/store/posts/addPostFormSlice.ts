import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: "",
    content: "",
    tags: []
}

const addPostFormSlice = createSlice({
    name: 'addPostForm',
    initialState: initialState,
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload
        },
        updateContent: (state, action) => {
            state.content = action.payload
        },
        updateTags: (state, action) => {
            state.tags = action.payload
        },
        resetPostForm: (state) => {
            console.log("resetPostForm")
            state.title = ""
            state.content = ""
            state.tags = []
        }
    }
})

export const { updateTitle, updateContent, updateTags, resetPostForm } = addPostFormSlice.actions

export default addPostFormSlice.reducer