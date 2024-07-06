import "./addPostForm.sass"
import CustomTextarea from "../../customTextarea/customTextarea";
import {useRef, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {MdCloudUpload} from "react-icons/md";
import {RiImageAddFill} from "react-icons/ri";
import TagListForm from "./tagListForm/tagListForm";
import {usePostForm} from "../../../hooks/posts/usePostForm";
import CustomInput from "../../customInput/customInput";
import {useAuth} from "../../../hooks/users/useAuth";
import {warningMessage} from "../../../utils/toasts";
import {api} from "modules/api.ts";

const AddPostForm = ({data, setData}) => {

	const {avatar} = useAuth()

	const [imgFile, setImgFile] = useState<File | undefined>()
	const [imgURL, setImgURL] = useState<string | undefined>(undefined)

	const {title, setTitle, content, setContent, cleanForm, tags} = usePostForm()

	const addPost = async (e) => {
		e.preventDefault()

		if (tags.length == 0) {
			warningMessage("Пожалуйста укажите тэги")
			return
		}

		if (imgFile == undefined) {
			warningMessage("Пожалуйста прикрепите фото момента")
			return
		}

		const form_data = new FormData()

		form_data.append('title', title)
		form_data.append('content', content)
		form_data.append('tags', tags.join(", "))
		form_data.append('image', imgFile, imgFile.name)

		const response = await api.post("/moments/create/", form_data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})

		if (response.status == 200) {
			cleanImage()
			cleanForm()
			setData([response.data, ...data])
		}
	}

	const inputRef = useRef<HTMLInputElement>(undefined)

	const cleanImage = () => {
		inputRef.current.value = ""
		setImgURL(undefined)
		setImgFile(undefined)
	}

	const handleFileChange = (e) => {
		if (e.target.files) {
			const img = e.target?.files[0]
			setImgFile(img)
			setImgURL(URL.createObjectURL(img))
		}
	}

	return (
		<form className="add-post-form-wrapper" onSubmit={addPost}>

			<div className="top-container">
				<img className="user-avatar" src={avatar} alt=""/>
				<div className="inputs-container">
					<CustomInput placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required={true}/>
					<CustomTextarea placeholder="Напишите что-нибудь" value={content} onInput={setContent} required={true} />
				</div>
			</div>

			<TagListForm />

			<div className="images-container">
				<div className="image-wrapper">
					{imgURL && <img src={imgURL} alt=""/> }
					{imgURL && <AiOutlineClose className="close-btn" onClick={cleanImage}/> }
					<input ref={inputRef} type="file" id="file" accept="image/*" alt="" onChange={handleFileChange} hidden={imgURL}/>
					{!imgURL && <MdCloudUpload className="upload-icon" />}
					{!imgURL && <span>Перетащите изображение</span>}
				</div>
			</div>

			<div className="bottom-container">

				<div className="upload-photo-button">
					<label htmlFor="file">
						<RiImageAddFill />
						<span>Загрузить фото</span>
					</label>
				</div>

				<button type="submit" className="publish-button">Опубликовать</button>

			</div>

		</form>
	)
}

export default AddPostForm;