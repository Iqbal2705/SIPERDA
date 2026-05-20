import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

/* LAYOUT */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import DashboardAdminLayout from "./layouts/DashboardAdminLayout";
import DashboardPimpinanLayout from "./layouts/DashboardPimpinanLayout";

/* PAGES */
const Home = lazy(() => import("./pages/Home"));

const Informasi = lazy(() => import("./pages/Informasi"));

const Tentang = lazy(() => import("./pages/Tentang"));

const Login = lazy(() => import("./pages/Login"));

const Signup = lazy(() => import("./pages/Signup"));

/* ADMIN */
const DashboardAdmin = lazy(
  () => import("./pages/dashboardadmin/DashboardAdmin"),
);

/* PIMPINAN */
const DashboardPimpinan = lazy(
  () => import("./pages/dashboardpimpinan/DashboardPimpinan"),
);

/* 404 */
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="h-screen flex justify-center items-center text-3xl">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* MAIN */}
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

          {/* ADMIN */}
          <Route element={<DashboardAdminLayout />}>
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          </Route>

          {/* PIMPINAN */}
          <Route element={<DashboardPimpinanLayout />}>
            <Route path="/dashboard-pimpinan" element={<DashboardPimpinan />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
