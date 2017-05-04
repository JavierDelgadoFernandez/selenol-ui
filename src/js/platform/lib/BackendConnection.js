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
 * Backend connection.
 */
class BackendConnection {
    /**
     * Create a new BackendConnection session.
     * @param {WebSocket} webSocket Websocket connection.
     */
    constructor(webSocket = null) {
        this.requestCounter = 0;
        this.callbacks = {};
        this.pendingMessages = [];
        this.subscriptions = {};
        this.webSocket = webSocket || BackendConnection.defaultWebSocket();
        this.configureWebSocket();
    }

    /**
     * Create the default WebSocket connection.
     */
    static defaultWebSocket() {
        return new WebSocket(
            `${window.location.protocol === "https:" ? "wss://" : "ws://"}${
                window.location.hostname}:8765`);
    }

    /**
     * Configure the WebSocket connection callbacks.
     */
    configureWebSocket() {
        this.webSocket.onmessage = (messageString) => {
            const message = JSON.parse(messageString.data);
            if (message.reason[0] === "selenol") {
                switch (message.reason[1]) {
                    case "result":
                        if (message.request_id in this.callbacks) {
                            this.callbacks[message.request_id].resolve(
                                message.content.content);
                            delete this.callbacks[message.request_id];
                        }
                        break;
                    case "exception":
                        if (message.request_id in this.callbacks) {
                            this.callbacks[message.request_id].reject(
                                message.content.message);
                            delete this.callbacks[message.request_id];
                        }
                        break;
                    case "notification": {
                        const reasonStr = message.content.topic.reduce(
                            (i, p) => i + p, "");
                        if (reasonStr in this.subscriptions) {
                            this.subscriptions[reasonStr].forEach(s =>
                                s(message.content.content));
                        }
                        break;
                    }
                }
            }
        };

        this.webSocket.onopen = () => {
            this.pendingMessages.forEach(
                (m) => this.webSocketSendMessage(m));
        };
    }

    /**
     * Send a message or enqueue it to be send as soon as the connection is
     * ready.
     * @param {Object} message Message to be send in Selenol format.
     */
    webSocketSendMessage(message) {
        if (this.webSocket.readyState === this.webSocket.OPEN) {
            this.webSocket.send(JSON.stringify(message));
        } else {
            this.pendingMessages.push(message);
        }
    }

    /**
     * Subscribe to a Selenol event.
     * @param {Array} reason Selenol reason that will invoke this method.
     * @param {function} callback Function that will be invoked when the event
     * occurs.
     */
    subscribe(reason, callback) {
        const reasonStr = reason.reduce((i, p) => i + p, "");
        if (!(reasonStr in this.subscriptions)) {
            this.subscriptions[reasonStr] = [];
        }
        this.subscriptions[reasonStr].push(callback);
        this.webSocketSendMessage({
            reason: ["subscription", "subscribe"],
            "request_id": this.requestCounter++,
            content: {topic: reason},
        });
    }

    /**
     * Call to a function in the backend. See remote procedure call.
     * @param {Array} reason Selenol reason (namespace + function name)
     * @param {Object} content Selenol message body.
     */
    call(reason, content) {
        return new Promise((resolve, reject) => {
            const requestID = this.requestCounter++;
            this.callbacks[requestID] = {
                resolve,
                reject,
            };
            this.webSocketSendMessage({
                reason,
                "request_id": requestID,
                content,
            });
        });
    }
}

export default new BackendConnection();
