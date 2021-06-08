import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export const APP_BAR_HEIGHT = "4.5rem";

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky inset-0">
      <nav
        className="bg-green-300 px-4 py-2 flex items-center justify-between"
        style={{ height: APP_BAR_HEIGHT }}
      >
        <Link
          to="/"
          className={`text-4xl font-bold ${linkCss(pathname === "/")}`}
        >
          Home
        </Link>

        <div className="space-x-4">
          <Link
            to="/about"
            className={`text-2xl ${linkCss(pathname === "/about")}`}
          >
            About
          </Link>

          <Link
            to="/team"
            className={`text-2xl ${linkCss(pathname.includes("/team"))}`}
          >
            Team
          </Link>
        </div>
      </nav>
    </header>
  );
}

function linkCss(currentPage: boolean) {
  return clsx(
    currentPage ? "text-blue-700" : "text-gray-800",
    "hover:text-blue-500"
  );
}
