import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import AlertComponent from "../layout/AlertComponent";
import NavbarComponent from "../dashboard/NavbarComponent";
import StudentRegistration from "../dashboard/StudentRegistration";
import StudentView from "../dashboard/StudentView";
import PrivateRoute from "../routing/PrivateRoute";

const Routes = (props) => {
  return (
    <div className="container">
      <AlertComponent></AlertComponent>
      {/* <NavbarComponent></NavbarComponent> */}
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={StudentRegistration} />
        <PrivateRoute exact path="/students" component={StudentView} />
      </Switch>
    </div>
  );
};

export default Routes;
