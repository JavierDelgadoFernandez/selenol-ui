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
import UserActionTypes from "../constants/UserActionTypes";
import UserMemberGroupsActionTypes from
"../constants/UserMemberGroupsActionTypes";
import UserOwnerGroupsActionTypes from
"../constants/UserOwnerGroupsActionTypes";
import UsersActionTypes from "../constants/UsersActionTypes";

const UserActions = {

    /**
     * Get the basic information about a given user.
     * @param {number} userID User ID to get the information.
     */
    async getUser(userID) {
        const result = await AccountAPI.getUser(userID);
        AppDispatcher.dispatch({
            type: UserActionTypes.INFO_REFRESH,
            user: result,
        });
    },

    /**
     * Get the list of all the users of the system.
     */
    async getAllUsers() {
        const result = await AccountAPI.getAllUsers();
        AppDispatcher.dispatch({
            type: UsersActionTypes.REFRESH,
            users: result,
        });
    },

    /**
     * Get all the groups of a given user.
     * @param {number} userID User ID to get all the groups.
     */
    async getGroups(userID) {
        const result = await AccountAPI.getGroups(userID);
        AppDispatcher.dispatch({
            type: UserMemberGroupsActionTypes.REFRESH,
            userID,
            groups: result.member,
        });
        AppDispatcher.dispatch({
            type: UserOwnerGroupsActionTypes.REFRESH,
            userID,
            groups: result.owner,
        });
    },
}

export default UserActions;
