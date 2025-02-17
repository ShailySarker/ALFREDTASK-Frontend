import { useState } from "react";
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa6";
import { Link } from "react-router";
import banner from "../../assets/Image/Shared/Register_banner.png";
import { IoFlash } from "react-icons/io5";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const Register = () => {
    const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const name = e?.target?.name?.value;
        const email = e?.target?.email?.value;
        const password = e?.target?.password?.value;
        const confirmPassword = e?.target?.confirmPassword?.value;

        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            alert("Email is not in the correct format!");
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            alert('Please add at least two uppercase letters');
            return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            alert('Please add at least two numbers');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            alert('Please add a special character');
            return;
        }
        if (password?.length < 8) {
            alert('Password must be 8 characters long');
            return;
        }
        if (password === confirmPassword) {
            if (name && email && password && confirmPassword) {
                try {
                    const newUser = { name, email, password };
                    await registerUser(dispatch, newUser);
                    alert("Registered Successfully!!")


                } catch (error) {
                    console.log('Error in sign-up:', error);
                    alert("Not able to Register!!")
                }
            }
        } else {
            alert("Confirm Password is not same as Password");
        }
    };

    return (
        <div className="bg-slate-200 h-screen flex items-center justify-center">
            <div className="lg:w-[80%] lg:h-[80%] md:w-[70%] w-[90%] h-auto bg-white rounded-2xl shadow-xl flex items-center gap-20 lg:px-16 md:px-10 px-5">
                <div className="lg:w-[55%] w-full lg:my-0 md:my-12 my-8">
                    <Link to="/">
                        <h1 className="text-black flex items-center gap-1 justify-center text-center xl:text-[32px] lg:text-[28px] md:text-xl text-lg font-semibold"><IoFlash />Flashcard</h1>
                    </Link >
                    <div className="md:mt-2 w-full">
                        <h4 className="xl:text-[24px] lg:text-[21.5px] md:text-lg font-semibold text-[#025195] text-center">Create your account</h4>
                        <form onSubmit={handleSignUp} className="flex flex-col xl:gap-2 lg:gap-[6px] gap-2 mt-5 w-full">
                            <div className="relative w-full flex items-center">
                                <FaUser className="absolute text-black left-4 xl:w-[21px] lg:w-[19px]" />
                                <input type="text" className="w-full bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] pl-12 pr-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium" name="name" placeholder="Name" required />
                            </div>
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
                                    className="absolute text-black right-4"
                                    onClick={togglePasswordVisibility}>
                                    {!passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            <div className="relative w-full flex items-center">
                                <FaLock className="absolute text-black left-4 xl:w-[21px] lg:w-[19px]" />
                                <input type={confirmPasswordVisible ? 'text' : 'password'}
                                    className="w-full bg-[#FCFCFC] border-[1px] xl:py-[9px] lg:py-2 py-[6px] pl-12 pr-6 border-[#EFEEEE] rounded-xl placeholder:text-[#546879] placeholder:text-[13px] placeholder:font-medium" name="confirmPassword" placeholder="Confirm Password" required />
                                <button
                                    type="button"
                                    className="absolute text-black right-4"
                                    onClick={toggleConfirmPasswordVisibility}>
                                    {!confirmPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            <button type="submit" className="xl:py-[9px] lg:py-2 py-[6px] bg-[#025195] text-white shadow-lg font-medium rounded-3xl lg:mt-2 md:mt-5 mt-4">Register Now</button>
                        </form>
                    </div>
                    <p className="font-medium text-[#546879] text-center xl:mt-3 lg:mt-2 mt-[6px] text-[15px]">Already have an account? <span className="font-bold text-[#025195]"><Link to="/login">Login</Link></span></p>
                </div>
                <div className="lg:block hidden w-[45%] h-5/6">
                    <img className="h-full w-full" src={banner} alt="banner" />
                </div>
            </div>
        </div >
    );
};

export default Register;