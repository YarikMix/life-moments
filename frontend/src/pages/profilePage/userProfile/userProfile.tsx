import "./userProfile.sass"
import {useEffect, useState} from "react";
import moment from "moment";
import {ru} from "../../../utils/momentLocalization";
import CustomButton from "../../../components/customButton/CustomButton";
import {useSubscribers} from "../../../hooks/users/useSubscribers";
import {api} from "modules/api.ts";
import {I_User} from "utils/types.ts";

const UserProfile = ({user_id}:{user_id:string}) => {
	
	const [subscribed, setSubscribed] = useState<boolean>()

	const [user, setUser] = useState<I_User>()

	const {subscribers, fetchUserSubscribers} = useSubscribers()

	const fetchUser = async () => {
		const {data} = await api.get(`users/${user_id}/`)

		setUser(data)
		setSubscribed(data.subscribed)
	}

	useEffect(() => {
		fetchUser()
	}, [user_id])

	if (!user || !subscribers) {
		return (
			<div>

			</div>
		)
	}
	
	const handleSubscribeButtonClick = async () => {
		const response = await api.post(`users/${user.id}/subscribe/`)

		if (response.status == 201) {
			setSubscribed(true)
			fetchUserSubscribers(user_id)
		} else if (response.status == 200) {
			setSubscribed(false)
			fetchUserSubscribers(user_id)
		}
	}

	return (
		<div className="user-profile-wrapper">

			<img className="user-avatar" src={user.photo} alt=""/>

			<div className="user-info-container">
				<span>Никнейм: {user.firstName} {user.lastName}</span>
				<span>Почта: {user.email}</span>
				<span>Дата регистрации: {moment(user.date_register).locale(ru()).format("D MMMM")}</span>
				<span>Рейтинг: {user.rating}</span>
				<span>Подписчиков: {subscribers.length}</span>
			</div>

			<div className="edit-button-container">
				<CustomButton onClick={handleSubscribeButtonClick}>
                    { subscribed ? "Отписаться" : "Подписаться" }
                </CustomButton>
			</div>

		</div>
	)
}

export default UserProfile;