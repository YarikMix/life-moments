import "./userInfo.sass"
import {Link} from "react-router-dom";
import {DOMEN} from "../../../../utils/consts";

const UserInfo = ({user}) => {

	const avatar = `${DOMEN}/${user.photo}`

	return (
		<Link to={`/profile/${user.id}`} className="user-info-wrapper">

			<img src={avatar} className="user-avatar" alt=""/>

			<div className="user-details">
				<span className="login">{user.username}</span>
				<span className="username">Подписчиков: {user.subscribers_count}</span>
			</div>

		</Link>
	)
}

export default UserInfo;