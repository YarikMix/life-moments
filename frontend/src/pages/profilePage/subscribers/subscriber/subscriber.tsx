import "./subscriber.sass"
import {Link} from "react-router-dom";
import {User} from "../../../../utils/types";

const Subscriber = ({user}:{user:User}) => {

	const avatar = `http://127.0.0.1:8000/${user.photo}`

	return (
		<Link to={`/profile/${user.id}`} className="subscriber-wrapper">
			<img src={avatar}  className="user-avatar" alt=""/>
			<span className="username">{user.username}</span>
		</Link>
	)
}

export default Subscriber;
