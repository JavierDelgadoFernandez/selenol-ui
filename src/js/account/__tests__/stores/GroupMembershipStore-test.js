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

import GroupMembershipActionTypes from
"../../constants/GroupMembershipActionTypes";
import GroupMembershipStore from "../../stores/GroupMembershipStore";

/**
 * GroupMembershipStore tests.
 */
describe("GroupMembershipStore", () => {
    beforeEach(function() {
        let state = GroupMembershipStore.getInitialState();

        this.requests = () => state.toArray();

        this.addRequests = (requests) => requests.forEach(r =>
            state = state.set(r.membership_request_id, r)
        );

        this.dispatch = action => {
            state = GroupMembershipStore.reduce(state, action);
        };
    });

    it("can refresh requests", function() {
        expect(this.requests()).toEqual([]);

        this.dispatch({
            type: GroupMembershipActionTypes.WAITING_REQUESTS_REFRESH,
            requests: [
                {"membership_request_id": 7, "user_id": 1},
            ],
        });

        expect(this.requests()).toEqual(
            [
                {"membership_request_id": 7, "user_id": 1},
            ]
        );

        this.dispatch({
            type: GroupMembershipActionTypes.WAITING_REQUESTS_REFRESH,
            requests: [
                {"membership_request_id": 8, "user_id": 2},
            ],
        });

        expect(this.requests()).toEqual(
            [
                {"membership_request_id": 8, "user_id": 2},
            ]
        );
    })

    it("can create a request from empty map", function() {
        expect(this.requests()).toEqual([]);

        this.dispatch({
            type: GroupMembershipActionTypes.REQUEST,
            request: {"membership_request_id": 13, "user_id": 2},
        });

        expect(this.requests()).toEqual([
            {"membership_request_id": 13, "user_id": 2},
        ]);
    })

    it("can create a request from used map", function() {
        this.addRequests([
            {"membership_request_id": 13, "user_id": 2},
        ]);

        this.dispatch({
            type: GroupMembershipActionTypes.REQUEST,
            request: {"membership_request_id": 14, "user_id": 3},
        });

        expect(this.requests()).toEqual([
           {"membership_request_id": 13, "user_id": 2},
           {"membership_request_id": 14, "user_id": 3},
        ]);
    })
});
