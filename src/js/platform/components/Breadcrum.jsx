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
 * Breadcrum component.
 */
export default function Breadcrum({title, subtitle, icon, path}) {
    return <section className="content-header">
        <h1>
            {title}
            <small>{subtitle}</small>
        </h1>
        <ol className="breadcrumb">
            <li>
                <i className={`fa fa-${icon}`} />
            </li>
            {
                path.map(i =>
                    <li key={i}>
                        {i}
                    </li>
                )
            }
        </ol>
    </section>
}
