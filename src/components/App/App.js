import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setCurrentUser, logoutUser } from "../../store/actions";
import { Provider } from "react-redux";
import setAuthToken from "../../setAuthToken";
import store from "../../store";
import jwt_decode from "jwt-decode";
import * as ROUTES from "../../constants/routes";
import { ROUTE_CONSTANTS } from "../../constants/routepath";
import LandingPage from "../Landing/Landing";
import HomePage from "../Home/Home";
import Profile from "../Profile/Profile";
import UserDetails from "../UserDetails/UsersDetails";
import EditProfilePage from "../EditProfile/EditProfile";
import Dashboard from "../Dashboard/Dashboard";
import { Protected } from "../../Protected";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = ROUTES.LANDING;
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/">
            <Redirect to={ROUTES.LANDING} />
          </Route>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Protected path={ROUTES.HOME} component={HomePage} />
          <Protected path={ROUTES.PROFILE} component={Profile} />
          <Protected path={ROUTES.EDIT_PROFILE} component={EditProfilePage} />
          <Protected path="/user/:id" component={UserDetails} />
          <Protected
            path={ROUTE_CONSTANTS.DASHBOARD_ROUTE}
            component={Dashboard}
          />
        </Router>
      </Provider>
    );
  }
}

export default App;
