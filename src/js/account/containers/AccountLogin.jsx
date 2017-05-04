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

import {Container} from "flux/utils";
import LoginActions from "../actions/LoginActions";
import LoginLayout from "../components/LoginLayout";
import OAuthOptionsStore from "../stores/OAuthOptionsStore";
import React from "react";

/**
 * Container to show the most generic view for login.
 */
class AccountLogin extends React.Component {
    static getStores() {
        return [OAuthOptionsStore];
    }
    static calculateState() {
        return {oauth: OAuthOptionsStore.getState()};
    }
    componentDidMount() {
        LoginActions.getOAuthOptions();
    }
    render() {
        return <LoginLayout>
            <p className="login-box-msg">
                Sign in to start your session
            </p>
            <div className="social-auth-links text-center">
                {
                    this.state.oauth.toArray().map(o =>
                        <a className={`btn btn-block btn-social btn-flat btn-${
                            o.name.toLowerCase()}`} href={o.request_url}
                            key={o.name}>
                            <i className={`fa fa-${o.name.toLowerCase()}`} />
                            {`Sign in using ${o.name}`}
                        </a>
                    )
                }
            </div>
        </LoginLayout>;
    }
}

export default Container.create(AccountLogin);
