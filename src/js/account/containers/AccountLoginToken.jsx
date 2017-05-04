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

import LoginActions from "../actions/LoginActions";
import LoginLayout from "../components/LoginLayout";
import NotificationActions from "../actions/NotificationActions";
import React from "react";

/**
 * Container to show when the user is performing a login using a token.
 */
export default class AccountLoginToken extends React.Component {
    onLogedIn(userID) {
        NotificationActions.subscribeNotificationsUser(userID);
        NotificationActions.getAllNotifications();

        const {from} =
            this.props.location.state || {from: {pathname: "/account/"}};
        this.props.history.push(from);
    }
    onFail() {
        this.props.history.push("/login/");
    }
    componentDidMount() {
        LoginActions.loginToken(
            (userID) => this.onLogedIn(userID),
            () => this.onFail());
    }
    render() {
        return <LoginLayout>
            <i aria-hidden="true" className="fa fa-user text-center"
                style={{"fontSize": "128px", "width": "100%"}} />
            <p className="login-box-msg">
                Login in using stored session
            </p>
            <i aria-hidden="true" className="fa fa-spin fa-refresh text-center"
                style={{"fontSize": "64px", "width": "100%"}} />
        </LoginLayout>;
    }
}
