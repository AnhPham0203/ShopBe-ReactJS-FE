import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const user = {
    name,
    email,
    password,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Logic đăng ký
    try {
      const respone = await axios.post(
        "http://localhost:8080/api/user/register",
        user
      );

      setMessage(respone.data);
      setEmail("");
      setUsername("");
      setPassword("");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>
        {message && (
          <div className=" bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên Người Dùng</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
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
            Đăng Ký
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-orange-500 hover:text-orange-600">
            Đăng Nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
