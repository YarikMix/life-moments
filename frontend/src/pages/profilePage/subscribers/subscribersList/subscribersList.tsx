import "./subscribersList.sass"
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import SearchBar from "./SearchBar/SearchBar";
import Subscriber from "../subscriber/subscriber";
import {useDynamicPagination} from "../../../../hooks/other/useDynamicPagination";
import {useSubscribers} from "../../../../hooks/users/useSubscribers";
import {api} from "modules/api.ts";

const SubscribersList = ({user_id}) => {

	const {isOpen, setIsOpen} = useSubscribers()

	const fetchSubscribers = async({ pageParam = 1 }) => {
		const {data} = await api.get(`users/${user_id}/subscribers/`, {
			params: {
				page: pageParam,
				results: 6
			}
		})

		return data
	}

	const {
		data
	} = useDynamicPagination([user_id, isOpen], fetchSubscribers)

	const cards = data.map((subscriber) =>
		<Subscriber user={subscriber} key={subscriber.id} />
	)

	return (
		<PopUpWindow isOpen={isOpen} setIsOpen={setIsOpen}>

			<div className="subscribers-list-wrapper">

				<div className="top-container">
					<SearchBar />
				</div>

				<div className="bottom-container">

					{cards}

				</div>

			</div>

		</PopUpWindow>
	)
}

export default SubscribersList;