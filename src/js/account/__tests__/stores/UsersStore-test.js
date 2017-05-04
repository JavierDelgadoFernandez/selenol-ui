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

import UsersActionTypes from "../../constants/UsersActionTypes";
import UsersStore from "../../stores/UsersStore";

/**
 * UsersStore tests.
 */
describe("UsersStore", () => {
    beforeEach(function() {
        let state = UsersStore.getInitialState();

        this.users = () => state.toArray();

        this.dispatch = action => {
            state = UsersStore.reduce(state, action);
        };
    });

    it("can refresh users", function() {
        expect(this.users()).toEqual([]);

        this.dispatch({
            type: UsersActionTypes.REFRESH,
            users: [
                {"user_id": 1, "name": "Test0"},
            ],
        });

        expect(this.users()).toEqual(
            [
                {"user_id": 1, "name": "Test0"},
            ]
        );

        this.dispatch({
            type: UsersActionTypes.REFRESH,
            users: [
                {"user_id": 2, "name": "Test1"},
            ],
        });

        expect(this.users()).toEqual(
            [
                {"user_id": 2, "name": "Test1"},
            ]
        );
    })
});
