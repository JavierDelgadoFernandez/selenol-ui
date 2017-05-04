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

import App from "./App";
import React from "react";

/**
 * Sidebar layout.
 */
export default function SidebarLayout({sidebar, header, children}) {
    return <App>
        <aside className="main-sidebar"
            style={{paddingTop: "50px", minHeight: "100%"}}>
            {React.createElement(sidebar)}}
        </aside>
        <div className="content-wrapper">
            {header}
            <section className="content">
                {children}
            </section>
        </div>
    </App>;
}
