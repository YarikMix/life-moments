import {updateTitle, updateContent, updateLikes, updateLiked, updateTags, updateComments } from "store/posts/postSlice";
import {useDispatch, useSelector} from "react-redux";

export function usePost() {
    const {post, title, content, likes, liked, tags, comments} = useSelector(state => state.post)

    const dispatch = useDispatch()

    const setTitle = (value) => {
        dispatch(updateTitle(value))
    }

    const setContent = (value) => {
        dispatch(updateContent(value))
    }

    const setLikes = (value) => {
        dispatch(updateLikes(value))
    }

    const setLiked = (value) => {
        dispatch(updateLiked(value))
    }

    const setTags = (value) => {
        dispatch(updateTags(value))
    }

    const setComments = (value) => {
        dispatch(updateComments(value))
    }

    return {
        post,
        title,
        content,
        likes,
        liked,
        tags,
        comments,
        setTitle,
        setContent,
        setLikes,
        setLiked,
        setTags,
        setComments
    }
}