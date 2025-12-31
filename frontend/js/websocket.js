// WebSocket client for real-time updates
class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.reconnectInterval = 5000;
        this.maxReconnectAttempts = 10;
        this.reconnectAttempts = 0;
        this.listeners = {};
        this.connect();
    }

    connect() {
        try {
            this.socket = new WebSocket(this.url);
            this.setupEventHandlers();
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            this.handleReconnect();
        }
    }

    setupEventHandlers() {
        this.socket.onopen = (event) => {
            console.log('WebSocket connection opened');
            this.reconnectAttempts = 0;
            this.emit('open', event);
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.emit('message', data);
                this.handleMessage(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed');
            this.emit('close', event);
            this.handleReconnect();
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.emit('error', error);
        };
    }

    handleMessage(data) {
        // Handle different message types
        switch (data.type) {
            case 'robot_updated':
                this.emit('robotUpdated', data.data);
                break;
            case 'task_created':
                this.emit('taskCreated', data.data);
                break;
            case 'task_updated':
                this.emit('taskUpdated', data.data);
                break;
            case 'task_priority_updated':
                this.emit('taskPriorityUpdated', data.data);
                break;
            case 'task_override_applied':
                this.emit('taskOverrideApplied', data.data);
                break;
            case 'task_override_removed':
                this.emit('taskOverrideRemoved', data.data);
                break;
            case 'task_paused':
                this.emit('taskPaused', data.data);
                break;
            case 'task_resumed':
                this.emit('taskResumed', data.data);
                break;
            case 'task_step_confirmed':
                this.emit('taskStepConfirmed', data.data);
                break;
            case 'charging_updated':
                this.emit('chargingUpdated', data.data);
                break;
            default:
                console.log('Unknown message type:', data.type);
        }
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            setTimeout(() => {
                this.connect();
            }, this.reconnectInterval);
        } else {
            console.error('Max reconnection attempts reached');
            this.emit('maxReconnectAttemptsReached');
        }
    }

    send(data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not open');
        }
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if (this.listeners[event]) {
            const index = this.listeners[event].indexOf(callback);
            if (index > -1) {
                this.listeners[event].splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                callback(data);
            });
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
}

// Initialize WebSocket client
const wsClient = new WebSocketClient('ws://localhost:8000/ws');

// Export for use in other modules
window.wsClient = wsClient;