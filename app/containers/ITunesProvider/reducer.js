/*
 *
 * ITunesProvider reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import { createActions } from 'reduxsauce';

export const { Types: iTunesProviderTypes, Creators: iTunesProviderCreators } = createActions({
  requestGetTrackNames: ['artistName'],
  successGetTrackNames: ['data'],
  failureGetTrackNames: ['error'],
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['data'],
  failureGetTrackDetails: ['error'],
  clearTrackNames: [],
  clearTrackDetails: []
});

export const initialState = {
  artistName: null,
  tracks: {},
  tracksError: null,
  trackId: null,
  trackDetails: {},
  trackDetailsError: null,
  loading: true
};
/* eslint-disable default-case, no-param-reassign */
export const iTunesProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case iTunesProviderTypes.REQUEST_GET_TRACK_NAMES:
        draft.artistName = action.artistName;
        break;
      case iTunesProviderTypes.CLEAR_TRACK_NAMES:
        return initialState;
      case iTunesProviderTypes.SUCCESS_GET_TRACK_NAMES:
        draft.tracks = action.data;
        break;
      case iTunesProviderTypes.FAILURE_GET_TRACK_NAMES:
        draft.tracksError = action.error;
        break;
      case iTunesProviderTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        draft.loading = true;
        break;
      case iTunesProviderTypes.CLEAR_TRACK_DETAILS:
        return initialState;
      case iTunesProviderTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.data;
        draft.loading = false;
        break;
      case iTunesProviderTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackDetailsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

export default iTunesProviderReducer;
