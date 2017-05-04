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

import AccountAPI from "../api/AccountAPI";
import AppDispatcher from "../../platform/dispatcher/AppDispatcher";
import LoginActionTypes from "../constants/LoginActionTypes";
import OAuthOptionsActionTypes from "../constants/OAuthOptionsActionTypes";

/**
 * Login actions.
 */
const LoginActions = {

    /**
     * Login a user using OAuth.
     * @param {string} service Name of the OAuth service.
     * @param {string} code OAuth code returned by the service.
     * @param {function} onLoggedIn Callback to be called once login is done.
     */
    async loginOAuth(service, code, onLoggedIn) {
        const result = await AccountAPI.loginOAuth(service, code);
        localStorage.setItem("token", result.token);
        AppDispatcher.dispatch({
            type: LoginActionTypes.LOGIN,
            user: result,
        });
        onLoggedIn(result.user_id);
    },

    /**
     * Login a user using the session token.
     * @param {function} onLoggedIn Callback to be called once login is done.
     * @param {function} onFail Callback to be called on error.
     */
    async loginToken(onLoggedIn, onFail) {
        try {
            const result = await AccountAPI.loginToken(
                localStorage.getItem("token"));
            AppDispatcher.dispatch({
                type: LoginActionTypes.LOGIN,
                user: result,
            });
            onLoggedIn(result.user_id);
        } catch (error) {
            onFail(error);
        }
    },

    /**
     * Get the list of OAuth options availabes in the back-end.
     */
    async getOAuthOptions() {
        const result = await AccountAPI.getOAuthOptions();
        AppDispatcher.dispatch({
            type: OAuthOptionsActionTypes.REFRESH,
            oauth: result,
        });
    },
};

export default LoginActions;
