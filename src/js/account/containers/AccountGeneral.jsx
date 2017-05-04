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
import ControlUserInfo from "../components/ControlUserInfo";
import ControlUserOAuth from "../components/ControlUserOAuth";
import LoginStore from "../stores/LoginStore";
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";

/**
 * Container for general account information.
 */
export default function AccountGeneral() {
    return <SidebarLayout
        header={<Breadcrum icon="user" path={["General"]} subtitle="General"
            title="Account"/>}
        sidebar={AccountSidebar}>
        <div className="row">
            <ControlUserInfo user={LoginStore.getState()} />
            <ControlUserOAuth user={LoginStore.getState()} />
        </div>
    </SidebarLayout>;
}
