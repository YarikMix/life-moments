import "./postPage.sass"
import {useParams} from "react-router-dom"
import {useEffect} from "react";
import {usePost} from "src/hooks/posts/usePost.ts";
import moment from "moment/moment";
import {ru} from "utils/momentLocalization.ts";
import TagList from "components/postsList/post/tagList/tagList.tsx";
import PostLikeButton from "components/postLikeButton/postLikeButton.tsx";
import {FaRegComment} from "react-icons/fa6";
import FullPostComments from "components/comments/fullPostComments/fullPostComments.tsx";
import {useDispatch} from "react-redux";
import {fetchPost} from "store/sagas/post.ts";

const PostPage = () => {

	const { id } = useParams<{id: string}>();

    const dispatch = useDispatch()

    const {post, comments, likes, liked, setLikes, setLiked} = usePost()

    useEffect(() => {
        dispatch(fetchPost( id as string))
    }, [])

    if (post == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="post-wrapper">

            <div className="top-container">

                <div className="avatar-container">
                    <img src={post.author.photo} alt=""/>
                </div>

                <div className="user-info-container">
                    <span className="username">{post.author.username}</span>
                    <span className="geo">{moment(post.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                </div>

            </div>

            <div className="text-container">

                <div className="post-content">
                    <p>{post.content}</p>
                </div>

                <TagList tags={post.tags}/>

            </div>

            <div className="image-container">

                <img src={post.image} alt=""/>

            </div>

            <div className="bottom-container">

                <div className="icons-container">

                    <div className="left-icons">

                        <PostLikeButton post={post} likes={likes} liked={liked} setLikes={setLikes} setLiked={setLiked} />

                        <div className="icon-container">
                            <FaRegComment className="icon" />
                            <span className="comments-count">{comments.length}</span>
                        </div>

                    </div>

                </div>
            </div>

            <FullPostComments />

        </div>
    )
}

export default PostPage;