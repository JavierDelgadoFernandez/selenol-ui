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

import "../../../css/main.less";
import {Container} from "flux/utils";
import {Link} from "react-router-dom";
import Menu from "./Menu";
import NotificationStore from "../../account/stores/NotificationStore";
import React from "react";

/**
 * Base application template.
 */
class App extends React.Component {
    static getStores() {
        return [
            NotificationStore,
        ];
    }

    static calculateState() {
        return {notifications: NotificationStore.getState().toArray()};
    }
    render() {
        return <div style={{
            minHeight: "100%", position: "absolute", width: "100%",
            backgroundColor: "#ecf0f5",
        }}>
            <header className="main-header">
                    <Link className="logo" to="/">
                            <span className="logo-mini"><b>S</b>elenol</span>
                            <span className="logo-lg"><b>S</b>elenol</span>
                    </Link>
                    <nav className="navbar navbar-static-top">
                            <Menu notifications={this.state.notifications} />
                    </nav>
            </header>
            { this.props.children }
        </div>;
    }
}

export default Container.create(App, {withProps: true});
