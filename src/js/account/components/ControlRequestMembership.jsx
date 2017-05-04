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

import ErrorModal from "../../platform/components/ErrorModal";
import LoginStore from "../stores/LoginStore";
import Modal from "../../platform/components/Modal";
import React from "react";

/**
 * Modal to request the membership of a group.
 */
export default class ControlRequestMembership extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {errorMembershipRequest: ""};
    }
    onRequestMembership(groupID) {
        this.props.onRequestMembership(
            LoginStore.getState().user_id,
            groupID,
            (message) => this.setState({errorMembershipRequest: message})
        );
    }
    render() {
        return <Modal>
            <div className="modal-header">
                <button aria-label="Close" className="close"
                    data-dismiss="modal" onClick={
                    () => this.props.close()}
                    type="button">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">Request group</h4>
            </div>
            <div className="modal-body no-padding">
                <table className="table table-hover">
                    <colgroup>
                        <col style={{width: "calc(100%-10em)"}} />
                        <col style={{width: "10em"}} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>Group</th>
                            <th>Action</th>
                        </tr>
                        {
                            this.props.allGroups.toArray().map(g =>
                                <tr key={g.group_id}>
                                    <td>{g.name}</td>
                                    <td>
                                        <button
                                        className="btn btn-block btn-primary"
                                            onClick={
                                                () => this.onRequestMembership(
                                                    g.group_id)}>
                                            Request
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <button className="btn btn-default pull-left"
                data-dismiss="modal" onClick={() => this.props.close()}
                type="button">
                    Close
                </button>
            </div>
            {
                this.state.errorMembershipRequest &&
                <ErrorModal close={
                    () => this.setState({errorMembershipRequest: ""})}
                    message={this.state.errorMembershipRequest} />
            }
        </Modal>;
    }
}
