import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import AlertComponent from "../layout/AlertComponent";
import NavbarComponent from "../dashboard/NavbarComponent";
import StudentRegistration from "../dashboard/StudentRegistration";
import StudentView from "../dashboard/StudentView";
import PrivateRoute from "../routing/PrivateRoute";
import { useSelector } from "react-redux";
import Register from "../auth/Register";

const Routes = (props) => {
  const state = useSelector((state) => ({
    auth: state.authReducer.isAuthenticated,
  }));
  return (
    <div className="container">
      <AlertComponent></AlertComponent>
      {state.auth && <NavbarComponent></NavbarComponent>}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={StudentRegistration} />
        <PrivateRoute exact path="/students" component={StudentView} />
      </Switch>
    </div>
  );
};

export default Routes;
