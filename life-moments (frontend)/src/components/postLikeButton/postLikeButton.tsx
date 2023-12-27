import "./postLikeButton.sass"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useEffect, useRef} from "react";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import {warningMessage} from "../../utils/toasts";
import {useAuth} from "../../hooks/users/useAuth";


const PostLikeButton = ({post, likes, liked, setLikes, setLiked}) => {

	const {is_authenticated} = useAuth()

	const {access_token} = useToken()

	const ref = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (liked) {
			ref.current?.classList.add("liked")
		} else {
			ref.current?.classList.remove("liked")
		}
	}, [liked])

	const handleClick = async () => {

		if (!is_authenticated) {
			warningMessage("Войдите в аккаунт!")
			return
		}

		const response = await api.post(`moments/${post.id}/like/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 201) {
			setLikes(response.data)
			setLiked(true)
			ref.current?.classList.add("liked")
		} else if (response.status == 200) {
			setLikes(response.data)
			setLiked(false)
			ref.current?.classList.remove("liked")
		}

		await showEffects()
	}

	const showEffects = async () => {
		ref.current?.classList.add("animate")

		setTimeout(() => {
			ref.current?.classList.remove("animate")
		}, 600)
	}

	return (
		<div className={"icon-container likes-container"} onClick={handleClick} ref={ref} >
			{liked ? <AiFillHeart className="icon" /> : <AiOutlineHeart className="icon" />}
			<span className="likes-count">{likes}</span>
		</div>
	)
}



export default PostLikeButton;