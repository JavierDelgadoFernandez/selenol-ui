/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Redirect, Route, BrowserRouter as Router, Switch} from
"react-router-dom";
import AccountGeneral from "../account/containers/AccountGeneral";
import AccountGroup from "../account/containers/AccountGroup";
import AccountGroups from "../account/containers/AccountGroups";
import AccountHome from "../account/containers/AccountHome";
import AccountLogin from "../account/containers/AccountLogin";
import AccountLoginOAuthGitHub from
"../account/containers/AccountLoginOAuthGitHub";
import AccountLoginToken from "../account/containers/AccountLoginToken";
import AccountNotification from "../account/containers/AccountNotification";
import AccountUser from "../account/containers/AccountUser";
import AccountUsers from "../account/containers/AccountUsers";
import HomeHome from "../home/components/HomeHome";
import LoginStore from "../account/stores/LoginStore";
import React from "react";
import ReactDOM from "react-dom";

/**
 * Check the login user to render the actual component or to redirect the user
 * to the login page.
 */
const PrivateRoute = ({component, ...rest}) => (
  <Route {...rest} render={props => (
    LoginStore.getState().role !== "guest" ? (
        React.createElement(component, {...props})
    ) : (
        localStorage.getItem("token") ?
            <Redirect to={{
                pathname: "/login/token/",
                state: {from: props.location},
            }}/> :
            <Redirect to={{
                pathname: "/login/",
                state: {from: props.location},
            }}/>
    )
  )}/>
);

/**
 * Routing.
 */
ReactDOM.render(
    <Router>
        <Switch>
            <Route component={HomeHome} exact path="/" />
            <Route component={HomeHome} exact path="/home/" />
            <Route component={HomeHome} exact path="/home/home/" />
            <Route component={AccountHome} exact path="/account/" />
            <Route component={AccountHome} exact path="/account/home/" />
            <PrivateRoute component={AccountGeneral} exact
                path="/account/general/" />
            <PrivateRoute component={AccountUsers} exact
                path="/account/users/" />
            <PrivateRoute component={AccountUser} exact
                path="/account/users/:userID/" />
            <PrivateRoute component={AccountGroups} exact
                path="/account/groups/" />
            <PrivateRoute component={AccountGroup} exact
                path="/account/groups/:groupID/" />
            <PrivateRoute component={AccountNotification} exact
                path="/account/notification/" />
            <Route component={AccountLogin} exact path="/login/" />
            <Route component={AccountLoginToken} exact path="/login/token/" />
            <Route component={AccountLoginOAuthGitHub} exact
                path="/login/oauth/github/" />
        </Switch>
    </Router>,
    document.getElementById("application")
);
