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
 * UI element to show the list of request that the user made and haven't been
 * replied.
 */
export default function ControlWaitingForApproval({waitingRequests}) {
    return <div className="col-md-6">
        <div className="box">
            <div className="box-header">
                <h3 className="box-title">Waiting for approval</h3>
            </div>
            <div className="box-body no-padding">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Group</th>
                            <th>Since</th>
                        </tr>
                        {
                            waitingRequests.map(wr =>
                                <tr key={wr.requested_at}>
                                    <td>
                                        <Link to={`/account/group/${
                                            wr.group.group_id}/`}>
                                            {wr.group.name}
                                        </Link>
                                    </td>
                                    <td>
                                        {wr.requested_at}
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
