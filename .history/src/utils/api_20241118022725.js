// src/utils/api.js
const api = {
    async fetch(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            };
        }

        const response = await fetch(`http://localhost:8000/api/${endpoint}`, options);
        const data = await response.json();

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return data;
    }
};

export default api;