import "./subscribers.sass"
import Subscriber from "./subscriber/subscriber";
import {useEffect} from "react";
import SubscribersList from "./subscribersList/subscribersList";
import {useSubscribers} from "../../../hooks/users/useSubscribers";

const Subscribers = ({user_id}) => {

	const {subscribers, setIsOpen, fetchSubscribers} = useSubscribers()

	const showSubscribersList = () => {
		setIsOpen(true)
	}

	useEffect(() => {
		setIsOpen(false)
		fetchSubscribers(user_id)
	}, [user_id])

	if (subscribers == undefined) {
		return (
			<div>

			</div>
		)
	}

	const items = subscribers.map((subscriber) => (
		<Subscriber user={subscriber} key={subscriber.id}/>
	))

	return (
		<div className="subscribers-wrapper">

			<div className="top-container">
				<span>Подписчики</span>
				<span className="show-button" onClick={showSubscribersList}>Посмотреть всех</span>
			</div>

			<div className="bottom-container">
				{items}
			</div>

			<SubscribersList user_id={user_id} setIsOpen={setIsOpen} />

		</div>
	)
}

export default Subscribers;