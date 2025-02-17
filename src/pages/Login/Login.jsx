import { useState } from "react";
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router";
import banner from "../../assets/Image/Shared/Login_banner.png";
import { IoFlash } from "react-icons/io5";
import { useDispatch } from "react-redux";
const Login = () => {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e?.target?.email?.value;
        const password = e?.target?.password?.value;

        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            alert("Email is not in the correct format!");
            return;
        }
        if (email && password) {
            try {
                const newUser = { email, password };
                // await registerUser(dispatch, newUser);
                alert("Login Successfully!!")


            } catch (error) {
                console.log('Error in sign-up:', error);
                alert("Not able to Login!!")
            }
        }
    };

    return (
        <div className="bg-slate-200 h-screen flex items-center justify-center">
            <div className="lg:w-[80%] lg:h-[80%] md:w-[70%] w-[90%] h-auto bg-white rounded-2xl shadow-xl flex flex-row-reverse items-center gap-20 lg:px-16 md:px-10 px-5">
                <div className="lg:w-[55%] w-full lg:my-0 md:my-12 my-8">
                    <Link to="/">
                        <h1 className="flex text-black items-center gap-1 justify-center text-center xl:text-[32px] lg:text-[28px] md:text-xl text-lg font-semibold"><IoFlash />Flashcard</h1>
                    </Link >
                    <div className="md:mt-2 w-full">
                        <h4 className="xl:text-[24px] lg:text-[21.5px] md:text-lg font-semibold text-[#025195] text-center">Login to Your Account</h4>
                        <form onSubmit={handleLogin} className="flex flex-col xl:gap-2 lg:gap-[6px] gap-2 mt-5 w-full">
                            <div className="relative w-full flex items-center">
                                <FaEnvelope className="absolute text-black left-4 xl:w-[21px] lg:w-[19px]" />
                                <input type="email" className="w-full bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] pl-12 pr-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium" name="email" placeholder="Email" required />
                            </div>
                            <div className="relative w-full flex items-center">
                                <FaLock className="absolute text-black left-4 xl:w-[21px] lg:w-[19px]" />
                                <input type={passwordVisible ? 'text' : 'password'}
                                    className="w-full bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] pl-12 pr-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium" name="password" placeholder="Password" required />
                                <button
                                    type="button"
                                    className="absolute right-4"
                                    onClick={togglePasswordVisibility}>
                                    {!passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            <button type="submit" className="xl:py-[9px] lg:py-2 py-[6px] bg-[#025195] text-white shadow-lg font-medium rounded-3xl lg:mt-2 md:mt-5 mt-4">Login Now</button>
                        </form>
                    </div>
                    <p className="font-medium text-[#546879] text-center xl:mt-3 lg:mt-2 mt-[6px] text-[15px]">Are you new here? <span className="font-bold text-[#025195]"><Link to="/register">Register</Link></span></p>
                </div>
                <div className="lg:block hidden w-[45%] h-5/6">
                    <img className="h-full w-full" src={banner} alt="banner" />
                </div>
            </div>
        </div >
    );
};

export default Login;
