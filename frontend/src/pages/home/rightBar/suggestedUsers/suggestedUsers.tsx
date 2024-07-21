import "./suggestedUsers.sass"
import SuggestedUser from "./suggestedUser/suggestedUser";
import {useEffect} from "react";
import {useAuth} from "hooks/users/useAuth.ts";
import {useSuggestions} from "hooks/users/useSuggestions.ts";

const SuggestedUsers = () => {

	const {user_id} = useAuth()

    const {suggestedUsers, fetchSuggestedUsers} = useSuggestions()

	useEffect(() => {
		fetchSuggestedUsers(user_id as string)
	}, [])

	return (
		<div className="suggested-users-wrapper">

			<div className="top">
				<span className="suggestions-label">Рекомендации</span>
			</div>

			<div className="bottom">

				{suggestedUsers.length > 0 ?
                    suggestedUsers.map(suggestedUser =>
                        <SuggestedUser user={suggestedUser} key={suggestedUser.id}/>
                    )
                    :
                    <span className="empty-label">Пусто ;(</span>
                }

			</div>

		</div>
	)
}

export default SuggestedUsers;