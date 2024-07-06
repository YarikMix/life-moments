import "./subscriber.sass"
import {Link} from "react-router-dom";
import {User} from "../../../../utils/types";

const Subscriber = ({user}:{user:User}) => {

	return (
		<Link to={`/profile/${user.id}`} className="subscriber-wrapper">
			<img src={user.photo}  className="user-avatar" alt=""/>
			<span className="username">{user.username}</span>
		</Link>
	)
}

export default Subscriber;
