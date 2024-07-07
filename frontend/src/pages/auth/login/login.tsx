import "./login.sass"
import {FaGithub, FaGoogle, FaFacebook, FaLinkedin} from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import React from "react";
import {loginUser} from "store/sagas/auth.ts";
import {T_UserLoginCredentials} from "src/utils/types.ts";

const Login = () => {

	const navigate = useNavigate()

    const dispatcher = useDispatch()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as T_UserLoginCredentials

		dispatcher(loginUser(data))

        navigate("/")
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