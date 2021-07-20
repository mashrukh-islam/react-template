/**
 * Test iTunesProvider sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getTracks, getTrackDetails } from '@services/itunesApi';
import { apiResponseGenerator, intlProvider } from '@utils/testUtils';
import iTunesProviderSaga, { fetchTrackDetails, fetchTracks } from '../saga';
import { iTunesProviderTypes } from '../reducer';
import { selectTrackById } from '../selectors';
import { setIntl, translate } from '@components/IntlGlobalProvider';

describe('ITunesProvider saga tests', () => {
  beforeAll(() => {
    setIntl(intlProvider());
  });

  const generator = iTunesProviderSaga();
  const artistName = 'Opeth';
  const trackId = 123456;
  let getTracksGenerator = fetchTracks({ artistName });
  let getTrackDetailsGenerator = fetchTrackDetails({ trackId });
  it('should start task to watch for REQUEST_GET_TRACK_NAMES action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesProviderTypes.REQUEST_GET_TRACK_NAMES, fetchTracks));
  });

  it('should ensure that the action FAILURE_GET_TRACK_NAMES is dispatched when the api call fails', () => {
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, artistName));
    const errorResponse = translate('something_went_wrong');
    expect(getTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesProviderTypes.FAILURE_GET_TRACK_NAMES,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_NAMES is dispatched when the api call succeeds', () => {
    getTracksGenerator = fetchTracks({ artistName });
    const res = getTracksGenerator.next().value;
    expect(res).toEqual(call(getTracks, artistName));
    const tracksResponse = {
      resultCount: 1,
      results: []
    };
    expect(getTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: iTunesProviderTypes.SUCCESS_GET_TRACK_NAMES,
        data: tracksResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the store call succeeds', () => {
    getTrackDetailsGenerator = fetchTrackDetails({ trackId });
    const res = getTrackDetailsGenerator.next().value;
    expect(JSON.stringify(res)).toEqual(JSON.stringify(select(selectTrackById(trackId))));
    const trackDetailsResponse = {};
    expect(getTrackDetailsGenerator.next(trackDetailsResponse).value).toEqual(
      put({
        type: iTunesProviderTypes.SUCCESS_GET_TRACK_DETAILS,
        data: trackDetailsResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the API call succeeds', () => {
    getTrackDetailsGenerator = fetchTrackDetails({ trackId });
    const res = getTrackDetailsGenerator.next().value;
    expect(JSON.stringify(res)).toBe(JSON.stringify(select(selectTrackById(trackId))));
    const trackDetailsResponse = null;
    expect(getTrackDetailsGenerator.next(trackDetailsResponse).value).toEqual(call(getTrackDetails, trackId));
    const trackDetailsApiResponse = {
      resultCount: 1,
      results: [{ artistId: 45678 }]
    };
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, trackDetailsApiResponse)).value).toEqual(
      put({
        type: iTunesProviderTypes.SUCCESS_GET_TRACK_DETAILS,
        data: trackDetailsApiResponse.results[0]
      })
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the API call fails', () => {
    getTrackDetailsGenerator = fetchTrackDetails({ trackId });
    const res = getTrackDetailsGenerator.next().value;
    expect(JSON.stringify(res)).toEqual(JSON.stringify(select(selectTrackById(trackId))));
    const trackDetailsResponse = null;
    expect(getTrackDetailsGenerator.next(trackDetailsResponse).value).toEqual(call(getTrackDetails, trackId));
    const errorResponse = translate('something_went_wrong');
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: iTunesProviderTypes.FAILURE_GET_TRACK_DETAILS,
        error: errorResponse
      })
    );
  });
});
