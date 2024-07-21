import {useDispatch, useSelector} from 'react-redux';
import {updateIsOpen} from "../../store/users/subscribersSlice";
import {fetchSubscribers} from "store/sagas/subscribers.ts";
import {RootState} from "store/store.ts";

export function useSubscribers() {
    const {isOpen, subscribers} = useSelector((state:RootState) => state.subscribers)

    const dispatch = useDispatch()

    const setIsOpen = (value:boolean) => {
        dispatch(updateIsOpen(value))
    }

    const setOpen = () => {
        dispatch(updateIsOpen(true))
    }

    const fetchUserSubscribers = (user_id:string) => dispatch(fetchSubscribers(user_id))

    return {
        isOpen,
        subscribers,
        setIsOpen,
        setOpen,
        fetchUserSubscribers
    }
}