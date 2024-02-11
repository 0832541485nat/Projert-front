import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';


export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-start justify-center h-screen bg-gray-100">
      <div className="p-8 border w-full max-w-md mx-auto rounded mt-5 bg-orange-200 shadow-md">
        <div className="text-4xl mb-6 text-center text-orange-600 font-bold">เข้าสู่ระบบ</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text text-orange-600">Username</span>
            <input
              type="text"
              className="input input-bordered p-3 text-lg"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้"
            />
          </label>

          <label className="form-control">
            <span className="label-text text-orange-600">Password</span>
            <input
              type="password"
              className="input input-bordered p-3 text-lg"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="รหัสผ่าน"
            />
          </label>

          <div className="flex justify-center mt-6">
          <button type="submit" className="btn bg-red-500 px-20 py-3 text-lg text-white">
              ล็อกอิน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
