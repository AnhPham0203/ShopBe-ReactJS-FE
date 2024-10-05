import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../Context/AppProvider ";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  const { setUser, fetchCart } = useContext(AppContext);

  const user = {
    email,
    password,
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Logic đăng nhập
    try {
      const respone = await axios.post(
        "http://localhost:8080/api/user/login",
        user
      );

      if (typeof respone.data === "string") {
        setMessage(respone.data);
      } else {
        setUser(respone.data);
        fetchCart(respone.data.email);
        console.log("location.state?.from==", location.state); //in ra null

        // Kiểm tra xem có đường dẫn trước đó (trang chi tiết sản phẩm) không
        const redirectTo = location.state?.from || "/";
        console.log("redirectTo====", redirectTo);

        navigate(redirectTo); // Điều hướng tới trang trước đó hoặc trang chủ nếu không có
      }

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>
        {message && (
          <div className=" bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
            {message}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mật Khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-300"
          >
            Đăng Nhập
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-orange-500 hover:text-orange-600">
            Đăng Ký
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
