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

import UserActionTypes from "../../constants/UserActionTypes";
import UserStore from "../../stores/UserStore";

/**
 * UserStore tests.
 */
describe("UserStore", () => {
    beforeEach(function() {
        let state = UserStore.getInitialState();

        this.info = () => state;

        this.dispatch = action => {
            state = UserStore.reduce(state, action);
        };
    });

    it("can store user information", function() {
        expect(this.info().toArray().length).toBe(0);

        this.dispatch({
            type: UserActionTypes.INFO_REFRESH,
            user: {"user_id": 1, "name": "Test0"},
        });

        expect(this.info().toArray()).toEqual([
            {"user_id": 1, "name": "Test0"},
        ]);

        this.dispatch({
            type: UserActionTypes.INFO_REFRESH,
            user: {"user_id": 7, "name": "Test6"},
        });
        expect(this.info().toArray().length).toBe(2);
        expect(this.info().get(7)).toEqual({"user_id": 7, "name": "Test6"});
        expect(this.info().get(1)).toEqual({"user_id": 1, "name": "Test0"});
    })
});
