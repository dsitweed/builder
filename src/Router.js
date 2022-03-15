import React, { lazy } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./history";
import Wrapper from "./components/Wrapper";

const builder = lazy(() => import("./pages/builder"));
const preview = lazy(() => import("./pages/preview"));
const shareCv = lazy(() => import("./pages/share-cv"));

// ??? Khong hieu
const RouteConfig = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <Wrapper {...props} pathname={rest.location.pathname}>
          <Component {...props} />
        </Wrapper>
      );
    }}
  />
);

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <RouteConfig exact path="/app/builder" component={builder} />
        <RouteConfig exact path="/app/preview" component={preview} />
        <RouteConfig exact path="/app/share-cv" component={shareCv} />
        <Redirect exact from="/" to="/app/builder" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
