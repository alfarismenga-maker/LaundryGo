import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../lib/api";

function Login() {
const navigate = useNavigate();

const [form, setForm] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleLogin = async () => {
try {
const res = await api.post("/api/auth/login", form);


  localStorage.setItem(
    "token",
    res.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  alert("Login berhasil");

  if (res.data.user.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/dashboard");
  }

} catch (error) {
  alert(
    error.response?.data?.message ||
    "Login gagal"
  );
}


};

return ( <div className="min-h-screen bg-slate-900 flex justify-center items-center">


  <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-xl">

    <h1 className="text-white text-3xl font-bold mb-6 text-center">
      Login LaundryGo
    </h1>
<input
  type="email"
  name="email"
  placeholder="Email"
  className="w-full p-3 mb-4 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={handleChange}
/>

  <input
  type="password"
  name="password"
  placeholder="Password"
  className="w-full p-3 mb-4 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={handleChange}
/>

    <button
      onClick={handleLogin}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
    >
      Login
    </button>

    <p className="text-gray-300 mt-4 text-center">
      Belum punya akun?

      <Link
        to="/register"
        className="text-blue-400 ml-2"
      >
        Register
      </Link>
    </p>

  </div>

</div>


);
}

export default Login;
