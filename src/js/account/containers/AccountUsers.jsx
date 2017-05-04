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
import ControlUsersList from "../components/ControlUsersList";
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";
import UserActions from "../actions/UserActions";
import UsersStore from "../stores/UsersStore";

/**
 * Container to show information about the list of all users.
 */
class AccountUsers extends React.Component {
    static getStores() {
        return [UsersStore];
    }

    static calculateState() {
        return {users: UsersStore.getState()};
    }

    componentDidMount() {
        UserActions.getAllUsers();
    }
    render() {
        return <SidebarLayout
            header={<Breadcrum icon="user" path={["Groups"]} subtitle="Groups"
                title="Account"/>}
            sidebar={AccountSidebar}>
            <div className="row">
                <ControlUsersList users={this.state.users} />
            </div>
        </SidebarLayout>;
    }
}

export default Container.create(AccountUsers);
