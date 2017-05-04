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
 * UI element to show the list of request that the user hasn't answered.
 */
export default function ControlPendingGroupRequests({
    onAcceptPendingRequest,
    pendingRequests,
}) {
    return <div className="col-md-6">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">
                    Pending requests
                </h3>
            </div>
            <div className="box-body no-padding">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Group</th>
                            <th>Actions</th>
                        </tr>
                        {
                            pendingRequests.map(pr =>
                                <tr key={pr.requested_at}>
                                    <td>
                                        <Link to={`/account/users/${
                                            pr.user.user_id}/`}>
                                            {pr.user.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/account/group/${
                                            pr.group.group_id}/`}>
                                            {pr.group.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <a onClick={() =>
                                            onAcceptPendingRequest(
                                                pr.membership_request_id)
                                            }>
                                            <i className="fa fa-plus" />
                                        </a>
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
