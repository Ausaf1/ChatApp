import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../sass/components/_register.scss";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from "../store/types/authType";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const alert = useAlert();
  const { loading, successMessage, error, authenticate, myInfo } = useSelector(
    (state) => state.auth
  );
  console.log(myInfo);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { username, email, password, confirmPassword, image } = state;
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegister(formData));

    // console.log(state);
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
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                onChange={inputHandle}
                name="username"
                value={state.username}
                className="form-control"
                id="username"
                placeholder="Enter User Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={inputHandle}
                name="email"
                value={state.email}
                className="form-control"
                id="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={inputHandle}
                name="password"
                value={state.password}
                className="form-control"
                id="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                onChange={inputHandle}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  {loadImage ? <img src={loadImage} /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={fileHandle}
                    name="image"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/login">Login To Your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;