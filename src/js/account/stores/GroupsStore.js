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
import GroupsActionTypes from "../constants/GroupsActionTypes";
import {Map} from "immutable";
import {ReduceStore} from "flux/utils";


/**
 * Store to keep the information about all the groups that are in the system.
 */
class GroupsStore extends ReduceStore {
    constructor () {
        super(AppDispatcher);
    }

    getInitialState () {
        return Map();
    }
    reduce(state, action) {
        switch (action.type) {
            case GroupsActionTypes.REFRESH:
                return action.groups.reduce(
                    (p, g) => p.set(g.group_id, g), Map());
            case GroupsActionTypes.CREATE:
                return state.set(action.group.group_id, action.group);
            default:
                return state;
        }
    }
}

export default new GroupsStore();
