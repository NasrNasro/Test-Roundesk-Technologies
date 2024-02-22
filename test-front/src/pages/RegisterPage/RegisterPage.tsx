import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserService } from "features/user/hooks";
import { ToastContainer } from "react-toastify";

interface FormData {
  username: string;
  password: string;
  profile: string;
}

function RegisterPage() {
  const { registerUser } = useUserService();
  const [data, setData] = useState<FormData>({
    username: "",
    password: "",
    profile: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState<FormData>();
  const validateForm = (): boolean => {
    let formErrors: FormData = { username: "", password: "", profile: "" };
    let isValid = true;
    if (!data?.username?.trim()) {
      formErrors.username = "Username is required";
      isValid = false;
    }
    if (!data?.password?.trim()) {
      formErrors.password = "Password is required";
      isValid = false;
    }
    if (!data?.profile) {
      formErrors.profile = "Profile selection is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      registerUser(data);
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
                <h3 className="fw-bold">Sign Up</h3>
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
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    value={data?.profile}
                    onChange={(e) =>
                      setData((prevData) => ({
                        ...prevData,
                        profile: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select your profile</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                  {errors?.profile && (
                    <div className="text-danger w-100">{errors.profile}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 mb-3"
                >
                  Register
                </button>
              </form>
              <div className="text-center">
                <small>
                  Have an account ?
                  <Link to="/login" className="fw-bold ms-2">
                    Sign In
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

export default RegisterPage;
