import "./editProfile.sass"
import {ChangeEvent, useState} from "react";
import {BsFillCameraFill} from "react-icons/bs";
import PopUpWindow from "../../../../components/popUpWindow/popUpWindow";
import CustomInput from "../../../../components/customInput/customInput";
import CustomButton from "../../../../components/customButton/CustomButton";
import {useAuth} from "../../../../hooks/users/useAuth";
import {useToken} from "../../../../hooks/users/useToken";
import {api} from "../../../../utils/api";
import {successMessage} from "../../../../utils/toasts";

const EditProfile = ({isOpen, setIsOpen}) => {

	const {user, avatar, setUser} = useAuth()

	const {access_token} = useToken()

	const [username, setUsername] = useState<string>(user.username)

	const [email, setEmail] = useState<string>(user.email)

	const [imgFile, setImgFile] = useState<File | undefined>()
	const [imgURL, setImgURL] = useState<string | undefined>(avatar)

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const img = e.target?.files[0]
			setImgFile(img)
			setImgURL(URL.createObjectURL(img))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsOpen(false)

		const form_data = new FormData()

		form_data.append('username', username)
		form_data.append('email', email)

		if (imgFile != undefined) {
			form_data.append('photo', imgFile, imgFile.name)
		}

		const response = await api.put(`/users/${user.id}/update/`, form_data, {
			headers: {
				'content-type': 'multipart/form-data',
				'authorization': access_token
			}
		})

		if (response.status == 200) {
			setUser(response.data)
			successMessage("Настройки профиля успешно сохранены!")
		}
	}

	return (
		<PopUpWindow isOpen={isOpen} setIsOpen={setIsOpen}>
			<form className="profile-edit-wrapper" onSubmit={handleSubmit}>

				<div className="profile-image-wrapper">
					<div className="profile-image-container">
						<img src={imgURL} className="user-avatar" alt=""/>
						<div className="round">
							<input type="file" accept="image/*" alt="" onChange={handleFileChange}/>
							<BsFillCameraFill />
						</div>
					</div>
				</div>

				<div className="input-container">
					<label htmlFor="username">Никнейм</label>
					<CustomInput placeholder="Никнейм" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required={true}/>
				</div>

				<div className="input-container">
					<label htmlFor="email">Почта</label>
					<CustomInput type="email" placeholder="Почта" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
				</div>

				<CustomButton>Отправить</CustomButton>

			</form>
		</PopUpWindow>
	)
}

export default EditProfile