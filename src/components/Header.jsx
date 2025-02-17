import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import DarkModeToggle from "./DarkModeToggle";
import { Link } from "react-router";
import { IoFlash } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    


    return (
        <nav className="flex justify-between items-center xl:px-24 lg:px-16 md:px-10 px-5 xl:py-5 lg:py-[14px] md:py-4 py-[14px] shadow-md">
            <Link to="/">
                <h1 className="flex items-center gap-1 justify-start xl:text-[32px] lg:text-[28px] md:text-xl text-lg font-semibold"><IoFlash />Flashcard</h1>
            </Link >
            <div className="flex items-center lg:gap-4 md:gap-3 gap-2">
                <DarkModeToggle />

                {user ? (
                    <div className="flex items-center">
                        <span className="text-sm">{user?.name}</span>
                        <button className="xl:py-[9px] lg:py-2 py-[6px] bg-red-500 text-white shadow-lg font-medium rounded-xl md:w-24 w-20 text-center" onClick={() => dispatch(logout())}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="xl:py-[9px] lg:py-2 py-[6px] bg-[#025195] text-white shadow-lg font-medium rounded-xl md:w-24 w-20 text-center">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
