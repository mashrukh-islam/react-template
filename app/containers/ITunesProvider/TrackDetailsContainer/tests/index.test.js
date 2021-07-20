import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';
import { cleanup } from '@testing-library/react';

describe('<TrackDetailsContainer /> tests', () => {
  let submitSpy;
  let trackDetails;

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    submitSpy = jest.fn();
    trackDetails = {
      artistViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      artworkUrl100: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      trackViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4'
    };
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

  it('should ensure that one Detail Card is rendered', () => {
    const getTrackDetailsSpy = jest.fn();
    const clearTrackDetailsSpy = jest.fn();
    const { getAllByTestId } = renderProvider(
      <TrackDetailsContainer
        dispatchFetchTrackDetails={getTrackDetailsSpy}
        dispatchClearTrackDetails={clearTrackDetailsSpy}
        trackDetails={trackDetails}
      />
    );
    expect(getAllByTestId('detail-card')).toHaveLength(1);
  });
});
