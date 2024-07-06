import {useSelector} from 'react-redux';
import {RootState} from "store/store.ts";

export function useAuth() {
	const {is_authenticated, user} = useSelector((state:RootState) => state.auth)

	const avatar = user?.photo

	return {
		is_authenticated,
		user,
		avatar
	}
}