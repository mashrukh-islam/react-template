/**
 *
 * Tests for DetailCard
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import DetailCard from '../index';
import { translate } from '@components/IntlGlobalProvider';

describe('<DetailCard />', () => {
  let trackDetails;

  beforeEach(() => {
    trackDetails = {
      artistViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      artworkUrl100: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4',
      trackViewUrl: 'https://music.apple.com/us/artist/opeth/3196120?uo=4'
    };
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<DetailCard trackDetails={trackDetails} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 DetailCard component', () => {
    const { getAllByTestId } = renderWithIntl(<DetailCard trackDetails={trackDetails} />);
    expect(getAllByTestId('detail-card').length).toBe(1);
  });

  it('should ensure that actions are rendered', () => {
    const { getByTestId } = renderWithIntl(<DetailCard trackDetails={trackDetails} />);
    expect(getByTestId('view-album-text').textContent).toEqual(translate('view_album'));
    expect(getByTestId('view-artist-text').textContent).toEqual(translate('view_artist'));
    expect(getByTestId('view-track-text').textContent).toEqual(translate('view_track'));
  });

  it('should ensure that links have correct source', () => {
    const { getByTestId } = renderWithIntl(<DetailCard trackDetails={trackDetails} />);
    expect(getByTestId('artist-view-link').getAttribute('href')).toBe(trackDetails.artistViewUrl);
    expect(getByTestId('album-view-link').getAttribute('href')).toBe(trackDetails.collectionViewUrl);
    expect(getByTestId('track-view-link').getAttribute('href')).toBe(trackDetails.trackViewUrl);
  });

  it('should ensure that artwork is rendered', () => {
    const { getAllByTestId } = renderWithIntl(<DetailCard trackDetails={trackDetails} />);
    expect(getAllByTestId('artwork-card')).toHaveLength(1);
  });
});
