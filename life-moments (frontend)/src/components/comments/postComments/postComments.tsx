import "./postComments.sass"
import PostComment from "../postComment/postComment";
import {useEffect, useState} from "react";
import {Comment} from "../../../utils/types";
import {api} from "../../../utils/api";
import {useToken} from "../../../hooks/users/useToken";

const PostComments = ({post}) => {

	const {access_token} = useToken()

	const [comments, setComments] = useState<Comment[]>([])

	const fetchComments = async () => {
		const {data} = await api.get(`moments/${post.id}/comments/`, {
			headers: {
				'authorization': access_token
			},
			params: {
				limit: 2
			}
		})

		setComments(data)
	}

	useEffect(() => {
		fetchComments()
	}, [])

	const items = comments.map(comment =>
		<PostComment comment={comment} key={comment.id}/>
	)

	return (
		<div className={"comments-wrapper open"}>

			{items}

		</div>
	)
}

export default PostComments;