import {ajax} from 'rxjs/observable/dom/ajax';
import queryString from 'query-string';

const API_KEY = 'sijnhXOr0KKdvzqCSZS5XVj5LdI5Jw85';
const API_URL = 'http://api.giphy.com/v1/gifs';

const API_RANDOM_URL = `${API_URL}/random`;
const API_SEARCH_URL = `${API_URL}/search`;
const API_TRENDING = `${API_URL}/trending`;

const api = {
    loadRandom: () => {
        const paramsStr = queryString.stringify({
            api_key: 'USh3CR02XZhJLKXVFEaHjTEhE7Z7qqw8'
        });
        return ajax({
            url: `${API_RANDOM_URL}?${paramsStr}`,
            crossDomain: true,
            createXHR: function () {
                return new XMLHttpRequest();
            }
        }).map(response => response.response.data);
    },

    loadByQuery: ({q, limit, offset}) => {
        const paramsStr = queryString.stringify({
            api_key: API_KEY,
            q,
            limit,
            offset
        });
        return ajax.getJSON(`${API_SEARCH_URL}?${paramsStr}`)
    },

    loadTrending: ({q, limit, offset}) => {
        const paramsStr = queryString.stringify({
            api_key: API_KEY,
            limit,
            offset
        });
        return ajax.getJSON(`${API_TRENDING}?${paramsStr}`)
    }
};

export default api;