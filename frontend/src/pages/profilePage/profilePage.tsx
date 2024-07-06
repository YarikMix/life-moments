import "./profilePage.sass"
import UserProfile from "./userProfile/userProfile";
import PostsList from "../../components/postsList/postsList";
import Subscribers from "./subscribers/subscribers";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom"
import OwnerProfile from "./ownerProfile/ownerProfile";
import {Helmet} from "react-helmet"

const ProfilePage = () => {

	const { id } = useParams<{id?: string}>()

	const {is_authenticated} = useAuth()

	const navigate = useNavigate()

	const {user} = useAuth()

	useEffect(() => {
		if (!is_authenticated) {
			navigate("/auth/login/")
		}
	}, [])

	return (
        <>
            <Helmet>
                <title>Профиль</title>
            </Helmet>
            <div className="profile-page-wrapper">

                <PostsList user_id={id} showPostForm={true}/>

                <div className="right-bar-wrapper">
                    {user?.id == id ? <OwnerProfile/> : <UserProfile user_id={id}/>}
                    <Subscribers user_id={id}/>
                </div>

            </div>
        </>
    )
}

export default ProfilePage;