import "./fullPost.sass"
import {api} from "../../../utils/api";
import {useEffect} from "react";
import {usePost} from "../../../hooks/posts/usePost";
import {ru} from "../../../utils/momentLocalization";
import TagList from "../../../components/postsList/post/tagList/tagList";
import FullPostComments from "../../../components/comments/fullPostComments/fullPostComments";
import {FaRegComment} from "react-icons/fa6";
import moment from "moment";
import {DOMEN} from "../../../utils/consts";
import {useToken} from "../../../hooks/users/useToken";
import PostLikeButton from "../../../components/postLikeButton/postLikeButton";

const FullPost = ({post_id}) => {

    const {access_token} = useToken()

    const {post, comments, likes, liked, setPost, setLikes, setLiked} = usePost()

    const fetchPost = async () => {
        const {data} = await api.get(`moments/${post_id}`, {
            headers: {
                'authorization': access_token
            }
        })

        setPost(data)
        setLikes(data.likes)
        setLiked(data.liked)
    }

    useEffect(() => {
        fetchPost()
    }, [])


    if (post == undefined) {
        return (
            <div>

            </div>
        )
    }

    const image = `${DOMEN}/${post.image}`

    const author = `${DOMEN}/${post.author.photo}`

    return (
        <div className="post-wrapper">

            <div className="top-container">

                <div className="avatar-container">
                    <img src={author} alt=""/>
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

                <img src={image} alt=""/>

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

export default FullPost