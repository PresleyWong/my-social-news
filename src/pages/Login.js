import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/features/auth/authSlice";
import Spinner from "../components/Spinner";
import { useLoginMutation } from "../redux/api/authApi";

const Login = () => {
  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();
  const { state } = useLocation();

  const handleSubmit = async (e, redirect) => {
    e.preventDefault();
    try {
      const user = await login({
        username: refUsername.current.value,
        password: refPassword.current.value,
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
      <div class="block p-6 rounded-lg shadow-xl bg-white">
        <form onSubmit={(e) => handleSubmit(e, state)}>
          <div className="form-floating mb-3 xl:w-96">
            <input
              type="text"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingInput"
              placeholder="nloiterton8"
              ref={refUsername}
            />
            <label for="floatingInput" className="text-gray-700">
              Username
            </label>
          </div>
          <div className="form-floating mb-3 xl:w-96">
            <input
              type="password"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="floatingPassword"
              placeholder="Password"
              ref={refPassword}
            />
            <label for="floatingPassword" className="text-gray-700">
              Password
            </label>
          </div>

          <p>Hint: nloiterton8, HTQxxXV9Bq4</p>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <div className="flex justify-center">{content}</div>;
};

export default Login;
