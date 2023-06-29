import React from "react";
import "./login.css";
import { useState } from "react";

const Login = () => {
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [loading, setLoading] = useState(false);

  const roleHandler = (role) => {
    console.log(role);
    setRole(role);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const value = {
      email: email,
      password: password,
      role: role,
    };
    console.log(value);
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const user = await response.json();
    console.log(user);
    if (user == "wrong password or username") {
      alert("wrong password or username");
      setLoading(false);
    } else if (user == "Not a valid user!!!") {
      alert("Not a valid user!!!");
      setLoading(false);
    } else {
      localStorage.setItem("EMSuser", JSON.stringify(user));
      setLoading(false);
      window.location.href = "/home";
    }
  };

  return (
    <div
      // style={{
      //   backgroundImage: "url(" + GIf + ")",
      //   backgroundSize: "cover",
      //   height: "120vh",
      //   backgroundPosition: "center",
      // }}
      className="LoginBack"
    >
      <div className="logoinDiv">
        <div className="login">
          <div className="chooseAccountType">Choose Account Type</div>

          <div className="userIcon">
            <div>
              <div className="admin" onClick={() => roleHandler("admin")}>
                <img
                  className="img1"
                  src="https://img.icons8.com/ios-filled/100/null/admin-settings-male.png"
                />
                Admin
              </div>
              {role === "admin" ? (
                <img
                  className="tick"
                  src="https://img.icons8.com/ios-glyphs/30/null/checked.png"
                />
              ) : (
                ""
              )}
            </div>

            <div>
              <div className="user" onClick={() => roleHandler("user")}>
                <img
                  className="img1"
                  src="https://img.icons8.com/ios-filled/100/null/user.png"
                />
                Employee
              </div>
              {role === "user" ? (
                <img
                  className="tick"
                  src="https://img.icons8.com/ios-glyphs/30/null/checked.png"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <p>
            Hello!{" "}
            {role === "admin" ? "Admin" : role === "user" ? "Employee" : "User"}
            ,
          </p>
          <p>Please fill out login details to get started.</p>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <button type="submit" className="">
              {
                loading ?
                <div class="spinner-border" role="status" style={{ 'height': '30px' }} >
                  <span class="visually-hidden">Loading...</span>
                </div> : 'Submit'
              }
              </button>

            </div>

          </form>
        </div>
        <div className="laptop">
          <img src="Image/login1.gif" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
