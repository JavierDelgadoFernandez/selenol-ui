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

import AccountAPI from "../api/AccountAPI";
import AppDispatcher from "../../platform/dispatcher/AppDispatcher";
import GroupActionTypes from "../constants/GroupActionTypes";
import GroupsActionTypes from "../constants/GroupsActionTypes";
import UserOwnerGroupsActionTypes from
"../constants/UserOwnerGroupsActionTypes";

/**
 * Group actions.
 */
const GroupActions = {

    /**
     * Get the information about the specified group.
     * @param {number} groupID Group identificator.
     */
    async getGroup(groupID) {
        const result = await AccountAPI.getGroup(groupID);
        AppDispatcher.dispatch({
            type: GroupActionTypes.INFO_REFRESH,
            group: result,
        });
    },

    /**
     * Create a new group.
     * @param {string} name Name of the new group.
     * @param {number} userID User ID of the group owner.
     * @param {function} onError Callback if it is not possible to create.
     */
    async createGroup(name, userID, onError) {
        try {
            const result = await AccountAPI.createGroup(name, userID);
            AppDispatcher.dispatch({
                type: GroupsActionTypes.CREATE,
                group: result,
            });
            AppDispatcher.dispatch({
                type: UserOwnerGroupsActionTypes.CREATE,
                group: result,
            });
        } catch (error) {
            onError(error);
        }
    },

    /**
     * Get all the groups.
     */
    async getAllGroups() {
        const result = await AccountAPI.getAllGroups();
        AppDispatcher.dispatch({
            type: GroupsActionTypes.REFRESH,
            groups: result,
        });
    },
}

export default GroupActions;
