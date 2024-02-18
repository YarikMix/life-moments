import {updateTitle, updateContent, updateTags, resetPostForm } from "../../store/posts/addPostFormSlice";
import {useDispatch, useSelector} from "react-redux";

export function usePostForm() {
    const {title, content, tags} = useSelector(state => state.addPostForm)

    const dispatch = useDispatch()

    const setTitle = (value) => {
        dispatch(updateTitle(value))
    }

    const setContent = (value) => {
        dispatch(updateContent(value))
    }

    const setTags = (value) => {
        dispatch(updateTags(value))
    }

    const cleanForm = () => {
        dispatch(resetPostForm())
    }

    return {
        title,
        content,
        tags,
        setTitle,
        setContent,
        setTags,
        cleanForm
    }
}