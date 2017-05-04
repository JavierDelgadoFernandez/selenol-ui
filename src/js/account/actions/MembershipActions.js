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
import GroupMembershipActionTypes from
"../constants/GroupMembershipActionTypes";
import UserMembershipActionTypes from "../constants/UserMembershipActionTypes";
import UserOwnerGroupsActionTypes from
"../constants/UserOwnerGroupsActionTypes";

/**
 * Membership actions.
 */
const MembershipActions = {

    /**
     * Request the membership of a group.
     * @param {number} userID User ID of the requester.
     * @param {number} groupID Target group ID.
     * @param {function} onError Callback to be called on error.
     */
    async requestMembership(userID, groupID, onError) {
        try {
            const result = await AccountAPI.requestMembership(userID, groupID);
            AppDispatcher.dispatch({
                type: GroupMembershipActionTypes.REQUEST,
                request: result,
            });
        } catch (error) {
            onError(error);
        }
    },

    /**
     * Get all the membership request that the user did and hasn't been solved.
     * @param {number} userID User ID of the requestor.
     */
    async getPendingGroupRequests(userID) {
        const result = await AccountAPI.getPendingGroupRequests(userID);
        AppDispatcher.dispatch({
            type: UserMembershipActionTypes.REFRESH,
            requests: result,
        });
    },

    /**
     * Accept a membership request done to a group that the user owns.
     * @param {number} membershipRequestID Request ID of the membership.
     */
    async acceptPendingRequest(membershipRequestID) {
        const result = await AccountAPI.acceptPendingRequest(
            membershipRequestID)
        AppDispatcher.dispatch({
            type: UserMembershipActionTypes.REQUEST_ACCEPTED,
            membershipRequestID,
        });
        AppDispatcher.dispatch({
            type: UserOwnerGroupsActionTypes.UPDATE,
            group: result,
        })
    },

    /**
     * Get all the membership request that have been done to groups the user
     * owns.
     * @param {number} userID User ID of the owner user.
     */
    async getWaitingRequests(userID) {
        const result = await AccountAPI.getWaitingRequests(userID);
        AppDispatcher.dispatch({
            type: GroupMembershipActionTypes.WAITING_REQUESTS_REFRESH,
            requests: result,
        });
    },
}

export default MembershipActions;
