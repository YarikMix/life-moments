import "./addCommentForm.sass"
import CustomTextarea from "../../customTextarea/customTextarea";
import {useState} from "react";
import {usePost} from "../../../hooks/posts/usePost";
import {useAuth} from "../../../hooks/users/useAuth";
import CustomButton from "../../customButton/CustomButton";
import {api} from "modules/api.ts";

const AddCommentForm = () => {

	const {avatar} = useAuth()

	const {post, comments, setComments} = usePost()

	const [content, setContent] = useState("")

	const addComment = async (e) => {
		e.preventDefault()

		const form_data = new FormData()

		form_data.append('content', content)

		const response = await api.post(`moments/${post.id}/add_comment/`, form_data)

		if (response.status == 200) {
			setContent("")
			setComments([response.data, ...comments])
		}
	}

	return (
		<form className="add-comment-form" onSubmit={addComment}>
			<img src={avatar} alt=""/>
			<CustomTextarea
				value={content}
				onInput={setContent}
				placeholder="Оставить комментарий"
				required={true}
			/>
			<CustomButton>Отправить</CustomButton>
		</form>
	)
}

export default AddCommentForm;