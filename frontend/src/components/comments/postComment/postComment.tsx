import "./postComment.sass"
import {Link} from "react-router-dom";
import {Comment} from "../../../utils/types";
import moment from "moment";
import {ru} from "../../../utils/momentLocalization";
import CommentLikeButton from "../../commentLikeButton/commentLikeButton";

const PostComment = ({comment}:{comment:Comment}) => {
	return (
		<div className="comment-wrapper">

			<Link to="/profile/1">
				<img src={comment.author.photo} alt=""/>
			</Link>

			<div className="comment-details">
				<div className="comment-details-left">

					<Link to={`/profile/${comment.author.id}`} style={{textDecoration:"none"}}>
						<span className="username">{comment.author.username}</span>
					</Link>

					<p>{comment.content}</p>

				</div>

				<div className="comment-details-right">
					<span className="date">{moment(comment.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
					<CommentLikeButton comment={comment}/>
				</div>
			</div>

		</div>
	)
}

export default PostComment;