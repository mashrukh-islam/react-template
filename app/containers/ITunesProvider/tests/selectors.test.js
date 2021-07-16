import { selectITunesProviderDomain, selectTracksData, selectArtistName, selectTracksError } from '../selectors';

describe('ITunesProvider selector tests', () => {
  let artistName;
  let tracks;
  let tracksError;
  let mockedState;

  beforeEach(() => {
    artistName = 'Opeth';
    tracks = { resultCount: 0, results: [] };
    tracksError = 'Internal Server Error';
    mockedState = {
      iTunesProvider: {
        artistName,
        tracks,
        tracksError
      }
    };
  });

  it('should select the iTunesProvider state', () => {
    expect(selectITunesProviderDomain(mockedState)).toEqual(mockedState.iTunesProvider);
  });

  it('should select the artistName', () => {
    const artistSelector = selectArtistName();
    expect(artistSelector(mockedState)).toEqual(artistName);
  });

  it('should select the tracksData', () => {
    const tracksSelector = selectTracksData();
    expect(tracksSelector(mockedState)).toEqual(tracks);
  });

  it('should select the tracksError', () => {
    const errorSelector = selectTracksError();
    expect(errorSelector(mockedState)).toEqual(tracksError);
  });
});
