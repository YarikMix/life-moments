import "./subscribersList.sass"
import SearchBar from "./SearchBar/SearchBar";
import Subscriber from "../subscriber/subscriber";
import {api} from "modules/api.ts";
import {I_User} from "utils/types.ts";
import {useSubscribers} from "hooks/users/useSubscribers.ts";
import {useDynamicPagination} from "hooks/other/useDynamicPagination.ts";
import PopUpWindow from "components/popUpWindow/popUpWindow.tsx";

const SubscribersList = ({owner_id}:{owner_id:string}) => {

	const {isOpen, setIsOpen} = useSubscribers()

	const fetchSubscribers = async({ pageParam = 1 }) => {
		const {data} = await api.get(`users/${owner_id}/subscribers/`, {
			params: {
				page: pageParam,
				results: 6
			}
		})

		return data
	}

	const {
		data
	} = useDynamicPagination([owner_id, isOpen], fetchSubscribers)

	const cards = data.map((subscriber:I_User) =>
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