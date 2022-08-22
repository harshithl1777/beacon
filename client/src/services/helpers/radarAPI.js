import Radar from 'radar-sdk-js';
import showToast from 'services/helpers';

const reverseGeocode = (coordinates) => {
    return Radar.reverseGeocode(coordinates, (error, results) => {
        if (error) {
            showToast.error('Unable to geocode location');
            return `${coordinates.latitude}, ${coordinates.latitude}`;
        }
        return results.addresses[0].formattedAddress;
    });
};

const autocomplete = (query) => {
    return Radar.autocomplete({ query, limit: 5 }, (error, results) => {
        if (error) {
            showToast.error('Unable to load autocomplete results');
            return { error, success: false };
        }
        return { results, success: true };
    });
};

const autocompletePlaces = (coordinates) => {
    return Radar.searchPlaces({ near: coordinates, categories: 'food-grocery, food-wholesaler', limit: 5 }, (error, results) => {
        if (error) {
            showToast.error('Unable to load autocomplete results');
            return { error, success: false };
        }
        return { results: results.places, success: true };
    });
};

const radarAPI = {
    reverseGeocode,
    autocomplete,
    autocompletePlaces,
};

export default radarAPI;
