import {useAuth} from "../../../hooks/users/useAuth";
import {useState} from "react";
import {DOMEN} from "../../../utils/consts";
import {ru} from "../../../utils/momentLocalization";
import CustomButton from "../../../components/customButton/CustomButton";
import EditProfile from "./editProfile/editProfile";
import {useNavigate} from "react-router-dom"
import moment from "moment";

const OwnerProfile = () => {

    const navigate = useNavigate()

    const {user, logOut} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const handleEditProfileButtonClick = () => {
        setIsOpen(true)
    }

    const handleLogOut = async () => {
        const flag = await logOut()
        if (flag) {
            navigate("/auth/login")
        }
    }

    const avatar = `${DOMEN}/${user.photo}`

    return (
        <div className="user-profile-wrapper">

            <img className="user-avatar" src={avatar} alt=""/>

            <div className="user-info-container">
                <span>Никнейм: {user.username}</span>
                <span>Почта: {user.email}</span>
                <span>Дата регистрации: {moment(user.date_register).locale(ru()).format("D MMMM")}</span>
                <span>Рейтинг: {user.rating}</span>
                <span>Подписчиков: {user.subscribers_count}</span>
            </div>

            <div className="edit-button-container">
                <CustomButton onClick={handleEditProfileButtonClick}>Редактировать</CustomButton>
                <CustomButton onClick={handleLogOut}>Выйти</CustomButton>
            </div>

            <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default OwnerProfile