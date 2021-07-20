import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { TrackDetailsContainerTest as TrackDetailsContainer } from '../index';
import { cleanup } from '@testing-library/react';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn(),
//   useRouteMatch: jest.fn()
// }));

describe('<TrackDetailsContainer /> tests', () => {
  let submitSpy;
  let trackDetails;

  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    submitSpy = jest.fn();
    trackDetails = { artistViewUrl: '' };
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
});
