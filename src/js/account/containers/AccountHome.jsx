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
import React from "react";
import SidebarLayout from "../../platform/components/SidebarLayout";

/**
 * Container to show the account landing page.
 */
export default function AccountHome() {
    return <SidebarLayout sidebar={AccountSidebar}>
        <section id="introduction">
            <h2 className="page-header">
                <a href="#introduction">
                    Introduction
                </a>
            </h2>
            <p className="lead">
                <b>Selenol account</b> customizes your personal account.
                It sets the user details, group that are belonged by the used
                and shows some details about the whole project instance.
            </p>
        </section>
    </SidebarLayout>;
}
