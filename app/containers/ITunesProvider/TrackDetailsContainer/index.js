/**
 *
 * TrackDetailsContainer
 *
 */

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { Card, Statistic } from 'antd';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { iTunesProviderCreators } from '../reducer';
import T from '@components/T';
import { makeSelectITunesProvider, selectTrackDetails, selectTrackId, selectTrackDetailsError } from '../selectors';
import saga from '../saga';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxWidth}em;
    width: 100%;
    margin: 0 auto;
  }
`;
const Row = styled.div`
  && {
    display: flex;
  }
`;

const Col = styled.div`
  && {
    flex: ${props => props.size};
  }
`;
export function TrackDetailsContainer({
  trackDetails,
  maxWidth,
  trackDetailsError,
  dispatchClearTrackDetails,
  dispatchFetchTrackDetails
}) {
  const [loading, setLoading] = useState(true);
  useInjectSaga({ key: 'iTunesProvider', saga });
  const { trackId } = useParams();

  useEffect(() => {
    if (loading) {
      dispatchFetchTrackDetails(trackId);
      setLoading(false);
    }
  }, [trackDetails]);
  const renderTrackTime = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };
  return (
    <Container maxWidth={maxWidth}>
      <Card
        cover={<img src={trackDetails.artworkUrl100} />}
        actions={[
          <a href={trackDetails.artistViewUrl} key="artist">
            <T id="view_artist" />
          </a>,
          <a href={trackDetails.collectionViewUrl} key="artist">
            <T id="view_album" />
          </a>,
          <a href={trackDetails.trackViewUrl} key="artist">
            <T id="view_track" />
          </a>
        ]}
      >
        <Row>
          <Col size={1}>
            <Statistic title={<T id="track_name" />} value={trackDetails.trackCensoredName} />
            <Statistic title={<T id="album" />} value={trackDetails.collectionName} />
          </Col>
          <Col size={1}>
            <Statistic title={<T id="track_time" />} value={renderTrackTime(trackDetails.trackTimeMillis)} />
            <Statistic title={<T id="genre" />} value={trackDetails.primaryGenreName} />
          </Col>
        </Row>
        <Row>
          <Col size={1}>
            <Statistic title={<T id="explicitness" />} value={trackDetails.trackExplicitness} />
          </Col>
          <Col size={1}>
            <Statistic title={<T id="artist" />} value={trackDetails.artistName} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchFetchTrackDetails: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func,
  trackDetails: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    collectionViewUrl: PropTypes.string,
    country: PropTypes.string,
    currency: PropTypes.string,
    discCount: PropTypes.number,
    discNumber: PropTypes.number,
    isStreamable: PropTypes.bool,
    kind: PropTypes.string,
    previewUrl: PropTypes.string,
    primaryGenreName: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCensoredName: PropTypes.string,
    trackCount: PropTypes.number,
    trackExplicitness: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
    trackPrice: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    trackViewUrl: PropTypes.string,
    wrapperType: PropTypes.string
  }),
  trackDetailsError: PropTypes.object,
  maxWidth: PropTypes.number
};

TrackDetailsContainer.defaultProps = {
  tracksDetails: {},
  tracksDetailsError: null,
  maxWidth: 50
};

const mapStateToProps = createStructuredSelector({
  iTunesProvider: makeSelectITunesProvider(),
  trackDetails: selectTrackDetails(),
  trackDetailsError: selectTrackDetailsError(),
  trackId: selectTrackId()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails, clearTrackDetails } = iTunesProviderCreators;
  return {
    dispatchFetchTrackDetails: trackId => dispatch(requestGetTrackDetails(trackId)),
    dispatchClearTrackDetails: () => dispatch(clearTrackDetails())
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
