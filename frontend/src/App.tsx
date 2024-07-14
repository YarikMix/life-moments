import 'styles/main.sass'
import 'styles/reset.sass'
import 'styles/fonts.sass'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import store from "src/store";
import {AppRoutes} from "modules/router.tsx";
import {PersistGate} from "redux-persist/integration/react"
import {persister} from "store/store.ts";

function App() {
    return (

        <Provider store={store}>

            <PersistGate persistor={persister}>

                <BrowserRouter>

                    <ToastContainer />

                    <AppRoutes />

                </BrowserRouter>

            </PersistGate>

        </Provider>

    )
}

export default App
