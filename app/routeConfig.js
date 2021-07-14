import NotFound from '@containers/NotFoundPage/Loadable';
import TracksContainer from '@containers/ITunesProvider/TracksContainer/index';
import TrackDetailsContainer from '@containers/ITunesProvider/TrackDetailsContainer/index';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: TracksContainer,
    ...routeConstants.tracks
  },
  trackDetails: {
    component: TrackDetailsContainer,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
