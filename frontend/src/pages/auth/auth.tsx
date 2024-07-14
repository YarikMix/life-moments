import Login from "./login/login";
import {useState} from "react";
import Register from "./register/register";
import {Link} from "react-router-dom";
import "./auth.sass"

const Auth = ({page}:{page:number}) => {

	const [mode, setMode] = useState<number>(page)

	return (
		<div className="auth-wrapper">

			<div className={"container " + (mode ? "active" : "")}>

				<div className="form-container sign-up">

					<Register />

				</div>

				<div className="form-container sign-in">

					<Login />

				</div>

				<div className="toggle-container">
					<div className="toggle">
						<div className="toggle-panel toggle-left">
							<h2>Уже есть аккаунт?</h2>
							<Link to="/login">
								<button className="hidden" id="register" onClick={() => {
									setMode(0)
								}}>Войти</button>
							</Link>
						</div>
						<div className="toggle-panel toggle-right">
							<h2>Ещё нет аккаунта?</h2>
							<Link to="/register">
								<button className="hidden" id="login" onClick={() => {
									setMode(1)
								}}>Зарегистрироваться</button>
							</Link>
						</div>
					</div>
				</div>

			</div>
		</div>

	)
}

export default Auth