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
import NotificationActionTypes from
"../constants/NotificationActionTypes";

const NotificactionActions = {

    /**
     * Get all the notifications of the current user.
     */
    async getAllNotifications() {
        const result = await AccountAPI.getAllNotifications();
        AppDispatcher.dispatch({
            type: NotificationActionTypes.REFRESH,
            notifications: result,
        });
    },

    /**
     * Subscribe to new notifications.
     * @param {number} userID User ID of the user.
     */
    subscribeNotificationsUser(userID) {
        AccountAPI.subscribeNotificationsUser(userID, notification => {
            AppDispatcher.dispatch({
                type: NotificationActionTypes.NEW,
                notification,
            });
        });
    },

    /**
     * Mark a notification as seen.
     * @param {number} notificationID Notification ID.
     */
    async sawNotification(notificationID) {
        const result = await AccountAPI.sawNotification(notificationID);
        AppDispatcher.dispatch({
            type: NotificationActionTypes.SAW,
            notification: result,
        });
    },
}

export default NotificactionActions;
