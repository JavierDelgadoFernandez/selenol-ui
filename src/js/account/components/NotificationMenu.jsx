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
 * Menu to show the notifications.
 */
export default function NotificationMenu({notifications}) {
    return <li className="dropdown notifications-menu">
        <a aria-expanded="true" className="dropdown-toggle"
            data-toggle="dropdown" href="#">
            <i className="fa fa-bell-o" />
            {
                Boolean(notifications.length) &&
                <span className="label label-success">
                    {notifications.length}
                </span>
            }
        </a>
        <ul className="dropdown-menu">
            <li>
                <div className="slimScrollDiv"
                    style={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        width: "auto",
                    }}>
                    <ul className="menu">
                        {
                            notifications.map(n =>
                                <li key={n.notification_id}>
                                    <Link to="/account/notification/">
                                        <i className={`fa ${{
                                            "execution": "fa fa-tasks",
                                            "account": "fa fa-user",
                                        }[
                                            n.content.module]} ${
                                        {200: "text-green"}[
                                            n.content.code]}`
                                        } />
                                        {n.content.title}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </li>
        </ul>
    </li>;
}
