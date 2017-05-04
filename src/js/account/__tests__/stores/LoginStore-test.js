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

import LoginActionTypes from "../../constants/LoginActionTypes";
import LoginStore from "../../stores/LoginStore";

/**
 * LoginStore tests.
 */
describe("LoginStore", () => {
    beforeEach(function() {
        let state = LoginStore.getInitialState();

        this.login = () => state;

        this.dispatch = action => {
            state = LoginStore.reduce(state, action);
        };
    });

    it("can login", function() {
        expect(this.login()).toEqual({role: "guest"});

        this.dispatch({
            type: LoginActionTypes.LOGIN,
            user: {name: "Test"},
        });

        expect(this.login()).toEqual({name: "Test"});
    })
});
