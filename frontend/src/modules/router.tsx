import {Outlet, Route, Routes} from "react-router-dom";
import Auth from "pages/auth/auth.tsx";
import {AuthForm} from "utils/types.ts";
import Home from "pages/home/home.tsx";
import ProfilePage from "pages/profilePage/profilePage.tsx";
import PostPage from "pages/postPage/postPage.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkUser} from "store/sagas/auth.ts";
import Header from "components/Header";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    )
}

export const AppRoutes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
    }, [dispatch]);

    return (
        <Routes>

            <Route path="login/" element={<Auth page={AuthForm.login}/>} />

            <Route path="register/" element={<Auth page={AuthForm.register}/>}  />

            <Route path="/" element={<Layout />}>

                <Route path="/" element={<Home/>} />

                <Route path="profile/:id" element={<ProfilePage />} />

                <Route path="posts/:id" element={<PostPage/>} />

            </Route>

        </Routes>
    )
}