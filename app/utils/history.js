import { createBrowserHistory } from 'history';
const baseUrl = process.env.NODE_ENV === 'production' ? '/mashrukh-islam/iTunesSearch/' : '/';
const history = createBrowserHistory({ basename: baseUrl });
export default history;
