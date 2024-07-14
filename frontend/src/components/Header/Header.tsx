import "./Header.sass"
import { FaInstagram } from "react-icons/fa6";
import {AiOutlineCompass, AiOutlineUser} from "react-icons/ai";
import {Link} from "react-router-dom";
import EventFeed from "./eventFeed/eventFeed";
import {useAuth} from "../../hooks/users/useAuth";

const Header = () => {

	const {is_authenticated, user} = useAuth()

	return (
		<div className="navbar-wrapper">

			<div className="navbar-container">

				<Link to="/" >
					<div className="left">

						<FaInstagram className="logo"/>
						<div className="separator"></div>
						<span className="title">Моменты жизни</span>

					</div>
				</Link>

				<div className="right">

					<Link to="/">
						<AiOutlineCompass className="menu-icon" />
					</Link>

					<EventFeed />

					<Link to={is_authenticated ? `/profile/${user?.id}` : "login/"}>
						<AiOutlineUser className="menu-icon" />
					</Link>

				</div>

			</div>


		</div>
	)
}

export default Header;