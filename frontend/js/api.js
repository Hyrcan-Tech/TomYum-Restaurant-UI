// API client for backend communication
class ApiClient {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error(`API request failed for ${url}:`, error);
            throw error;
        }
    }

    // Authentication endpoints
    async login(username, password) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        
        return this.request('/auth/login', {
            method: 'POST',
            body: formData
        });
    }

    async logout() {
        return this.request('/auth/logout', {
            method: 'POST'
        });
    }

    async getCurrentUser() {
        return this.request('/auth/me');
    }

    // Tables endpoints
    async getTables() {
        return this.request('/tables');
    }

    async getTable(id) {
        return this.request(`/tables/${id}`);
    }

    // Points endpoints
    async getPoints() {
        return this.request('/points');
    }

    async getPoint(id) {
        return this.request(`/points/${id}`);
    }

    async getPointsByType(type) {
        return this.request(`/points/type/${type}`);
    }

    // Orders endpoints
    async getOrders() {
        return this.request('/orders');
    }

    async getOrder(id) {
        return this.request(`/orders/${id}`);
    }

    // Tasks endpoints
    async getTasks() {
        return this.request('/tasks');
    }

    async getTask(id) {
        return this.request(`/tasks/${id}`);
    }

    async createTask(taskData) {
        return this.request('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }

    async updateTaskStatus(id, statusData) {
        return this.request(`/tasks/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify(statusData)
        });
    }

    // Robots endpoints
    async getRobots() {
        return this.request('/robots');
    }

    async getRobot(id) {
        return this.request(`/robots/${id}`);
    }

    async sendRobotCommand(id, commandData) {
        return this.request(`/robots/${id}/command`, {
            method: 'POST',
            body: JSON.stringify(commandData)
        });
    }

    // Queue management endpoints
    async getQueueTasks() {
        return this.request('/queue/tasks');
    }

    async getReadyTasks() {
        return this.request('/queue/tasks/ready');
    }

    async updateTaskPriority(id, priorityData) {
        return this.request(`/queue/tasks/${id}/priority`, {
            method: 'PUT',
            body: JSON.stringify(priorityData)
        });
    }

    async applyTaskOverride(id, overrideData) {
        return this.request(`/queue/tasks/${id}/override`, {
            method: 'POST',
            body: JSON.stringify(overrideData)
        });
    }

    async removeTaskOverride(id) {
        return this.request(`/queue/tasks/${id}/override`, {
            method: 'DELETE'
        });
    }

    async getAssignmentLog() {
        return this.request('/queue/assignment-log');
    }

    // Charging management endpoints
    async getChargingStatus() {
        return this.request('/charging/status');
    }

    async getChargingPolicy() {
        return this.request('/charging/policy');
    }

    async requestManualCharging(robotData) {
        return this.request('/charging/manual-request', {
            method: 'POST',
            body: JSON.stringify(robotData)
        });
    }

    // Task state machine endpoints
    async confirmTaskStep(id) {
        return this.request(`/tasks/${id}/confirm-step`, {
            method: 'POST'
        });
    }

    async getCurrentTaskStep(id) {
        return this.request(`/tasks/${id}/current-step`);
    }

    async pauseTask(id) {
        return this.request(`/tasks/${id}/pause`, {
            method: 'PUT'
        });
    }

    async resumeTask(id) {
        return this.request(`/tasks/${id}/resume`, {
            method: 'PUT'
        });
    }

    // Reports endpoints
    async getDailyReport() {
        return this.request('/reports/daily');
    }

    async getTaskStatistics() {
        return this.request('/reports/tasks');
    }

    async getPerformanceReport() {
        return this.request('/reports/performance');
    }
}

// Initialize API client
const apiClient = new ApiClient();

// Export for use in other modules
window.apiClient = apiClient;