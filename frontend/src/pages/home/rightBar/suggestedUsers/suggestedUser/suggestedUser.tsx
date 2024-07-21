import "./suggestedUser.sass"
import UserInfo from "../../userInfo/userInfo";
import {useState} from "react";
import {api} from "modules/api.ts";
import {I_User} from "utils/types.ts";
import {successMessage} from "utils/toasts.ts";

const SuggestedUser = ({user}:{user:I_User}) => {

	const [subscribed, setSubscribed] = useState<boolean>()

	const handleClick = async () => {
		const response = await api.post(`users/${user.id}/subscribe/`)

		if (response.status == 201) {
			setSubscribed(true)
            successMessage(`Вы подписались на пользователя ${user.username}`)
		} else if (response.status == 200) {
			setSubscribed(false)
            successMessage(`Вы отписались от пользователя ${user.username}`)
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