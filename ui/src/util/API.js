import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 600000
});

export default {
    variantTable() {
        return {
            getDefault: () => api.get(`/`, getDefaultHeader()),
            getGene: (geneName) => api.get(`/gene/${geneName}`, getDefaultHeader()),
            autocomplete: (char_) => api.get(`/autosuggest/${char_}`, getDefaultHeader())
        }
    }
}

function getDefaultHeader() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}