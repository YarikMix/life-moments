import "./userInfo.sass"
import {Link} from "react-router-dom";

const UserInfo = ({user}) => {

	return (
		<Link to={`/profile/${user.id}`} className="user-info-wrapper">

			<img src={user.photo} className="user-avatar" alt=""/>

			<div className="user-details">
				<span className="login">{user.username}</span>
				<span className="username">Подписчиков: {user.subscribers_count}</span>
			</div>

		</Link>
	)
}

export default UserInfo;