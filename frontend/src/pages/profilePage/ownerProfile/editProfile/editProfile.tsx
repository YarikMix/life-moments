import "./editProfile.sass"
import {ChangeEvent, FormEvent, useState} from "react";
import {BsFillCameraFill} from "react-icons/bs";
import PopUpWindow from "components/popUpWindow/popUpWindow";
import CustomInput from "components/customInput/customInput";
import {useAuth} from "hooks/users/useAuth.ts";
import {useDispatch} from "react-redux";
import {updateProfile} from "store/sagas/user.ts";

interface I_Props {
    isOpen: boolean
    setIsOpen: (value:boolean) => void
}

const EditProfile = ({isOpen, setIsOpen}:I_Props) => {

	const {userId, avatar, firstName, lastName, email} = useAuth()

	const [firstNameField, setFirstName] = useState<string>(firstName)
    const [lastNameField, setLastName] = useState<string>(lastName)
	const [emailField, setEmail] = useState<string>(email)

	const [imgFile, setImgFile] = useState<File | undefined>()
	const [imgURL, setImgURL] = useState<string | undefined>(avatar)

    const dispatcher = useDispatch()

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const img = e.target?.files[0]
			setImgFile(img)
			setImgURL(URL.createObjectURL(img))
		}
	}

	const handleSubmit = async (e:FormEvent) => {
		e.preventDefault()

		setIsOpen(false)

		const data = {
            userId,
            firstName: firstNameField,
            lastName: lastNameField,
            email: emailField,
            photo: imgFile as File
        }

        dispatcher(updateProfile(data))
	}

	return (
		<PopUpWindow isOpen={isOpen} setIsOpen={setIsOpen}>
            <form className="profile-edit-wrapper" onSubmit={handleSubmit}>

                <div className="profile-image-wrapper">
                    <div className="profile-image-container">
                        <img src={imgURL} className="user-avatar" alt=""/>
                        <div className="round">
                            <input type="file" accept="image/*" alt="" onChange={handleFileChange}/>
                            <BsFillCameraFill/>
                        </div>
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="username">Имя</label>
                    <CustomInput placeholder="Имя" id="username" value={firstNameField} setValue={setFirstName} required={true}/>
                </div>

                <div className="input-container">
                    <label htmlFor="username">Фамилия</label>
                    <CustomInput placeholder="Фамилия" id="username" value={lastNameField} setValue={setLastName} required={true}/>
                </div>

                <div className="input-container">
                    <label htmlFor="email">Почта</label>
                    <CustomInput type="email" placeholder="Почта" id="email" value={emailField} setValue={setEmail} required={true}/>
                </div>

                <button className="custom-button">Отправить</button>

            </form>
        </PopUpWindow>
    )
}

export default EditProfile