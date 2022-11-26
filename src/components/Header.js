import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../redux/features/auth/authSlice";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/posts/search?q=${keyword}`);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearCredentials());
    navigate("/");
  };

  const LogoutLink = () => {
    let output = "";
    if (currentUser) {
      output = (
        <li className="nav-item">
          <Link className="nav-link" to="#" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      );
    } else {
      output = (
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      );
    }
    return output;
  };

  const content = (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/posts`}>
                    {" "}
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <LogoutLink />
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Search
                  </button>
                </form>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );

  return content;
};

export default Header;
