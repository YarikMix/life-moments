import "./login.sass"
import {FaGithub, FaGoogle, FaFacebook, FaLinkedin} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../hooks/users/useAuth";

const Login = () => {

	const navigate = useNavigate()

	const {login} = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		const flag = await login(formData)

		if (flag) {
			navigate("/")
		}
	}

	return (

		<form onSubmit={handleSubmit}>

			<h1>Вход</h1>

			<div className="social-icons">

				<a href="/src/pages" className="icon">
					<FaGoogle/>
				</a>

				<a href="/src/pages" className="icon">
					<FaFacebook/>
				</a>

				<a href="/src/pages" className="icon">
					<FaGithub/>
				</a>

				<a href="/src/pages" className="icon">
					<FaLinkedin/>
				</a>

			</div>

			<input type="email" name="email" placeholder="Почта" required/>

			<input type="password" name="password" placeholder="Пароль" required/>

			<a href="/src/pages">Забыли пароль?</a>

			<button>Войти</button>

		</form>

	)
}

export default Login