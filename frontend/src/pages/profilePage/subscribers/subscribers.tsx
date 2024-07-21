import "./subscribers.sass"
import Subscriber from "./subscriber/subscriber";
import {useEffect} from "react";
import SubscribersList from "./subscribersList/subscribersList";
import {I_User} from "utils/types.ts";
import {useSubscribers} from "hooks/users/useSubscribers.ts";
import {useAuth} from "hooks/users/useAuth.ts";

const Subscribers = ({owner_id}:{owner_id:string}) => {

	const {subscribers, setIsOpen, setOpen, fetchUserSubscribers} = useSubscribers()

    const {user_id} = useAuth()

	useEffect(() => {
		setIsOpen(false)
        fetchUserSubscribers(owner_id)
	}, [owner_id])

	return (
		<div className="subscribers-wrapper">

			<div className="top-container">
				<span>Подписчики</span>
				<span className="show-button" onClick={setOpen}>Посмотреть всех</span>
			</div>

            {subscribers.length > 0 ?
                <div className="bottom-container">
                    {subscribers.map((subscriber:I_User) => (
                        <Subscriber user={subscriber} key={subscriber.id}/>
                    ))}
                </div>
                :
                <span className="subscribers-not-found-label">{owner_id == user_id ? "У вас нет подписчиков" : "Еще никто не подписан"}</span>
            }

            <SubscribersList owner_id={owner_id} />

		</div>
	)
}

export default Subscribers;