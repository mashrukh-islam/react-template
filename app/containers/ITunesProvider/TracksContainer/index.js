/**
 *
 * TracksContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Input, Skeleton } from 'antd';
import styled from 'styled-components';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import {
  makeSelectITunesProvider,
  selectTracksData,
  selectArtistName,
  selectTracksError,
  selectLoading
} from '../selectors';
import For from '@components/For';
import { iTunesProviderCreators } from '../reducer';
import saga from '../saga';
import TrackCard from '@components/TrackCard';

const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxWidth}em;
    width: 100%;
    margin: 0 auto;
  }
`;
export function TracksContainer({
  maxWidth,
  dispatchFetchTracks,
  dispatchClearTracks,
  artistName,
  tracks,
  tracksError,
  loading
}) {
  useInjectSaga({ key: 'iTunesProvider', saga });

  useEffect(() => {
    if (artistName && !tracks?.results?.length && loading) {
      dispatchFetchTracks(artistName);
    } else if (tracks && loading) {
      dispatchClearTracks();
    }
  }, [tracks]);

  const handleOnChange = aName => {
    if (!isEmpty(aName)) {
      dispatchFetchTracks(aName);
    } else {
      dispatchClearTracks();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const renderTracks = () => {
    const trackList = get(tracks, 'results', []);
    return (
      (trackList.length || loading) && (
        <Skeleton loading={loading} active>
          <For
            noParent
            of={trackList}
            renderItem={(track, index) => {
              return <TrackCard key={index} track={track} padding={0.5} />;
            }}
          />
        </Skeleton>
      )
    );
  };
  return (
    <Container maxWidth={maxWidth}>
      <Search
        data-testid="tracks-search-bar"
        defaultValue={artistName}
        type="text"
        onChange={event => debouncedHandleOnChange(event.target.value)}
        onSearch={searchText => debouncedHandleOnChange(searchText)}
      />
      {renderTracks()}
    </Container>
  );
}

TracksContainer.propTypes = {
  dispatchFetchTracks: PropTypes.func,
  dispatchClearTracks: PropTypes.func,
  maxWidth: PropTypes.number,
  artistName: PropTypes.string,
  tracks: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  loading: PropTypes.bool,
  tracksError: PropTypes.string
};

TracksContainer.defaultProps = {
  maxWidth: 50,
  tracks: {},
  tracksError: null
};

const mapStateToProps = createStructuredSelector({
  iTunesProvider: makeSelectITunesProvider(),
  tracks: selectTracksData(),
  tracksError: selectTracksError(),
  artistName: selectArtistName(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackNames, clearTrackNames } = iTunesProviderCreators;
  return {
    dispatchFetchTracks: artistName => dispatch(requestGetTrackNames(artistName)),
    dispatchClearTracks: () => dispatch(clearTrackNames())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TracksContainer);

export const TracksContainerTest = compose(injectIntl)(TracksContainer);
