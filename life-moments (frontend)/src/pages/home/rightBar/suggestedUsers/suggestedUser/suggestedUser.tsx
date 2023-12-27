import "./suggestedUser.sass"
import UserInfo from "../../userInfo/userInfo";
import {api} from "../../../../../utils/api";
import {useToken} from "../../../../../hooks/users/useToken";
import {useState} from "react";

const SuggestedUser = ({user}) => {

	const {access_token} = useToken()

	const [subscribed, setSubscribed] = useState()

	const handleClick = async () => {
		const response = await api.post(`users/${user.id}/subscribe/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 201) {
			setSubscribed(true)
		} else if (response.status == 200) {
			setSubscribed(false)
		}
	}

	return (
		<div className="suggested-user-wrapper">

			<div className="left">
				<UserInfo user={user}/>
			</div>

			<div className="right">
				<span className="subscribe-link" onClick={handleClick}>
					{subscribed ? "Отписаться" : "Подписаться" }
				</span>
			</div>

		</div>
	)
}

export default SuggestedUser;