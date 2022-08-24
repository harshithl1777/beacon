import axios from 'axios';
import { showToast } from 'services/helpers';

const radarInstance = axios.create({
    baseURL: 'https://api.radar.io/v1',
    headers: { Authorization: process.env.REACT_APP_RADAR_API_KEY },
});

const reverseGeocode = async (coordinates) => {
    try {
        const params = { coordinates: `${coordinates.latitude}, ${coordinates.longitude}` };
        const { data } = await radarInstance.get('/geocode/reverse', { params });
        return { result: data.addresses[0], success: true };
    } catch (error) {
        showToast.error('Unable to geocode your location');
        console.error(error);
        return { error, success: false };
    }
};

const autocomplete = async (query) => {
    try {
        const params = { query, limit: 5 };
        const { data } = await radarInstance.get('/search/autocomplete', { params });
        return { results: data.addresses, success: true };
    } catch (error) {
        showToast.error('Unable to load autocomplete results');
        return { error, success: false };
    }
};

const autocompletePlaces = async (coordinates) => {
    try {
        const params = { coordinates, categories: 'food-grocery, food-wholesaler', limit: 5 };
        const { data } = await radarInstance.get('/search/places', { params });
        return { results: data.places, success: true };
    } catch (error) {
        showToast.error('Unable to load autocomplete results');
        console.error(error);
        return { error, success: false };
    }
};

const radarAPI = {
    reverseGeocode,
    autocomplete,
    autocompletePlaces,
};

export default radarAPI;
