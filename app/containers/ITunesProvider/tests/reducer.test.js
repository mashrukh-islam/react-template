// import produce from 'immer'
import { iTunesProviderReducer, initialState, iTunesProviderTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesProvider reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(state);
  });

  it('should return initial state when action of type REQUEST_GET_TRACK_NAMES is dispatched', () => {
    const artistName = 'Opeth';
    const expectedResult = { ...state, artistName };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesProviderTypes.REQUEST_GET_TRACK_NAMES,
        artistName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure track data is present when action of type SUCCESS_GET_TRACK_NAMES is dispatched', () => {
    const data = { resultCount: 0, results: [] };
    const expectedResult = { ...state, tracks: data };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesProviderTypes.SUCCESS_GET_TRACK_NAMES,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return state when action of type CLEAR_TRACK_NAMES is dispatched', () => {
    const expectedResult = { ...state };
    expect(
      iTunesProviderReducer(state, {
        type: iTunesProviderTypes.CLEAR_TRACK_NAMES
      })
    ).toEqual(expectedResult);
  });
});
