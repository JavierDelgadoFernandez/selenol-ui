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

import OAuthOptionsActionTypes from "../../constants/OAuthOptionsActionTypes";
import OAuthOptionsStore from "../../stores/OAuthOptionsStore";

/**
 * OAuthOptionsStore tests.
 */
describe("OAuthOptionsStore", () => {
    beforeEach(function() {
        let state = OAuthOptionsStore.getInitialState();

        this.oAuthOptions = () => state.toArray();

        this.dispatch = action => {
            state = OAuthOptionsStore.reduce(state, action);
        };
    });

    it("can refresh oauth options", function() {
        expect(this.oAuthOptions()).toEqual([]);

        this.dispatch({
            type: OAuthOptionsActionTypes.REFRESH,
            oauth: [
                {"name": "test"},
            ],
        });

        expect(this.oAuthOptions()).toEqual(
            [
                {"name": "test"},
            ]
        );

        this.dispatch({
            type: OAuthOptionsActionTypes.REFRESH,
            oauth: [
                {"name": "test2"},
            ],
        });

        expect(this.oAuthOptions()).toEqual(
            [
                {"name": "test2"},
            ]
        );
    })
});
