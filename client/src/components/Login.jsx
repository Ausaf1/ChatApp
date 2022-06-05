import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from "../store/types/authType";

export const Login = () => {
  let navigate = useNavigate();
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      // convert error to array
      const errorArray = Object.values(error);
      // eslint-disable-next-line array-callback-return
      errorArray.map((error) => {
        alert.error(error);
        dispatch({ type: ERROR_CLEAR });
      });
    }
  }, [authenticate, successMessage, error, alert, dispatch, navigate]);

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">User Name</label>
              <input
                onChange={inputHandle}
                value={state.email}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <input type="submit" value="login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/register">Register your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
