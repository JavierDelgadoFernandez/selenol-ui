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
import NotificationMenu from "../../account/components/NotificationMenu";
import React from "react";

const menus = {
    home: {
        name: "Home",
        link: "home",
        icon: "fa fa-home",
    },
    account: {
        name: "Account",
        link: "account",
        icon: "fa fa-user",
    },
};

/**
 * Application menu component.
 */
export default function Menu({notifications}) {
    return <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
            {
                Object.values(menus).map(m =>
                    <li key={m.name}>
                        <Link to={`/${m.link}/`}>
                            <i className={m.icon} />
                            {` ${m.name}`}
                        </Link>
                    </li>
                )
            }
            <NotificationMenu notifications={notifications} />
        </ul>
    </div>;
}

