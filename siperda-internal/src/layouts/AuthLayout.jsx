import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg-pekanbaru.jpg')",
      }}
    >
      <div className="bg-black/30 min-h-screen w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
