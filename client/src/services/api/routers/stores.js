import APICore from 'services/api/utils/core';

const url = 'stores';

const storesAPI = new APICore({
    get: true,
    post: true,
    patch: true,
    remove: true,
    url: url,
});

export default storesAPI;
