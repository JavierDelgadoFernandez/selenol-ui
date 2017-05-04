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

import UserMemberGroupsActionTypes from
"../../constants/UserMemberGroupsActionTypes";
import UserMemberGroupsStore from "../../stores/UserMemberGroupsStore";

/**
 * UserMemberGroupsStore tests.
 */
describe("UserMemberGroupsStore", () => {
    beforeEach(function() {
        let state = UserMemberGroupsStore.getInitialState();

        this.memberGroups = () => state.toArray();

        this.addGroups = (groups) => groups.forEach(g =>
            state = state.set(g.group_id, g)
        );

        this.dispatch = action => {
            state = UserMemberGroupsStore.reduce(state, action);
        };
    });

    it("can refresh user member groups", function() {
        expect(this.memberGroups()).toEqual([]);

        this.dispatch({
            type: UserMemberGroupsActionTypes.REFRESH,
            groups: [
                {"group_id": 3, "name": "test"},
            ],
        });

        expect(this.memberGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
            ]
        );
    })

    it("can add user member group from empty map", function() {
        expect(this.memberGroups()).toEqual([]);

        this.dispatch({
            type: UserMemberGroupsActionTypes.NEW,
            group: {"group_id": 3, "name": "test"},
        });

        expect(this.memberGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
            ]
        );
    })

    it("can add user member group from used map", function() {
        this.addGroups([
            {"group_id": 3, "name": "test"},
        ]);

        this.dispatch({
            type: UserMemberGroupsActionTypes.NEW,
            group: {"group_id": 4, "name": "test2"},
        });

        expect(this.memberGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
                {"group_id": 4, "name": "test2"},
            ]
        );
    })
});
