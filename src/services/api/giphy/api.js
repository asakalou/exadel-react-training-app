import {ajax} from 'rxjs/observable/dom/ajax';
import queryString from 'query-string';

const API_KEY = 'sijnhXOr0KKdvzqCSZS5XVj5LdI5Jw85';
const API_URL = 'http://api.giphy.com/v1/gifs';

const API_RANDOM_URL = `${API_URL}/random`;
const API_SEARCH_URL = `${API_URL}/search`;

const api = {
    loadRandom: () => {
        const paramsStr = queryString.stringify({
            api_key: 'USh3CR02XZhJLKXVFEaHjTEhE7Z7qqw8'
        });
        return ajax.getJSON(`${API_RANDOM_URL}?${paramsStr}`)
    },

    loadByQuery: ({q, limit, offset}) => {
        const paramsStr = queryString.stringify({
            api_key: API_KEY,
            q,
            limit,
            offset
        });
        return ajax.getJSON(`${API_SEARCH_URL}?${paramsStr}`)
    }
};

export default api;