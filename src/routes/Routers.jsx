import { Route, Routes } from 'react-router';
import MainLayouts from '../layouts/MainLayouts';
import LandingPage from '../pages/LandingPage/LandingPage';

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
        </Routes>
    );
};

export default Routers;