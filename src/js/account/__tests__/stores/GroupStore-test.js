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

import GroupActionTypes from "../../constants/GroupActionTypes";
import GroupStore from "../../stores/GroupStore";

/**
 * GroupStore tests.
 */
describe("GroupStore", () => {
    beforeEach(function() {
        let state = GroupStore.getInitialState();

        this.info = () => state;

        this.dispatch = action => {
            state = GroupStore.reduce(state, action);
        };
    });

    it("can store group information", function() {
        expect(this.info().toArray().length).toBe(0);

        this.dispatch({
            type: GroupActionTypes.INFO_REFRESH,
            group: {"group_id": 1, "name": "Test0"},
        });

        expect(this.info().toArray()).toEqual([
            {"group_id": 1, "name": "Test0"},
        ]);

        this.dispatch({
            type: GroupActionTypes.INFO_REFRESH,
            group: {"group_id": 7, "name": "Test6"},
        });
        expect(this.info().toArray().length).toBe(2);
        expect(this.info().get(7)).toEqual({"group_id": 7, "name": "Test6"});
        expect(this.info().get(1)).toEqual({"group_id": 1, "name": "Test0"});
    })
});
