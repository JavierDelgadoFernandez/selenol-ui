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
import ControlGroupInfo from "../components/ControlGroupInfo";
import GroupActions from "../actions/GroupActions";
import GroupStore from "../stores/GroupStore";
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";

/**
 * Container to show information about a specific group.
 */
class AccountGroup extends React.Component {
    static getStores() {
        return [GroupStore];
    }

    static calculateState() {
        return {group: GroupStore.getState()};
    }

    componentDidMount() {
        GroupActions.getGroup(parseInt(this.props.match.params.groupID));
    }
    render() {
        return <SidebarLayout
            header={<Breadcrum icon="user"
                path={["Groups", this.props.match.params.groupID]}
                subtitle="Group details"
                title="Account"/>}
            sidebar={AccountSidebar}>
            <div className="row">
                <ControlGroupInfo group={this.state.group.get(
                    parseInt(this.props.match.params.groupID))} />
            </div>
        </SidebarLayout>;
    }
}

export default Container.create(AccountGroup, {withProps: true});
