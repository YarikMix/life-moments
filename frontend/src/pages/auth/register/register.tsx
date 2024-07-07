import "./register.sass"
import {FaGithub, FaGoogle, FaFacebook, FaLinkedin} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import React from "react";
import {registerUser} from "store/sagas/auth.ts";
import {T_UserRegisterCredentials} from "src/utils/types.ts";

const Register = () => {

	const navigate = useNavigate()

    const dispatcher = useDispatch()

	const handleSubmit = async (e:React.FormEvent) => {
		e.preventDefault()

        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as T_UserRegisterCredentials

		dispatcher(registerUser(data))

        navigate("/")
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