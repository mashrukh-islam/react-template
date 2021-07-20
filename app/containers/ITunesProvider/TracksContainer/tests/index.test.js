import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';

import { TracksContainerTest as TracksContainer } from '../index';

describe('<TracksContainer/> tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match snapshot', () => {
    const { baseElement } = renderProvider(<TracksContainer dispatchFetchTracks={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change', async () => {
    const getTracksSpy = jest.fn();
    const clearTracksSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <TracksContainer dispatchFetchTracks={getTracksSpy} dispatchClearTracks={clearTracksSpy} />
    );
    fireEvent.change(getByTestId('tracks-search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getTracksSpy).toBeCalled();
    fireEvent.change(getByTestId('tracks-search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearTracksSpy).toBeCalled();
  });

  it('should call dispatchFetchTracks on change', async () => {
    const { getByTestId } = renderProvider(<TracksContainer dispatchFetchTracks={submitSpy} />);
    fireEvent.change(getByTestId('tracks-search-bar'), {
      target: { value: 'some artist' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
