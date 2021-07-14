import { takeLatest, call, put, select } from 'redux-saga/effects';
import { iTunesProviderTypes, iTunesProviderCreators } from './reducer';
import { getTracks, getTrackDetails } from '@services/itunesApi';
import { selectTrackById } from './selectors';
// Individual exports for testing
const { REQUEST_GET_TRACK_NAMES, REQUEST_GET_TRACK_DETAILS } = iTunesProviderTypes;
const {
  successGetTrackNames,
  failureGetTrackNames,
  successGetTrackDetails,
  failureGetTrackDetails
} = iTunesProviderCreators;

export function* fetchTracks(action) {
  const response = yield call(getTracks, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackNames(data));
  } else {
    yield put(failureGetTrackNames(data));
  }
}

export function* fetchTrackDetails(action) {
  const track = yield select(selectTrackById(action.trackId));
  if (track) {
    yield put(successGetTrackDetails(track));
  } else {
    const response = yield call(getTrackDetails, action.trackId);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      yield put(failureGetTrackDetails(data));
    }
  }
}

export default function* iTunesProviderSaga() {
  yield takeLatest(REQUEST_GET_TRACK_NAMES, fetchTracks);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, fetchTrackDetails);
}
