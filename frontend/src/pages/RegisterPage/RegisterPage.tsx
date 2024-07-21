import s from "./style.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {T_UserRegisterCredentials} from "utils/types.ts";
import {registerUser} from "store/sagas/auth.ts";
import {useDispatch} from "react-redux";
import {useAuth} from "hooks/users/useAuth.ts";
import EmailInput from "components/EmailInput";
import PasswordInput from "components/PasswordInput";
import {warningMessage} from "utils/toasts.ts";
import 'react-phone-number-input/style.css'
import TextInput from "components/TextInput";
import {FaRegUser} from "react-icons/fa";
import {MdLocalPhone} from "react-icons/md";

export const RegisterPage = () => {

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    const dispatcher = useDispatch()

    const [firstName, setFistName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        if (password != repeatPassword) {
            warningMessage("Пароли не совпадают!")
            return
        }

        const data:T_UserRegisterCredentials = {
            firstName,
            lastName,
            phone,
            email,
            password
        }

        dispatcher(registerUser(data))
    }

    useEffect(() => {
        is_authenticated && navigate("/")
    }, [is_authenticated]);

    return (
        <div className={s.pageWrapper}>
            <div className={s.registerContainer}>
                <h2 className={s.formTitle}>Регистрация</h2>
                <form className={s.registerForm} onSubmit={handleSubmit}>
                    <TextInput icon={<FaRegUser />} value={firstName} setValue={setFistName} placeholder="Имя" />
                    <TextInput icon={<FaRegUser />} value={lastName} setValue={setLastName} placeholder="Фамилия" />
                    <TextInput icon={<MdLocalPhone  />} value={phone} setValue={setPhone} placeholder="Телефон" />
                    <EmailInput value={email} setValue={setEmail} />
                    <PasswordInput placeholder="Пароль" value={password} setValue={setPassword}/>
                    <PasswordInput placeholder="Повторите пароль" value={repeatPassword} setValue={setRepeatPassword} />
                    <button className={s.registerButton}>Зарегистрироваться</button>
                </form>
                <p className={s.signupText}>
                    Уже зарегистрированы?{' '}
                    <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};