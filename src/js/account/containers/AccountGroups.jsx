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

import AccountSidebar from "./AccountSidebar";
import Breadcrum from "../../platform/components/Breadcrum";
import {Container} from "flux/utils";
import ControlListMemberGroup from "../components/ControlListMemberGroup";
import ControlListOwnerGroup from "../components/ControlListOwnerGroup";
import ControlPendingGroupRequests from
"../components/ControlPendingGroupRequests";
import ControlWaitingForApproval from "../components/ControlWaitingForApproval";
import GroupActions from "../actions/GroupActions";
import GroupMembershipStore from "../stores/GroupMembershipStore";
import GroupsStore from "../stores/GroupsStore";
import LoginStore from "../stores/LoginStore";
import MembershipActions from "../actions/MembershipActions";
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";
import UserActions from "../actions/UserActions";
import UserMemberGroupsStore from "../stores/UserMemberGroupsStore";
import UserMembershipStore from "../stores/UserMembershipStore";
import UserOwnerGroupsStore from "../stores/UserOwnerGroupsStore";

/**
 * Container to show information about all groups.
 */
class AccountGroups extends React.Component {
    static getStores() {
        return [
            GroupMembershipStore,
            GroupsStore,
            UserMemberGroupsStore,
            UserMembershipStore,
            UserOwnerGroupsStore,
        ];
    }

    static calculateState() {
        return {
            allGroups: GroupsStore.getState(),
            ownerGroups: UserOwnerGroupsStore.getState(),
            memberGroups: UserMemberGroupsStore.getState(),
            pendingRequests: UserMembershipStore.getState(),
            waitingRequests: GroupMembershipStore.getState(),

            onAcceptPendingRequest: MembershipActions.acceptPendingRequest,
            onRequestMembership: MembershipActions.requestMembership,
            onCreateGroup: GroupActions.createGroup,
        };
    }

    componentDidMount() {
        GroupActions.getAllGroups();
        MembershipActions.getPendingGroupRequests(
            LoginStore.getState().user_id);
        MembershipActions.getWaitingRequests(LoginStore.getState().user_id);
        UserActions.getGroups(LoginStore.getState().user_id);
    }
    render() {
        return <SidebarLayout
            header={<Breadcrum icon="user" path={["Groups"]} subtitle="Groups"
                title="Account"/>}
            sidebar={AccountSidebar}>
            <div className="row">
                <ControlListOwnerGroup
                    onCreateGroup={this.state.onCreateGroup}
                    onCreateModal={this.state.onCreateModal}
                    onRemoveModal={this.state.onRemoveModal}
                    ownerGroups={this.state.ownerGroups}
                    />
                <ControlListMemberGroup
                    allGroups={this.state.allGroups}
                    memberGroups={this.state.memberGroups}
                    onCreateModal={this.state.onCreateModal}
                    onRemoveModal={this.state.onRemoveModal}
                    onRequestMembership={this.state.onRequestMembership}
                    />
            </div>
            <div className="row">
                <ControlPendingGroupRequests
                    onAcceptPendingRequest={this.state.onAcceptPendingRequest}
                    pendingRequests={this.state.pendingRequests} />
                <ControlWaitingForApproval
                    waitingRequests={this.state.waitingRequests} />
            </div>
        </SidebarLayout>;
    }
}

export default Container.create(AccountGroups);
