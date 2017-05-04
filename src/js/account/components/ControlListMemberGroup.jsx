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

import ControlRequestMembership from "./ControlRequestMembership";
import {Link} from "react-router-dom";
import React from "react";

/**
 * UI element to show the list of groups where the user is a member.
 */
export default class ControlListMemberGroup extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {showRequestModal: false}
    }
    render() {
        return <div className="col-md-6">
            <div className="box box-primary">
                <div className="box-header">
                    <h3 className="box-title">Member</h3>
                    <div className="box-tools pull-right">
                        <button className="btn btn-box-tool" onClick={
                            () => this.setState({showRequestModal: true})}
                            type="button">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                </div>
                <div className="box-body no-padding">
                    <table className="table table-striped">
                        <colgroup>
                            <col style={{width: "calc(100%-8em)"}} />
                            <col style={{width: "8em"}} />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Members</th>
                            </tr>
                                {
                                    this.props.memberGroups.map(g =>
                                        <tr>
                                            <td>
                                                <Link to={`/account/groups/${
                                                    g.group_id}/`}>
                                                    {g.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <span className="badge bg-green"
                                                    style={{width: "100%"}}>
                                                    {Object.values(
                                                        g.members).length + 1}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                this.state.showRequestModal &&
                <ControlRequestMembership
                    allGroups={this.props.allGroups}
                    close={() => this.setState({showRequestModal: false})}
                    onRequestMembership={this.props.onRequestMembership} />
            }
        </div>;
    }
}
