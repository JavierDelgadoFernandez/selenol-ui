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

import NotificationActionTypes from "../../constants/NotificationActionTypes";
import NotificationStore from "../../stores/NotificationStore";

/**
 * NotificationStore tests.
 */
describe("NotificationStore", () => {
    beforeEach(function() {
        let state = NotificationStore.getInitialState();

        this.notifications = () => state.toArray();

        this.addNotifications = (notifications) => notifications.forEach(n =>
            state = state.set(n.notification_id, n)
        );

        this.dispatch = action => {
            state = NotificationStore.reduce(state, action);
        };
    });

    it("can refresh notifications", function() {
        expect(this.notifications()).toEqual([]);

        this.dispatch({
            type: NotificationActionTypes.REFRESH,
            notifications: [
                {"notification_id": 5, "content": "Test0"},
            ],
        });

        expect(this.notifications()).toEqual(
            [
                {"notification_id": 5, "content": "Test0"},
            ]
        );

        this.dispatch({
            type: NotificationActionTypes.REFRESH,
            notifications: [
                {"notification_id": 6, "content": "Test1"},
            ],
        });

        expect(this.notifications()).toEqual(
            [
                {"notification_id": 6, "content": "Test1"},
            ]
        );
    })

    it("can raise a new notification from empty map", function() {
        expect(this.notifications()).toEqual([]);

        this.dispatch({
            type: NotificationActionTypes.NEW,
            notification: {"notification_id": 5, "content": "Test0"},
        });

        expect(this.notifications()).toEqual([
            {"notification_id": 5, "content": "Test0"},
        ]);
    })

    it("can raise a new notification from used map", function() {
        this.addNotifications([
            {"notification_id": 5, "content": "Test0"},
        ]);

        this.dispatch({
            type: NotificationActionTypes.NEW,
            notification: {"notification_id": 6, "content": "Test1"},
        });

        expect(this.notifications()).toEqual([
            {"notification_id": 5, "content": "Test0"},
            {"notification_id": 6, "content": "Test1"},
        ]);
    })

    it("can remove a notification", function() {
        this.addNotifications([
            {"notification_id": 5, "content": "Test0"},
            {"notification_id": 6, "content": "Test1"},
        ]);

        this.dispatch({
            type: NotificationActionTypes.SAW,
            notification: {"notification_id": 6, "content": "Test1"},
        });

        expect(this.notifications()).toEqual([
            {"notification_id": 5, "content": "Test0"},
        ]);
    })
    
});
