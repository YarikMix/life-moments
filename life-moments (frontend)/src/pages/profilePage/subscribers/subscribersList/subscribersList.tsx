import "./subscribersList.sass"
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import SearchBar from "./SearchBar/SearchBar";
import {api} from "../../../../utils/api";
import Subscriber from "../subscriber/subscriber";
import {useDynamicPagination} from "../../../../hooks/other/useDynamicPagination";
import {useToken} from "../../../../hooks/users/useToken";
import {useSubscribers} from "../../../../hooks/users/useSubscribers";

const SubscribersList = ({user_id}) => {

	const {isOpen, setIsOpen} = useSubscribers()

	const {access_token} = useToken()

	const fetchSubscribers = async({ pageParam = 1 }) => {
		const {data} = await api.get(`users/${user_id}/subscribers/`, {
			headers: {
				'authorization': access_token
			},
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