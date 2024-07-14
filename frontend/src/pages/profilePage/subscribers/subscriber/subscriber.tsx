import "./subscriber.sass"
import {Link} from "react-router-dom";
import {I_User} from "utils/types.ts";

const Subscriber = ({user}:{user:I_User}) => {

	return (
		<Link to={`/profile/${user.id}`} className="subscriber-wrapper">
			<img src={user.photo}  className="user-avatar" alt=""/>
			<span className="username">{user.username}</span>
		</Link>
	)
}

export default Subscriber;
