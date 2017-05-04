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
 * List the notifications.
 */
export default function NotificationList({notifications, onSawNotification}) {
    return <div className="col-md-12">
        <div className="box box-default">
            <div className="box-header with-border">
                <i className="fa fa-bell" />
                <h3 className="box-title">Notifications</h3>
            </div>
            <div className="box-body">
                {
                    notifications.map(n =>
                        <div className={`alert alert-${
                                        {200: "success"}[n.content.code]
                                        } alert-dismissible`}
                            key={n.notification_id}>
                            <button className="close"
                                onClick={
                                    () => onSawNotification(n.notification_id)}
                                type="button">×</button>
                            <h4>{`${n.content.module.charAt(0).toUpperCase()}${
                                n.content.module.slice(1)}`}</h4>
                            <p>
                                {n.content.title}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    </div>;
}
