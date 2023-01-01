import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        process.env.REACT_APP_SIGNUP || "http://localhost:8080/api/users";
      setLoading(true);
      const { data: res } = await axios.post(url, data);
      setLoading(false);
      navigate("/login");
      console.log(res.message);
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
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                required
                className="input"
              />
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
                Sign Up
              </button>
            </form>
            <div className="signup-div">
              <h1>Welcome Back</h1>
              <Link to="/login">
                <button type="button" className="signup">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
