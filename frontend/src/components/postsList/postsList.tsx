import "./postsList.sass"
import AddPostForm from "./addPostForm/addPostForm";
import Post from "./post/post";
import {useAuth} from "../../hooks/users/useAuth";
import {useDynamicPagination} from "../../hooks/other/useDynamicPagination";
import {api} from "modules/api.ts";

const PostsList = ({user_id, showPostForm, query, fetching}) => {

	const {is_authenticated, user} = useAuth()

	const fetchPosts = async (page, pageSize) => {

		const offset = page * pageSize
		
		const params = {
			offset: offset,
			limit: pageSize,
			query: query
		}
		
		if (showPostForm) {
			params["user"] = user_id
		}

		const {data} = await api(`moments/`, {
			params: params
		})

		return data
	}

	const {
		data,
		setData
	} = useDynamicPagination([user_id, query], fetchPosts)

	const posts = data.map((post) =>
		<Post post={post} commentOpenDefault={true} key={post.id} />
	)

	return (
		<div className="posts-list-wrapper">

			{showPostForm && is_authenticated && user_id == user?.id && <AddPostForm data={data} setData={setData}/> }

			{/*{!fetching && data.length == 0 && <span className="not-found-label">Ничего не найдено ;(</span>}*/}

			{posts}

		</div>
	)
}

export default PostsList;