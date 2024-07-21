import s from "./style.module.scss";
import {IoMdEye, IoMdEyeOff} from "react-icons/io";
import clsx from "clsx";
import {MdLockOutline} from "react-icons/md";
import {useState} from "react";

interface I_Props {
    value: string,
    setValue: (value:string) => void,
    placeholder: string
}

export const PasswordInput = ({value, setValue, placeholder}:I_Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => setShowPassword(showPassword => !showPassword)

    return (
        <div className={s.inputWrapper}>
            <input type={showPassword ? "text" : "password"} name="password" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className={s.inputField} required/>
            <IoMdEye class={clsx(s.togglePasswordBtn, s.hidePasswordBtn)} onClick={togglePassword}/>
            <IoMdEyeOff className={clsx(s.togglePasswordBtn, s.showPasswordBtn)} onClick={togglePassword}/>
            <MdLockOutline className={s.icon}/>
        </div>
    );
};