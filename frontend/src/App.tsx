import './Styles/Main.sass'
import './Styles/Reset.sass'
import './Styles/Fonts.sass'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import Auth from "./pages/auth/auth";
import Home from "./pages/home/home";
import ProfilePage from "./pages/profilePage/profilePage";
import PostPage from "./pages/postPage/postPage";
import {Provider, useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import Header from "components/Header";
import store from "src/store";
import {checkUser} from "store/sagas/auth.ts";

const Layout = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
    }, []);

    return (
        <div>
            <Header />
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    )
}

function App() {

    return (

        <Provider store={store}>

            <BrowserRouter>

                <ToastContainer />

                <Routes>

                    <Route path="auth/" element={<Navigate to="login/" replace />} />

                    <Route path="auth/" element={<Auth />}>

                        <Route path="login/" element={null} />

                        <Route path="register/" element={null}  />

                    </Route>

                    <Route path="/" element={<Layout />}>

                        <Route path="/" element={<Home/>} />

                        <Route path="profile/:id" element={<ProfilePage />} />

                        <Route path="posts/:id" element={<PostPage/>} />

                    </Route>

                </Routes>

            </BrowserRouter>

        </Provider>

    )
}

export default App
