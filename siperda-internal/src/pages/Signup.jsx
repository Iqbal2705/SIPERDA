import {
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { registerUser } from "../services/authService";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",

    nip: "",

    unit_kerja: "",

    role: "pegawai",

    email: "",

    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerUser(form);

      alert("Registrasi berhasil");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-10"
      style={{
        backgroundImage: "url('/bg-pekanbaru.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* card */}
      <form
        onSubmit={handleSignup}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-7 shadow-2xl"
      >
        {/* icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <FiUser className="text-4xl text-cyan-300" />
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

          <h2 className="text-2xl font-bold text-white mt-6">SignUp</h2>

          <p className="text-gray-300 text-sm mt-1">
            Buat akun untuk melanjutkan
          </p>
        </div>

        {/* input */}
        <div className="mt-6 space-y-4">
          {/* NAMA */}
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* NIP */}
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="text"
              name="nip"
              placeholder="NIP"
              value={form.nip}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* UNIT KERJA */}
          <div className="relative">
            <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="text"
              name="unit_kerja"
              placeholder="Unit Kerja"
              value={form.unit_kerja}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 px-4 text-white outline-none focus:border-cyan-400"
          >
            <option value="pegawai" className="text-black">
              Pegawai
            </option>

            <option value="admin" className="text-black">
              Admin
            </option>

            <option value="pimpinan" className="text-black">
              Pimpinan
            </option>
          </select>

          {/* EMAIL */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xl" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-14 rounded-2xl bg-white/15 border border-white/20 pl-14 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
              required
            />
          </div>
        </div>

        {/* button */}
        <button
          disabled={loading}
          className="w-full h-14 mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition"
        >
          {loading ? "Loading..." : "Daftar"}

          <FiArrowRight />
        </button>

        {/* login */}
        <p className="text-center text-gray-200 text-sm mt-5">
          Sudah punya akun?
          <Link to="/login" className="ml-2 text-cyan-300 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
