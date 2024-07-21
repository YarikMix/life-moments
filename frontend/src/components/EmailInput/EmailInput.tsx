import s from "./style.module.scss";
import {IoMailOutline} from "react-icons/io5";

interface I_Props {
    value: string,
    setValue: (value:string) => void
}

export const EmailInput = ({value, setValue}: I_Props) => {
    return (
        <div className={s.inputWrapper}>
            <input type="email" name="email" placeholder="Почта" className={s.inputField} value={value} onChange={(e) => setValue(e.target.value)} required/>
            <IoMailOutline />
        </div>
    );
};