import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    post: undefined,
    title: "",
    content: "",
    likes: -1,
    liked: false,
    tags: [],
    comments: []
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        updatePost: (state, action) => {
            state.post = action.payload
            state.likes = action.payload.likes
            state.liked = action.payload.liked
        },
        updateTitle: (state, action) => {
            state.title = action.payload
        },
        updateContent: (state, action) => {
            state.content = action.payload
        },
        updateLikes: (state, action) => {
            state.likes = action.payload
        },
        updateLiked: (state, action) => {
            state.liked = action.payload
        },
        updateTags: (state, action) => {
            state.tags = action.payload
        },
        updateComments: (state, action) => {
            state.comments = action.payload
        }
    }
})

export const { updatePost, updateTitle, updateContent, updateLikes, updateLiked, updateTags, updateComments } = postSlice.actions

export default postSlice.reducer