import "./subscribers.sass"
import Subscriber from "./subscriber/subscriber";
import {useEffect} from "react";
import SubscribersList from "./subscribersList/subscribersList";
import {useSubscribers} from "../../../hooks/users/useSubscribers";
import {I_User} from "utils/types.ts";

const Subscribers = ({user_id}:{user_id:string}) => {

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

	return (
		<div className="subscribers-wrapper">

			<div className="top-container">
				<span>Подписчики</span>
				<span className="show-button" onClick={showSubscribersList}>Посмотреть всех</span>
			</div>

            {subscribers.length > 0 ?
                <div className="bottom-container">
                    {subscribers.map((subscriber:I_User) => (
                        <Subscriber user={subscriber} key={subscriber.id}/>
                    ))}
                </div>
                :
                <span className="subscribers-not-found-label">У вас нет подписчиков</span>
            }

            <SubscribersList user_id={user_id} setIsOpen={setIsOpen} />

		</div>
	)
}

export default Subscribers;