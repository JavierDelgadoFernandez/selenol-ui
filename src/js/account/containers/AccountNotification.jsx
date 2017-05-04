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

import AccountSidebar from "./AccountSidebar";
import Breadcrum from "../../platform/components/Breadcrum";
import {Container} from "flux/utils";
import NotificationActions from "../actions/NotificationActions";
import NotificationList from "../components/NotificationList";
import NotificationStore from "../stores/NotificationStore";
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";

function getStores() {
    return [NotificationStore];
}

function getState() {
    return {
        notifications: NotificationStore.getState().toArray().sort(
            (a, b) => b.created_at.localeCompare(a.created_at)),
        onSawNotification: NotificationActions.sawNotification,
    };
}

/**
 * Container to show the notification information.
 */
function AccountNotification({notifications, onSawNotification}) {
    return <SidebarLayout
        header={<Breadcrum icon="user"
                path={["Notification"]}
                subtitle="Notification"
                title="Account"/>}
            sidebar={AccountSidebar}>
        <div className="row">
            <NotificationList notifications={notifications}
                onSawNotification={onSawNotification} />
        </div>
    </SidebarLayout>;
}

export default Container.createFunctional(
    AccountNotification, getStores, getState);
