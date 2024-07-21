import {useSelector} from 'react-redux';
import {RootState} from "store/store.ts";

export function useAuth() {
	const {is_authenticated, user} = useSelector((state:RootState) => state.auth)

	const avatar = user?.photo as string
    const user_id = user?.id as string
    const userId = user?.id as string
    const firstName = user?.firstName as string
    const lastName = user?.lastName as string
    const email = user?.email as string

	return {
		is_authenticated,
		user,
		avatar,
        user_id,
        userId,
        firstName,
        lastName,
        email
	}
}