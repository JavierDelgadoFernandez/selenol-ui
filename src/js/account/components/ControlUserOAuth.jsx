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
 * UI element to show all the OAuth tokens that the user has.
 */
export default function ControlUserOAuth({user: {oauth=[]}}) {
    return <div className="col-md-9">
        <div className="box box-primary">
            <div className="box-header with-border">
                <h3 className="box-title">
                    OAuth
                </h3>
            </div>
            <div className="box-body">
                <ul className="products-list product-list-in-box">
                    {
                        oauth.map(o =>
                            <li className="item" key={o.access_token}>
                                <div className="product-img">
                                    <i aria-hidden="true"
                                        className="fa fa-github"
                                        style={{"fontSize": "2.8em"}} />
                                </div>
                                <div className="product-info">
                                    <a className="product-title">
                                        {`${o.service.
                                            substring(0, 1).toUpperCase()}${
                                            o.service.substring(1)}`}
                                        <span className=
                                            "label label-warning pull-right">
                                            {o.created}
                                        </span>
                                    </a>
                                    <span className="product-description">
                                        {o.access_token}
                                    </span>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    </div>;
}
