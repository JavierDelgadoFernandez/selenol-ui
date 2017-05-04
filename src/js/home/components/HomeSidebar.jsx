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
 * Home sidebar component.
 */
export default function HomeSidebar() {
    return <section className="sidebar" style={{height: "auto"}}>
        <ul className="sidebar-menu">
            <li>
                <Link to="/home/home/">
                    <i className="fa fa-home"></i>
                    <span>Home</span>
                </Link>
            </li>
        </ul>
    </section>;
}
