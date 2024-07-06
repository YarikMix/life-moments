import "./fullPostComments.sass"
import PostComment from "../postComment/postComment";
import AddCommentForm from "../addCommentForm/addCommentForm";
import {usePost} from "../../../hooks/posts/usePost";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect} from "react";
import {api} from "modules/api.ts";

const FullPostComments = () => {

    const {is_authenticated} = useAuth()

    const {post, comments, setComments} = usePost()

    const fetchPostComments = async () => {
        const {data} = await api.get(`moments/${post.id}/comments/`)

        setComments(data)
    }

    useEffect(() => {
        fetchPostComments()
    }, [post])

    const items = comments.map(comment =>
        <PostComment comment={comment} key={comment.id}/>
    )

    return (
        <div className={"comments-wrapper open"}>

            {is_authenticated && <AddCommentForm /> }

            {items}

        </div>
    )
}

export default FullPostComments
