import axios from 'axios';
import { useState } from 'react';

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password');
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input);
      console.log(rs);
      if (rs.status === 200) {
        alert('Register Successful');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 shadow-lg bg-orange-200">
      <div className="text-4xl mb-5 text-center font-bold text-orange-600">ลงทะเบียน</div>
      
      <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
        <label className="flex flex-col">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            className="input input-bordered mt-1 p-3 text-lg bg-orange-100"
            name="username"
            value={input.username}
            onChange={hdlChange}
            placeholder="ชื่อผู้ใช้"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700">E-mail</span>
          <input
            type="email"
            className="input input-bordered mt-1 p-3 text-lg bg-orange-100"
            name="email"
            value={input.email}
            onChange={hdlChange}
            placeholder="อีเมล"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="input input-bordered mt-1 p-3 text-lg bg-orange-100"
            name="password"
            value={input.password}
            onChange={hdlChange}
            placeholder="รหัสผ่าน"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-gray-700">Confirm Password</span>
          <input
            type="password"
            className="input input-bordered mt-1 p-3 text-lg bg-orange-100"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
            placeholder="ยืนยันรหัสผ่าน"
          />
        </label>
        <div className="flex justify-center mt-6">
        <button type="submit" className="btn bg-orange-500 px-80 py-3 text-lg text-white">
            ลงทะเบียน
          </button>
        </div>
        <div className="flex justify-center mt-3">
  <button type="submit" className="btn px-60 py-3 text-lg bg-blue-500">
    Login Facebook
  </button>
</div>
<div className="flex justify-center mt-3">
  <button type="submit" className="btn px-60 py-3 text-lg bg-green-500">
    Login Google
  </button>
</div>


      </form>
    </div>
  );
}
