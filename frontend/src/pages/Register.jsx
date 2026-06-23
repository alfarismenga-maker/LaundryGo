import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
email: "",
password: "",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleRegister = async () => {
try {
await axios.post(
"https://energetic-delight-production.up.railway.app/api/auth/register",
form
);


  alert("Register berhasil");

  navigate("/login");
} catch (error) {
  alert(
    error.response?.data?.message ||
    "Register gagal"
  );
}


};

return ( <div className="min-h-screen bg-slate-900 flex justify-center items-center"> <div className="bg-slate-800 p-8 rounded-xl w-96"> <h1 className="text-white text-3xl font-bold mb-6 text-center">
Register LaundryGo </h1>


    <input
  type="text"
  name="name"
  placeholder="Nama Lengkap"
  className="w-full p-3 mb-4 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
  onChange={handleChange}
/>

<input
  type="email"
  name="email"
  placeholder="Email"
  className="w-full p-3 mb-4 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
  onChange={handleChange}
/>

<input
  type="password"
  name="password"
  placeholder="Password"
  className="w-full p-3 mb-4 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500"
  onChange={handleChange}
/>

    <button
      onClick={handleRegister}
      className="w-full bg-green-500 text-white p-3 rounded"
    >
      Daftar
    </button>

    <p className="text-gray-300 mt-4 text-center">
      Sudah punya akun?
      <Link
        to="/login"
        className="text-blue-400 ml-2"
      >
        Login
      </Link>
    </p>
  </div>
</div>


);
}

export default Register;
