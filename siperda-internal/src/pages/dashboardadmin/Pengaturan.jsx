import { useState } from "react";
import { FiUser, FiMail, FiLock, FiSave, FiLogOut } from "react-icons/fi";

function Pengaturan() {
  const [form, setForm] = useState({
    nama: "Admin Inspektorat",
    nip: "1001",
    email: "admin@gmail.com",
    unit_kerja: "Inspektorat",
    role: "Admin",
  });

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleProfile = (e) => {
    e.preventDefault();

    alert("Profil berhasil diperbarui");
  };

  const handlePassword = (e) => {
    e.preventDefault();

    if (password.new_password !== password.confirm_password) {
      return alert("Konfirmasi password tidak sesuai");
    }

    alert("Password berhasil diperbarui");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Pengaturan</h1>

        <p className="text-slate-500 mt-2">Kelola akun administrator sistem.</p>
      </div>

      {/* PROFIL */}
      <div className="bg-white rounded-3xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Profil Admin</h2>
        </div>

        <form onSubmit={handleProfile} className="p-6 grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-slate-500">Nama</label>

            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                value={form.nama}
                className="w-full border rounded-2xl pl-12 p-4"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">NIP</label>

            <input
              type="text"
              value={form.nip}
              className="w-full border rounded-2xl p-4 mt-2"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Email</label>

            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-4 text-slate-400" />

              <input
                type="email"
                value={form.email}
                className="w-full border rounded-2xl pl-12 p-4"
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">Unit Kerja</label>

            <input
              type="text"
              value={form.unit_kerja}
              className="w-full border rounded-2xl p-4 mt-2"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm text-slate-500">Role</label>

            <input
              type="text"
              value={form.role}
              className="w-full border rounded-2xl p-4 mt-2"
              readOnly
            />
          </div>
        </form>
      </div>

      {/* PASSWORD */}
      <div className="bg-white rounded-3xl border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Ubah Password</h2>
        </div>

        <form onSubmit={handlePassword} className="p-6 grid grid-cols-3 gap-5">
          <div>
            <label className="text-sm text-slate-500">Password Lama</label>

            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-4 text-slate-400" />

              <input
                type="password"
                value={password.old_password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    old_password: e.target.value,
                  })
                }
                className="w-full border rounded-2xl pl-12 p-4"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">Password Baru</label>

            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-4 text-slate-400" />

              <input
                type="password"
                value={password.new_password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    new_password: e.target.value,
                  })
                }
                className="w-full border rounded-2xl pl-12 p-4"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">
              Konfirmasi Password
            </label>

            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-4 text-slate-400" />

              <input
                type="password"
                value={password.confirm_password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirm_password: e.target.value,
                  })
                }
                className="w-full border rounded-2xl pl-12 p-4"
              />
            </div>
          </div>

          <div className="col-span-3">
            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-2xl
                flex
                items-center
                gap-2
              "
            >
              <FiSave />
              Simpan Password
            </button>
          </div>
        </form>
      </div>

      {/* INFO */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Sistem</h2>

        <div className="space-y-2 text-slate-600">
          <p>SIPERDA INTERNAL</p>
          <p>Versi 1.0</p>
          <p>Laravel + React + MySQL</p>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <button
          onClick={handleLogout}
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-6
            py-3
            rounded-2xl
            flex
            items-center
            gap-2
          "
        >
          <FiLogOut />
          Keluar dari Sistem
        </button>
      </div>
    </div>
  );
}

export default Pengaturan;
