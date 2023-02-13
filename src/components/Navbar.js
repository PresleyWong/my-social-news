import { Link } from "react-router-dom";
import Searchbox from "./Searchbox";

const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between sm:px-4 items-center py-2 bg-gray-100 text-gray-500">
      <ul className="navbar-nav flex flex-col list-style-none sm:flex-row sm:gap-x-4">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
            to={`/posts`}
          >
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </ul>
      <Searchbox />
    </nav>
  );
};

export default Navbar;
