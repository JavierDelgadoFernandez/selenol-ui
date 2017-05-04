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
 * UI modal to show the group creation form.
 */
export default class ControlCreateGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            errorCreateGroup: "",
        };
    }
    onCreateGroup() {
        this.props.onCreateGroup(
            this.state.name,
            LoginStore.getState().user_id, (message) =>
                this.setState({errorCreateGroup: message})
            );
    }
    onNameChange(event) {
        this.setState({name: event.target.value});
    }
    render() {
        return <Modal>
            <div className="modal-header">
                <button aria-label="Close" className="close"
                    data-dismiss="modal" onClick={
                        () => this.props.close()} type="button">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">Create group</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Group name</label>
                    <input className="form-control"
                        onChange={(e) => this.onNameChange(e)} type="text"/>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-default pull-left"
                    data-dismiss="modal" onClick={() => this.props.close()}
                    type="button" >
                    Close
                </button>
                <button className="btn btn-primary" data-dismiss="modal"
                    onClick={() => this.onCreateGroup()} type="button">
                    Create
                </button>
            </div>
            {
                this.state.errorCreateGroup &&
                <ErrorModal close={() => this.setState({errorCreateGroup: ""})}
                    message={this.state.errorCreateGroup} />
            }
        </Modal>;
    }
}
