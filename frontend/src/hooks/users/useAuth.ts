import {useDispatch, useSelector} from 'react-redux';
import {updateUser, updateAuthenticated, cleanUser} from "../../store/users/authSlice";
import {errorMessage, successMessage} from "../../utils/toasts";
import {api} from "modules/api.ts";

export function useAuth() {
	const {is_authenticated, user} = useSelector(state => state.user)

	const avatar = user?.photo

	const dispatch = useDispatch()

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const setAuthenticated = (value) => {
		dispatch(updateAuthenticated(value))
	}

	const resetUser = () => {
		dispatch(cleanUser())
	}

	const logOut = async () => {

		try {

			const response = await api.post(`logout/`)

			if (response.status == 200)
			{
				resetUser()
				successMessage("Вы успешли вышли из аккаунта")
				return true
			}

		} catch (error) {
			errorMessage("Что-то пошло не так")
		}

		return false

	}


	const register = async (formData) => {

		try {

			const response = await api.post(`register/`, formData as FormData)

			if (response.status == 201) {
				return true
			}

		} catch (error) {

			if (error.response.status == 409) {
				errorMessage("Пользователь с такой почтой уже существует!")
			} else {
				errorMessage("Что-то пошло не так")
			}

			return false
		}
	}


	const login = async (formData) => {

		try {

			const response = await api.post(`login/`, formData)

			if (response.status == 200) {
				setUser(response.data)
				setAuthenticated(true)
			}

			successMessage(`Добро пожаловать, ${response.data["username"]}!`)

			return true

		} catch (error){

			if (error.response.status == 401) {
				errorMessage("Неправильный логин или пароль")
			} else {
				errorMessage("Что-то пошло не так")
			}

		}
	}


	const auth = async () => {

		if (is_authenticated)
		{
			return true
		}

		try {

			const response = await api.post(`check/`)

			if (response.status == 200)
			{
				setUser(response.data)
				setAuthenticated(true)

				return true
			}

		} catch (error) {

			return false

		}

	}

	return {
		is_authenticated,
		user,
		avatar,
		setUser,
		setAuthenticated,
		logOut,
		login,
		auth,
		register
	}
}