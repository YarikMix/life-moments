import "./register.sass"
import {FaGithub, FaGoogle, FaFacebook, FaLinkedin} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"

const Register = () => {

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		navigate("/home")
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

			<input type="text" placeholder="Почта" />

			<input type="text" placeholder="Имя" />

			<input type="text" placeholder="Пароль" />

			<button>Зарегистрироваться</button>
		</form>
	)
}

export default Register