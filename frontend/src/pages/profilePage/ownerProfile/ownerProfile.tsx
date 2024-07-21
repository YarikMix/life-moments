import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import {ru} from "../../../utils/momentLocalization";
import CustomButton from "../../../components/customButton/CustomButton";
import EditProfile from "./editProfile/editProfile";
import {useNavigate} from "react-router-dom"
import moment from "moment";
import {useDispatch} from "react-redux";
import {logoutUser} from "store/sagas/auth.ts";

const OwnerProfile = () => {

    const navigate = useNavigate()

    const {user, is_authenticated} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const dispatcher = useDispatch()

    const handleEditProfileButtonClick = () => {
        setIsOpen(true)
    }

    const handleLogOut = async () => {
        dispatcher(logoutUser())
    }

    useEffect(() => {
        !is_authenticated && navigate("/login")
    }, [is_authenticated]);

    return (
        <div className="user-profile-wrapper">

            <img className="user-avatar" src={user?.photo} alt=""/>

            <div className="user-info-container">
                <span>Никнейм: {user?.firstName} {user?.lastName}</span>
                <span>Почта: {user?.email}</span>
                <span>Дата регистрации: {moment(user?.date_register).locale(ru()).format("D MMMM")}</span>
                <span>Рейтинг: {user?.rating}</span>
                <span>Подписчиков: {user?.subscribers_count}</span>
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