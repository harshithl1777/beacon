import axios from 'axios';
import store from 'index';
import { handleResponse, handleError } from 'services/api/utils/response';
import { refreshSession } from 'redux/actions/authActions';
import { checkTokenExpiry } from 'services/helpers';

const BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:5002/api';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
    const url = config.url;
    if (!url.includes('/auth/session')) {
        const currentState = store.getState();
        const isLoggedIn = currentState.auth.isLoggedIn;
        if (isLoggedIn) {
            const accessToken = currentState.auth.accessToken;
            const tokenExpiry = checkTokenExpiry(accessToken);
            if (!tokenExpiry) await refreshSession();
            config.headers = { Authorization: `Bearer ${store.getState().auth.accessToken}` };
        }
    }
    return config;
});

class APICore {
    constructor(options) {
        if (options.get) {
            this.get = async (id = '', headers = {}, params = {}) => {
                try {
                    const response = await axios.get(`${BASE_URL}/${options.url}/${id}`, {
                        params,
                        headers,
                    });
                    return handleResponse(response);
                } catch (error) {
                    return handleError(error);
                }
            };
        }

        if (options.post) {
            this.post = async (body = {}, headers = {}) => {
                try {
                    const response = await axios.post(`${BASE_URL}/${options.url}`, body, { headers });
                    return handleResponse(response);
                } catch (error) {
                    return handleError(error);
                }
            };
        }

        if (options.put) {
            this.put = async (id = '', body = {}, headers = {}) => {
                try {
                    const response = await axios.put(`${BASE_URL}/${options.url}/${id}`, body, { headers });
                    return handleResponse(response);
                } catch (error) {
                    return handleError(error);
                }
            };
        }

        if (options.patch) {
            this.patch = async (id = '', body = {}, headers = {}) => {
                try {
                    const response = await axios.patch(`${BASE_URL}/${options.url}/${id}`, body, { headers });
                    return handleResponse(response);
                } catch (error) {
                    return handleError(error);
                }
            };
        }

        if (options.remove) {
            this.remove = async (id = '', headers = {}) => {
                try {
                    const response = await axios.delete(`${BASE_URL}/${options.url}/${id}`, { headers });
                    return handleResponse(response);
                } catch (error) {
                    return handleError(error);
                }
            };
        }
    }
}

export default APICore;
