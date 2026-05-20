import { FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser({ nip, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      if (response.user.role === "admin") {
        navigate("/dashboard-admin");
      } else if (response.user.role === "pimpinan") {
        navigate("/dashboard-pimpinan");
      } else {
        navigate("/dashboard-pelapor");
      }
    } catch {
      alert("NIP atau Password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-10"
      style={{ backgroundImage: "url('/bg-pekanbaru.jpg')" }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* login card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-7 shadow-2xl"
      >
        {/* icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <FiLock className="text-4xl text-cyan-300" />
          </div>
        </div>

        {/* title */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            SIPERDA-
            <br />
            INTERNAL
          </h1>

          <p className="text-gray-200 text-sm mt-3">
            Sistem Informasi Pelaporan Pelanggaran Disiplin Pegawai
          </p>

          <h2 className="text-2xl font-bold text-white mt-6">Selamat Datang</h2>

          <p className="text-gray-300 text-sm mt-1">
            Silakan login untuk melanjutkan
          </p>
        </div>

        {/* input */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="text"
              placeholder="Masukkan NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>
        </div>

        {/* option */}
        <div className="flex justify-between text-sm text-gray-200 mt-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Ingat saya
          </label>

          <button type="button" className="hover:text-cyan-300">
            Lupa Password?
          </button>
        </div>

        {/* button */}
        <button
          disabled={loading}
          className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition"
        >
          {loading ? "Loading..." : "Login"}
          <FiArrowRight />
        </button>

        {/* signup */}
        <p className="text-center text-gray-200 text-sm mt-5">
          Belum punya akun?
          <Link to="/signup" className="ml-2 text-cyan-300 font-semibold">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
