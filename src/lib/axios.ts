import axios from 'axios';

const isServer = typeof window === 'undefined';

const baseURL = isServer
    ? process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api' // Default for local dev
    : '/api';

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
