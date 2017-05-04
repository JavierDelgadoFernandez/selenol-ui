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

import UserOwnerGroupsActionTypes from
"../../constants/UserOwnerGroupsActionTypes";
import UserOwnerGroupsStore from "../../stores/UserOwnerGroupsStore";

/**
 * UserOwnerGroupsStore tests.
 */
describe("UserOwnerGroupsStore", () => {
    beforeEach(function() {
        let state = UserOwnerGroupsStore.getInitialState();

        this.ownerGroups = () => state.toArray();

        this.addGroups = (groups) => groups.forEach(g =>
            state = state.set(g.group_id, g)
        );

        this.dispatch = action => {
            state = UserOwnerGroupsStore.reduce(state, action);
        };
    });

    it("can refresh user owner groups", function() {
        expect(this.ownerGroups()).toEqual([]);

        this.dispatch({
            type: UserOwnerGroupsActionTypes.REFRESH,
            groups: [
                {"group_id": 3, "name": "test"},
            ],
        });

        expect(this.ownerGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
            ]
        );
    })

    it("can add user owner group from empty map", function() {
        expect(this.ownerGroups()).toEqual([]);

        this.dispatch({
            type: UserOwnerGroupsActionTypes.CREATE,
            group: {"group_id": 3, "name": "test"},
        });

        expect(this.ownerGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
            ]
        );
    })

    it("can add user owner group from used map", function() {
        this.addGroups([
            {"group_id": 3, "name": "test"},
        ]);

        this.dispatch({
            type: UserOwnerGroupsActionTypes.CREATE,
            group: {"group_id": 4, "name": "test2"},
        });

        expect(this.ownerGroups()).toEqual(
            [
                {"group_id": 3, "name": "test"},
                {"group_id": 4, "name": "test2"},
            ]
        );
    })

    it("can update group information", function() {
        this.addGroups([
            {"group_id": 3, "name": "test"},
            {"group_id": 4, "name": "test2"},
        ]);

        this.dispatch({
            type: UserOwnerGroupsActionTypes.UPDATE,
            group: {"group_id": 3, "name": "test5"},
        });

        expect(this.ownerGroups()).toEqual(
            [
                {"group_id": 3, "name": "test5"},
                {"group_id": 4, "name": "test2"},
            ]
        );
    })
});
