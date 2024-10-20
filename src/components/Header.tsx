import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <img src="./logo.png" alt="quiz" />
          </div>
        </div>

        <nav className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-500 pb-1"
                : "text-white hover:text-blue-500"
            }
          >
            Admin Panel
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
