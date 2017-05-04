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

import GroupsActionTypes from "../../constants/GroupsActionTypes";
import GroupsStore from "../../stores/GroupsStore";


/**
 * GroupsStore tests.
 */
describe("GroupsStore", () => {
    beforeEach(function() {
        let state = GroupsStore.getInitialState();

        this.groups = () => state.toArray();

        this.addGroups = (groups) => groups.forEach(g =>
            state = state.set(g.group_id, g)
        );

        this.dispatch = action => {
            state = GroupsStore.reduce(state, action);
        };
    });

    it("can refresh groups", function() {
        expect(this.groups()).toEqual([]);

        this.dispatch({
            type: GroupsActionTypes.REFRESH,
            groups: [
                {"group_id": 7, "name": "Test0"},
            ],
        });

        expect(this.groups()).toEqual(
            [
                {"group_id": 7, "name": "Test0"},
            ]
        );

        this.dispatch({
            type: GroupsActionTypes.REFRESH,
            groups: [
                {"group_id": 8, "name": "Test1"},
            ],
        });

        expect(this.groups()).toEqual(
            [
                {"group_id": 8, "name": "Test1"},
            ]
        );
    })

    it("can create a group from empty map", function() {
        expect(this.groups()).toEqual([]);

        this.dispatch({
            type: GroupsActionTypes.CREATE,
            group: {"group_id": 7, "name": "Test0"},
        });

        expect(this.groups()).toEqual([
            {"group_id": 7, "name": "Test0"},
        ]);
    })

    it("can create a group from used map", function() {
        this.addGroups([
            {"group_id": 7, "name": "Test0"},
        ]);

        this.dispatch({
            type: GroupsActionTypes.CREATE,
            group: {"group_id": 8, "name": "Test1"},
        });

        expect(this.groups()).toEqual([
            {"group_id": 7, "name": "Test0"},
            {"group_id": 8, "name": "Test1"},
        ]);
    })
});
