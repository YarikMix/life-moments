import s from "./style.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {T_UserLoginCredentials} from "utils/types.ts";
import {loginUser} from "store/sagas/auth.ts";
import {useDispatch} from "react-redux";
import {useAuth} from "hooks/users/useAuth.ts";
import EmailInput from "components/EmailInput";
import PasswordInput from "components/PasswordInput";

export const LoginPage = () => {

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    const dispatcher = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        const data: T_UserLoginCredentials = {
            email,
            password
        }
        dispatcher(loginUser(data))
    }

    useEffect(() => {
        is_authenticated && navigate("/")
    }, [is_authenticated]);

    return (
        <div className={s.pageWrapper}>
            <div className={s.loginContainer}>
                <h2 className={s.formTitle}>Вход</h2>
                <form className={s.loginForm} onSubmit={handleSubmit}>
                    <EmailInput value={email} setValue={setEmail} />
                    <PasswordInput placeholder="Пароль" value={password} setValue={setPassword}/>
                    <button className={s.loginButton}>Войти</button>
                </form>
                <p className={s.signupText}>
                    Ещё нет аккаунта?{' '}
                    <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
};