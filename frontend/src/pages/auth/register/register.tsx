import "./register.sass"
import {FaGithub, FaGoogle, FaFacebook, FaLinkedin} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import {useAuth} from "../../../hooks/users/useAuth";

const Register = () => {

	const navigate = useNavigate()

	const {register} = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData(e.target)

		const flag = await register(formData)

		if (flag) {
			navigate("/home")
		}
	}

	return (
		<form onSubmit={handleSubmit}>

			<h1>Регистрация</h1>

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

			<input type="text" placeholder="Почта" name="email"/>

			<input type="text" placeholder="Имя" name="username"/>

			<input type="text" placeholder="Пароль" name="password"/>

			<button>Зарегистрироваться</button>
		</form>
	)
}

export default Register