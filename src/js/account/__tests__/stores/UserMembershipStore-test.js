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

import UserMembershipActionTypes from
"../../constants/UserMembershipActionTypes";
import UserMembershipStore from "../../stores/UserMembershipStore";

/**
 * UserMembershipStore tests.
 */
describe("UserMembershipStore", () => {
    beforeEach(function() {
        let state = UserMembershipStore.getInitialState();

        this.requests = () => state.toArray();

        this.addRequests = (requests) => requests.forEach(r =>
            state = state.set(r.membership_request_id, r)
        );

        this.dispatch = action => {
            state = UserMembershipStore.reduce(state, action);
        };
    });

    it("can refresh membership requests", function() {
        expect(this.requests()).toEqual([]);

        this.dispatch({
            type: UserMembershipActionTypes.REFRESH,
            requests: [
                {"membership_request_id": 13, "group_id": 2},
            ],
        });

        expect(this.requests()).toEqual(
            [
                {"membership_request_id": 13, "group_id": 2},
            ]
        );

        this.dispatch({
            type: UserMembershipActionTypes.REFRESH,
            requests: [
                {"membership_request_id": 14, "group_id": 7},
            ],
        });

        expect(this.requests()).toEqual(
            [
                {"membership_request_id": 14, "group_id": 7},
            ]
        );
    })


    it("can accept a request", function() {
        this.addRequests([
            {"membership_request_id": 7, "group_id": 1},
            {"membership_request_id": 8, "group_id": 2},
            {"membership_request_id": 9, "group_id": 3},
        ])

        this.dispatch({
            type: UserMembershipActionTypes.REQUEST_ACCEPTED,
            membershipRequestID: 8,
        });

        expect(this.requests()).toEqual([
            {"membership_request_id": 7, "group_id": 1},
            {"membership_request_id": 9, "group_id": 3},
        ]);
    })
});
