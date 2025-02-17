import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router";

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
      <Link to="/" className="text-xl font-bold">Flashcards</Link>

      <div className="flex gap-4">
        <DarkModeToggle />

        {user ? (
          <>
            <span className="text-sm">{user.name}</span>
            <button className="btn bg-red-500 text-white" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn bg-blue-500 text-white">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
