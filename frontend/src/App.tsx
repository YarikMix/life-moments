import './Styles/Main.sass'
import './Styles/Reset.sass'
import './Styles/Fonts.sass'
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import Auth from "./pages/auth/auth";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import ProfilePage from "./pages/profilePage/profilePage";
import * as React from 'react'
import PostPage from "./pages/postPage/postPage";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {Provider} from "react-redux";
import store from "./store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="content-wrapper">
                <Outlet />
            </div>
        </div>
    )
}

const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter>

                <ToastContainer />

                <Routes>

                    <Route path="auth/" element={<Navigate to="login/" replace />} />

                    <Route path="auth/" element={<Auth />}>

                        <Route path="login/" element={null} />

                        <Route path="register/" element={null}  />

                    </Route>

                    <Route path="/" element={<Navigate to="home/" replace />} />

                    <Route path="/" element={<Layout />}>

                        <Route path="home/" element={<Home/>} />

                        <Route path="profile/:id" element={<ProfilePage />} />

                        <Route path="posts/:id" element={<PostPage/>} />

                    </Route>


                </Routes>


            </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
