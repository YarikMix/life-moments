import {Outlet, Route, Routes} from "react-router-dom";
import Home from "pages/home/home.tsx";
import ProfilePage from "pages/profilePage/profilePage.tsx";
import PostPage from "pages/postPage/postPage.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkUser} from "store/sagas/auth.ts";
import Header from "components/Header";
import LoginPage from "pages/LoginPage";
import {RegisterPage} from "pages/RegisterPage/RegisterPage.tsx";

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

            <Route path="login/" element={<LoginPage />} />

            <Route path="register/" element={<RegisterPage />}  />

            <Route path="/" element={<Layout />}>

                <Route path="/" element={<Home/>} />

                <Route path="profile/:id" element={<ProfilePage />} />

                <Route path="posts/:id" element={<PostPage/>} />

            </Route>

        </Routes>
    )
}