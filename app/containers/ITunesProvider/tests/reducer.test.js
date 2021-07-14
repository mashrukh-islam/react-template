// import produce from 'immer'
import { iTunesProviderReducer, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ITunesProvider reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(state);
  });
});
