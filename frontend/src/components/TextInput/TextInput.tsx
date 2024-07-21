import s from "./style.module.scss";
import {ReactNode} from "react";

interface I_Props {
    value: string,
    setValue: (value:string) => void
    placeholder: string
    icon: ReactNode
}

export const TextInput = ({value, setValue, placeholder, icon}: I_Props) => {
    return (
        <div className={s.inputWrapper}>
            <input type="text" placeholder={placeholder} className={s.inputField} value={value} onChange={(e) => setValue(e.target.value)} required/>
            {icon}
        </div>
    );
};