import { Route, Routes } from 'react-router';
import MainLayouts from '../layouts/MainLayouts';
import LandingPage from '../pages/LandingPage/LandingPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const Routers = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<MainLayouts />}
            >
                <Route
                    // path="/"
                    index
                    element={<LandingPage />}
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