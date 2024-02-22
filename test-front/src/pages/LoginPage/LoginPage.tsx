import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useUserService } from "features/user/hooks";
import { ToastContainer } from "react-toastify";

interface FormData {
  username: string;
  password: string;
}

function LoginPage() {
  const { loginUser } = useUserService();
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState<FormData>();
  const validateForm = (): boolean => {
    let formErrors: FormData = { username: "", password: "" };
    let isValid = true;
    if (!data?.username?.trim()) {
      formErrors.username = "Username is required";
      isValid = false;
    }
    if (!data?.password?.trim()) {
      formErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser(data);
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="row vh-100 g-0">
        <div className="col-lg-6 position-relative d-none d-lg-block">
          <div
            className="bg-holder"
            style={{ backgroundImage: "url(images/bg.jpg)" }}
          ></div>
        </div>
        <div className="col-lg-6">
          <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
            <div className="col col-sm-6 col-lg-7 col-xl-6">
              <div className="text-center mb-5">
                <h3 className="fw-bold">Sign In</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg fs-6"
                    placeholder="Username"
                    name="username"
                    value={data?.username}
                    onChange={handleChange}
                  />
                  {errors?.username && (
                    <div className="text-danger w-100">{errors.username}</div>
                  )}
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-lock-alt"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control form-control-lg fs-6"
                    placeholder="Password"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                  />
                  {errors?.password && (
                    <div className="text-danger w-100">{errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 mb-3"
                >
                  Login
                </button>
              </form>
              <div className="text-center">
                <small>
                  Don't have account ?
                  <Link to="/" className="fw-bold ms-2">
                    Sign Up
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
