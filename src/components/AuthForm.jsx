import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";

const AuthForm = ({ isRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await dispatch(registerUser(formData));
      navigate("/login");
    } else {
      await dispatch(loginUser(formData));
      navigate("/");
    }
  };

  return (
    <form className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md" onSubmit={handleSubmit}>
      {isRegister && (
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input-field"
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="input-field"
      />
      <button type="submit" className="btn bg-blue-500 text-white">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
