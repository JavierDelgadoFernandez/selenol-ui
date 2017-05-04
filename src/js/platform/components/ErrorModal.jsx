import React from "react";
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

/**
 * Modal base to show error messages.
 */
export default function ErrorModal({message, close}) {
    return <div className="modal modal-danger show">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button className="close"
                        onClick={() => close()} type="button">
                        <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">
                        Backend couldn't execute your request
                    </h4>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-outline pull-right"
                        onClick={() => close()} type="button">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>;
}
