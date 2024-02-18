import "./postPage.sass"
import {useParams} from "react-router-dom"
import FullPost from "./fullPost/fullPost";
import {useEffect} from "react";

const PostPage = () => {

	const { id } = useParams<{id?: string}>();

	useEffect(() => {
		document.title = 'Страница момента'
	}, [])

	return (
		<div className="post-page-wrapper">
			<FullPost post_id={id} />
		</div>
	)
}

export default PostPage;