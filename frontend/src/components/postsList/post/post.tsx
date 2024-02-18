import "./post.sass"
import avatar from "/src/assets/avatar.jpg"
import {FaRegComment} from "react-icons/fa6";
import PostLikeButton from "../../postLikeButton/postLikeButton";
import {Moment} from "../../../utils/types";
import moment from "moment";
import {ru} from "../../../utils/momentLocalization";
import TagList from "./tagList/tagList";
import {DOMEN} from "../../../utils/consts";
import {Link} from "react-router-dom";
import PostComments from "../../comments/postComments/postComments";
import {useState} from "react";

const Post = ({post}:{post:Moment}) => {

	const [likes, setLikes] = useState(post.likes)

	const [liked, setLiked] = useState(post.liked)

	const image = `${DOMEN}/${post.image}`

	const author = `${DOMEN}/${post.author.photo}`

	return (
		<div className="post-wrapper">

			<Link to={`/posts/${post.id}`}>
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

			</Link>

			<div className="bottom-container">

				<div className="icons-container">

					<div className="left-icons">

						<PostLikeButton post={post} likes={likes} liked={liked} setLikes={setLikes} setLiked={setLiked} />

						<Link to={`/posts/${post.id}`}>
							<div className="icon-container">
								<FaRegComment className="icon" />
								<span className="comments-count">{post.comments}</span>
							</div>
						</Link>

					</div>

				</div>

				<PostComments post={post} />

				{post.comments > 2 &&
					<Link to={`/posts/${post.id}`} className="show-full-post">
						Показать все комментарии
					</Link>
				}

			</div>

		</div>
	)
}

export default Post