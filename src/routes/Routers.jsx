import { Route, Routes } from 'react-router';
import MainLayouts from '../layouts/MainLayouts';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PrivateRouter from './PrivateRouter';

const Routers = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<MainLayouts />}
            >
                <Route
                    index
                    element={<PrivateRouter>
                        <LandingPage />
                    </PrivateRouter>}
                />
            </Route>
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
        </Routes>
    );
};

export default Routers;