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

import {Link} from "react-router-dom";
import React from "react";

/**
 * Sidebar component that is common to all the Account views.
 */
export default function AccountSidebar() {
    return <section className="sidebar" style={{height: "auto"}}>
        <ul className="sidebar-menu">
            <li className="header">Settings</li>
            <li>
                <Link to="/account/general/">
                    <i className="fa fa-gear" />
                    <span>General</span>
                </Link>
            </li>
            <li>
                <Link to="/account/groups/">
                    <i className="fa fa-group" />
                    <span>Groups</span>
                </Link>
            </li>
            <li>
                <Link to="/account/users/">
                    <i className="fa fa-user" />
                    <span>Users</span>
                </Link>
            </li>
            <li>
                <Link to="/account/notification/">
                    <i className="fa fa-bell" />
                    <span>Notification</span>
                </Link>
            </li>
        </ul>
    </section>;
}
