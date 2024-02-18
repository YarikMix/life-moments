import {useDispatch, useSelector} from 'react-redux';
import {updateIsOpen, updateSubscribers} from "../../store/users/subscribersSlice";
import {api} from "../../utils/api";
import {useToken} from "./useToken";

export function useSubscribers() {
    const {isOpen, subscribers} = useSelector(state => state.subscribers)

    const dispatch = useDispatch()

    const {access_token} = useToken()

    const setIsOpen = (value) => {
        dispatch(updateIsOpen(value))
    }

    const setSubscribers = (value) => {
        dispatch(updateSubscribers(value))
    }

    const fetchSubscribers = async (id) => {

        const {data} = await api.get(`users/${id}/subscribers/`, {
            headers: {
                'authorization': access_token
            },
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