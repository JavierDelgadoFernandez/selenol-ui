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

import BackendConnection from "../../platform/lib/BackendConnection";

/**
 * Account API calls.
 */
const AccountAPI = {
    getGroup: groupID => BackendConnection.call(
        ["account", "group", "info"],
        {"group_id": groupID}
    ),
    createGroup: (name, userID) => BackendConnection.call(
        ["account", "group", "create"], {
            "user_id": userID,
            name,
        }
    ),
    getAllGroups: () => BackendConnection.call(["account", "group", "all"], {}),
    loginOAuth: (service, code) => BackendConnection.call(
        ["account", "login", "oauth"], {
            service,
            code,
        }
    ),
    loginToken: token => BackendConnection.call(
        ["account", "login", "token"],
        {token}
    ),
    getOAuthOptions: () => BackendConnection.call(
        ["account", "oauth", "list_options"], {}
    ),
    requestMembership: (userID, groupID) => BackendConnection.call(
        ["account", "group", "request"], {
            "user_id": userID,
            "group_id": groupID,
        }
    ),
    getPendingGroupRequests: userID => BackendConnection.call(
        ["account", "group", "pending_requests"],
        {"user_id": userID}
    ),
    acceptPendingRequest: membershipRequestID => BackendConnection.call(
        ["account", "group", "accept_pending_request"],
        {"membership_request_id": membershipRequestID}
    ),
    getWaitingRequests: userID => BackendConnection.call(
        ["account", "group", "waiting_requests"],
        {"user_id": userID}
    ),
    getAllNotifications: () => BackendConnection.call(
        ["account", "notifications", "active"], {}
    ),
    subscribeNotificationsUser: (userID, onNotification) => {
        BackendConnection.subscribe(["account", "notification", "user",
            userID.toString()], onNotification);
    },
    getUser: userID => BackendConnection.call(
        ["account", "user", "info"],
        {"user_id": userID}
    ),
    getAllUsers: () => BackendConnection.call(["account", "user", "all"], {}),
    getGroups: userID => BackendConnection.call(
        ["account", "group", "user"],
        {"user_id": userID}
    ),
    sawNotification: notificationID => BackendConnection.call(
        ["account", "notification", "saw"],
        {"notification_id": notificationID}
    ),
};

export default AccountAPI;
