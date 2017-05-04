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

import AppDispatcher from "../../platform/dispatcher/AppDispatcher";
import {Map} from "immutable";
import {ReduceStore} from "flux/utils";
import UsersActionTypes from "../constants/UsersActionTypes";

/**
 * Store to keep information about all the users of the system.
 */
class UsersStore extends ReduceStore {
    constructor () {
        super(AppDispatcher);
    }

    getInitialState () {
        return Map();
    }
    reduce(state, action) {
        switch (action.type) {
            case UsersActionTypes.REFRESH:
                return action.users.reduce(
                    (p, u) => p.set(u.user_id, u), Map());
            default:
                return state;
        }
    }
}

export default new UsersStore();
