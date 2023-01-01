import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";
import { ProgressBar } from "react-loader-spinner";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        process.env.REACT_APP_LOGIN || "http://localhost:8080/api/auth";
      setLoading(true);
      const { data: res } = await axios.post(url, data);
      setLoading(false);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      setLoading(false);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="login_container">
        <div className="login_form_container">
          <div className="left">
            <form className="form_container" onSubmit={handleSubmit}>
              <h1>
                Login to Your <span>Account</span>
              </h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className="input"
              />
              {error && <div className="error_msg">{error}</div>}
              {loading && (
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#F4442E"
                  barColor="#51E5FF"
                />
              )}
              <button type="submit" className="signin">
                Sign In
              </button>
            </form>
            <div className="signup-div">
              <h1>New Here ?</h1>
              <Link to="/signup">
                <button type="button" className="signup">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
