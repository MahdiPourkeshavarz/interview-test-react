import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/store";

export function Header() {
  const { clearStore } = useStore();
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  function handleLogout() {
    clearStore();
    navigate("/");
  }

  return (
    <header className="bg-gray-300 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-9">
          <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center">
            <img src="./logo.png" alt="quiz" />
          </div>
          {token && (
            <div
              className="flex w-10 h-10 items-center cursor-pointer hover:bg-slate-400/60 p-1 hover:rounded-full"
              title="Logout"
            >
              <img src="./Logout.png" alt="logout" onClick={handleLogout} />
            </div>
          )}
        </div>

        <nav className="space-x-4">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                : "text-black hover:text-blue-500"
            }
          >
            Home
          </NavLink>

          <NavLink
            to={"/admin"}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                : "text-black hover:text-blue-500"
            }
          >
            Admin Panel
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
