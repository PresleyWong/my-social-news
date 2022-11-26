import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const { state } = useLocation();

  const handleSubmit = async (e, redirect) => {
    e.preventDefault();
    try {
      const user = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials(user));
      if (state) navigate(state.from.pathname);
      else navigate("/");
    } catch (err) {
      alert(err.data.message);
    }
  };

  let content = "";

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <form onSubmit={(e) => handleSubmit(e, state)}>
          <div className="mb-3 mt-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="pswd"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <small>
              <p>Hint: nloiterton8, HTQxxXV9Bq4</p>
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }

  return content;
};

export default Login;
