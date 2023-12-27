import "./userProfile.sass"
import {useEffect, useState} from "react";
import moment from "moment";
import {ru} from "../../../utils/momentLocalization";
import {User} from "../../../utils/types";
import CustomButton from "../../../components/customButton/CustomButton";
import {DOMEN} from "../../../utils/consts";
import {api} from "../../../utils/api";
import {useToken} from "../../../hooks/users/useToken";
import {useSubscribers} from "../../../hooks/users/useSubscribers";

const UserProfile = ({user_id}) => {

	const {access_token} = useToken()
	
	const [subscribed, setSubscribed] = useState()

	const [user, setUser] = useState<User>()

	const {fetchSubscribers} = useSubscribers()

	const fetchUser = async () => {
		const {data} = await api.get(`users/${user_id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		setUser(data)
		setSubscribed(data.subscribed)
	}

	useEffect(() => {
		fetchUser()
	}, [user_id])

	if (user == undefined) {
		return (
			<div>

			</div>
		)
	}
	
	const handleSubscribeButtonClick = async () => {
		const response = await api.post(`users/${user.id}/subscribe/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 201) {
			setSubscribed(true)
			await fetchSubscribers(user_id)
		} else if (response.status == 200) {
			setSubscribed(false)
			await fetchSubscribers(user_id)
		}
	}

	const avatar = `${DOMEN}/${user.photo}`

	return (
		<div className="user-profile-wrapper">

			<img className="user-avatar" src={avatar} alt=""/>

			<div className="user-info-container">
				<span>Никнейм: {user.username}</span>
				<span>Почта: {user.email}</span>
				<span>Дата регистрации: {moment(user.date_register).locale(ru()).format("D MMMM")}</span>
				<span>Рейтинг: {user.rating}</span>
				<span>Подписчиков: {user.subscribers_count}</span>
			</div>

			<div className="edit-button-container">
				<CustomButton onClick={handleSubscribeButtonClick}>{ subscribed ? "Отписаться" : "Подписаться" }</CustomButton>
			</div>

		</div>
	)
}

export default UserProfile;