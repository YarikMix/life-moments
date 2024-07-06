import {useDispatch, useSelector} from 'react-redux';
import {updateIsOpen, updateSubscribers} from "../../store/users/subscribersSlice";
import {api} from "modules/api.ts";

export function useSubscribers() {
    const {isOpen, subscribers} = useSelector(state => state.subscribers)

    const dispatch = useDispatch()

    const setIsOpen = (value) => {
        dispatch(updateIsOpen(value))
    }

    const setSubscribers = (value) => {
        dispatch(updateSubscribers(value))
    }

    const fetchSubscribers = async (id) => {

        const {data} = await api.get(`users/${id}/subscribers/`, {
            params: {
                limit: 6
            }
        })

        setSubscribers(data["data"])

    }

    return {
        isOpen,
        subscribers,
        setIsOpen,
        fetchSubscribers
    }
}