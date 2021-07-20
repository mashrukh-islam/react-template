import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';
import { cleanup } from '@testing-library/react';
import { translate } from '@components/IntlGlobalProvider';

describe('<TrackDetailsContainer /> tests', () => {
  let submitSpy;
  let trackDetails;

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    submitSpy = jest.fn();
    trackDetails = { artistViewUrl: '', artworkUrl100: '', collectionViewUrl: '', trackViewUrl: '' };
  });

  it('should render and match snapshot', () => {
    const { baseElement } = renderProvider(
      <TrackDetailsContainer dispatchFetchTrackDetails={submitSpy} trackDetails={trackDetails} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchFetchTrackDetails on mounting', async () => {
    const getTrackDetailsSpy = jest.fn();
    const clearTrackDetailsSpy = jest.fn();
    renderProvider(
      <TrackDetailsContainer
        dispatchFetchTrackDetails={getTrackDetailsSpy}
        dispatchClearTrackDetails={clearTrackDetailsSpy}
        trackDetails={trackDetails}
      />
    );
    await timeout(1000);
    expect(getTrackDetailsSpy).toBeCalled();
  });

  it('should ensure that artwork is rendered', async () => {
    const { getAllByTestId } = renderProvider(
      <TrackDetailsContainer dispatchFetchTrackDetails={submitSpy} trackDetails={trackDetails} />
    );
    expect(getAllByTestId('artwork-card')).toHaveLength(1);
  });

  it('should ensure that actions are rendered', async () => {
    const { getByTestId } = renderProvider(
      <TrackDetailsContainer dispatchFetchTrackDetails={submitSpy} trackDetails={trackDetails} />
    );
    expect(getByTestId('view-album-text').textContent).toEqual(translate('view_album'));
    expect(getByTestId('view-artist-text').textContent).toEqual(translate('view_artist'));
    expect(getByTestId('view-track-text').textContent).toEqual(translate('view_track'));
  });

  it('should ensure that links have correct source', async () => {
    const { getByTestId } = renderProvider(
      <TrackDetailsContainer dispatchFetchTrackDetails={submitSpy} trackDetails={trackDetails} />
    );
    expect(getByTestId('artist-view-link').getAttribute('href')).toBe('');
    expect(getByTestId('album-view-link').getAttribute('href')).toBe('');
    expect(getByTestId('track-view-link').getAttribute('href')).toBe('');
  });
});
