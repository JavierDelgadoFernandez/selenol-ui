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

import AppDispatcher from "../../platform/dispatcher/AppDispatcher";
import {Map} from "immutable";
import NotificationActionTypes from "../constants/NotificationActionTypes";
import {ReduceStore} from "flux/utils";


/**
 * Store to keep the user notifications.
 */
class NotificationStore extends ReduceStore {
    constructor () {
        super(AppDispatcher);
    }

    getInitialState () {
        return Map();
    }
    reduce(state, action) {
        switch (action.type) {
            case NotificationActionTypes.REFRESH:
                return action.notifications.reduce(
                    (p, n) => p.set(n.notification_id, n), Map());
            case NotificationActionTypes.NEW:
                return state.set(action.notification.notification_id,
                    action.notification);
            case NotificationActionTypes.SAW:
                return state.remove(action.notification.notification_id);
            default:
                return state;
        }
    }
}

export default new NotificationStore();
