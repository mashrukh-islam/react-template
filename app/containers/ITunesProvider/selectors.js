import { find, get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesProvider state domain
 */

const selectITunesProviderDomain = state => state.iTunesProvider || initialState;

export const makeSelectITunesProvider = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => substate
  );

export const selectTracksData = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'tracks', null)
  );

export const selectTracksError = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'tracksError', null)
  );

export const selectArtistName = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'artistName', null)
  );

export const selectTrackDetails = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'trackDetails', null)
  );

export const selectTrackId = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'trackId', null)
  );

export const selectTrackDetailsError = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'trackDetailsError', null)
  );

export const selectLoading = () =>
  createSelector(
    selectITunesProviderDomain,
    substate => get(substate, 'loading', null)
  );

export const selectTrackById = trackId => {
  return createSelector(
    selectITunesProviderDomain,
    substate => {
      const tracks = get(substate, 'tracks', null);
      find(tracks.results, track => {
        return track.trackId === trackId;
      });
    }
  );
};

export { selectITunesProviderDomain };
