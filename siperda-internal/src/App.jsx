import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/* LAYOUT */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardAdminLayout from "./layouts/DashboardAdminLayout";
import DashboardPimpinanLayout from "./layouts/DashboardPimpinanLayout";

/* MAIN */
const Home = lazy(() => import("./pages/Home"));
const Informasi = lazy(() => import("./pages/Informasi"));
const Tentang = lazy(() => import("./pages/Tentang"));

/* AUTH */
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

/* PELAPOR */
const FormLaporan = lazy(() => import("./pages/FormLaporan"));
const RiwayatLaporan = lazy(() => import("./pages/RiwayatLaporan"));

/* ADMIN */
const DashboardAdmin = lazy(
  () => import("./pages/dashboardadmin/DashboardAdmin")
);

const LaporanMasuk = lazy(
  () => import("./pages/dashboardadmin/LaporanMasuk")
);

const DetailLaporan = lazy(
  () => import("./pages/dashboardadmin/DetailLaporan")
);

const RiwayatLaporanAdmin = lazy(
  () => import("./pages/dashboardadmin/RiwayatLaporan")
);

const Pengaturan = lazy(
  () => import("./pages/dashboardadmin/Pengaturan")
);

/* PIMPINAN */
const DashboardPimpinan = lazy(
  () => import("./pages/dashboardpimpinan/DashboardPimpinan")
);

/* 404 */
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-slate-100">
            <h1 className="text-2xl font-semibold text-blue-700">
              Loading...
            </h1>
          </div>
        }
      >
        <Routes>
          {/* PUBLIC */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/informasi" element={<Informasi />} />
            <Route path="/tentang" element={<Tentang />} />
          </Route>

          {/* AUTH */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* PELAPOR */}
          <Route path="/lapor" element={<FormLaporan />} />
          <Route path="/riwayat" element={<RiwayatLaporan />} />

          {/* ADMIN / STAF INSPEKTORAT */}
          <Route element={<DashboardAdminLayout />}>
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />

            <Route
              path="/dashboard-admin/laporan-masuk"
              element={<LaporanMasuk />}
            />

            <Route
              path="/dashboard-admin/detail-laporan/:id"
              element={<DetailLaporan />}
            />

            <Route
              path="/dashboard-admin/riwayat-laporan"
              element={<RiwayatLaporanAdmin />}
            />

            <Route
              path="/dashboard-admin/pengaturan"
              element={<Pengaturan />}
            />
          </Route>

          {/* PIMPINAN */}
          <Route element={<DashboardPimpinanLayout />}>
            <Route
              path="/dashboard-pimpinan"
              element={<DashboardPimpinan />}
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;