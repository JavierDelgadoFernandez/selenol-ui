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

import React from "react";

/**
 * UI element to show the group information.
 */
export default function ControlGroupInfo({group={name: "", created: ""}}) {
    return <div className="col-md-3">
        <div className="box box-primary">
            <div className="box-body box-profile">
                <h3 className="profile-username text-center">
                    {group.name}
                </h3>
                <p className="text-muted text-center">
                    {group.created}
                </p>
                <ul className="list-group list-group-unbordered"></ul>
            </div>
        </div>
    </div>;
}
