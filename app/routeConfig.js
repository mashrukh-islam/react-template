import NotFound from '@containers/NotFoundPage/Loadable';
import ITunesSearch from '@containers/ITunesSearch/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: ITunesSearch,
    ...routeConstants.tracks
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
