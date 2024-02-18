import "./commentLikeButton.sass"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useEffect, useRef, useState} from "react";
import {Comment} from "../../utils/types";
import {warningMessage} from "../../utils/toasts";
import {api} from "../../utils/api";
import {useAuth} from "../../hooks/users/useAuth";
import {useToken} from "../../hooks/users/useToken";

const CommentLikeButton = ({comment}:{comment:Comment}) => {

    const [likes, setLikes] = useState(comment.likes)
    const [liked, setLiked] = useState(comment.liked)

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

    const showEffects = async () => {
        ref.current?.classList.add("animate")

        setTimeout(() => {
            ref.current?.classList.remove("animate")
        }, 600)
    }

    const handleClick = async () => {
        if (!is_authenticated) {
            warningMessage("Войдите в аккаунт!")
            return
        }

        const response = await api.post(`comments/${comment.id}/like/`, {}, {
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

    return (
        <div className="likes-wrapper">
            <div className="likes-container" onClick={handleClick} ref={ref}>
                {liked ? <AiFillHeart className="icon" /> : <AiOutlineHeart className="icon" />}
                <span className="likes-count">{likes}</span>
            </div>
        </div>
    )
}

export default CommentLikeButton