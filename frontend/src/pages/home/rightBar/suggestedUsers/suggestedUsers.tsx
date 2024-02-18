import "./suggestedUsers.sass"
import SuggestedUser from "./suggestedUser/suggestedUser";
import {useAuth} from "../../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import {User} from "../../../../utils/types";
import {api} from "../../../../utils/api";
import {useToken} from "../../../../hooks/users/useToken";

const SuggestedUsers = () => {

	const {user} = useAuth()

	const {access_token} = useToken()

	const [suggestedUsers, setSuggestedUsers] = useState<User[]>([])

	const fetchSuggestedUsers = async () => {
		const {data} = await api.get(`users/${user.id}/suggested_users/`, {
			headers: {
				'authorization': access_token
			}
		})

		setSuggestedUsers(data)
	}

	useEffect(() => {
		fetchSuggestedUsers()
	}, [])

	const items = suggestedUsers.map(suggestedUser =>
		<SuggestedUser user={suggestedUser} key={suggestedUser.id}/>
	)

	return (
		<div className="suggested-users-wrapper">

			<div className="top">
				<span className="suggestions-label">Рекомендации</span>
			</div>

			<div className="bottom">

				{suggestedUsers.length > 0 ? items : <span className="empty-label">Пусто ;(</span>}

			</div>

		</div>
	)
}

export default SuggestedUsers;