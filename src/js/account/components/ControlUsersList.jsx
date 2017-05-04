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
 * UI element to show the list of users.
 */
export default function ControlUsersList({users}) {
    return <div className="col-md-12">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">Users</h3>
            </div>
            <div className="box-body no-padding">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        {
                            users.toArray().map(u =>
                                <tr key={u.user_id}>
                                    <td>
                                            {u.name}
                                    </td>
                                    <td>
                                            {u.email}
                                    </td>
                                    <td>
                                        <Link to={
                                            `/account/users/${u.user_id}/`}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>;
}
