import React from "react";
import axiosCalls from "../../services/axiosCalls";
import NavBar from "../Navbar";
import Error from "../Error";
import "../../styles/Registration.css";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/index.js";
import { useHistory } from "react-router-dom";
import HidenNav from '../HidenNav';

const Registration = () => {
  let history = useHistory();

  const dispatch = useDispatch();

  const [userForm, useUserForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, useError] = React.useState({
    value: false,
    data: "",
  });

  const SetError = (value, data) => {
    useError({
      value: value,
      data: data,
    });
  };

  const HandleForm = (e) => {
    useUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password, passwordConfirmation, name, phone } = userForm;

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirmation.trim() === "" ||
      name.trim() === "" ||
      phone.trim() === ""
    ) {
      SetError(true, "empty field");
      return;
    } else if (password.length < 6) {
      SetError(true, "password need to have 6 characters");
      return;
    } else if (password !== passwordConfirmation) {
      SetError(true, "passwords don't match");
      return;
    } else {
      SetError(false, "");
    }

    axiosCalls.signUp(email, password, passwordConfirmation, phone, name)
      .then((response) => {
        if (response.data.status === "created") {
          dispatch(LogIn(response.data.user));
          history.push("/dashboard");
        } else {
          const data = response.data.error;
          const keys = Object.keys(data);
          const errorMessage = keys.map((key) => {
            return key + " " + data[key].toString();
          });
          SetError(true, errorMessage);
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="d-sm-none"><HidenNav/></div>
      <NavBar option={"signup"} />
      <div className="float-right SignupContainer">
        <h1 className="SignupTile text-center">Sign Up</h1>
        <h3 className="SignupSubTile text-center">
          Create your account to request and manage your appointments.
        </h3>

        <div className="d-flex flex-column flex-sm-row">
          <div className="col-12 col-sm-6">
            <form onSubmit={HandleSubmit} className="mx-4">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={HandleForm}
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  onChange={HandleForm}
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={phone}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  onChange={HandleForm}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={HandleForm}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  required
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <input
                  onChange={HandleForm}
                  type="password"
                  className="form-control"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  required
                  minLength="6"
                />
              </div>

              <div>
                <button
                data-testid="SubmitSignButton"
                  type="submit"
                  className="btnSubmit rounded-pill py-1 px-3 mr-3"
                >
                  Submit
                </button>
                {error.value ? <Error error={error.data} /> : null}
              </div>
            </form>
          </div>
          
          <div className="col-12 col-sm-6">
           <div className="dogImageContainer mx-auto mx-sm-0"></div> 
          </div>


          
        </div>
      </div>
    </div>
  );
};

export default Registration;
