import { Link } from "@tanstack/react-router";
import { getAuthToken } from "../../utils/auth";

function Navbar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        {/* Navbar Start */}
        <div className="navbar-start ">
          {/* Dropdown for Mobile View */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/resume">Resume</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                {getAuthToken() && <Link to="/dashboard">Dashboard</Link>}
              </li>
            </ul>
          </div>
          {/* Brand Name */}
          <Link to="/" className="md:text-xl font-medium md:px-5">
            Samiul Karim Prodhan
          </Link>
        </div>

        {/* Navbar End (Hidden in Mobile View, Visible in Large Screens) */}
        <div className="navbar-end hidden lg:flex px-5">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>{getAuthToken() && <Link to="/dashboard">Dashboard</Link>}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
