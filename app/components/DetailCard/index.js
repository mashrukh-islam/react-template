/**
 *
 * DetailCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Statistic } from 'antd';

import { T } from '@components/T';

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
function DetailCard({ maxWidth, trackDetails }) {
  const renderTrackTime = millis => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <Container maxWidth={maxWidth} data-testid="detail-card">
      <Card
        data-testid="artwork-card"
        cover={<img src={trackDetails.artworkUrl100} />}
        actions={[
          <a href={trackDetails.artistViewUrl} key="artist" data-testid="artist-view-link">
            <T id="view_artist" data-testid="view-artist-text" />
          </a>,
          <a href={trackDetails.collectionViewUrl} key="artist" data-testid="album-view-link">
            <T id="view_album" data-testid="view-album-text" />
          </a>,
          <a href={trackDetails.trackViewUrl} key="artist" data-testid="track-view-link">
            <T id="view_track" data-testid="view-track-text" />
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

DetailCard.propTypes = {
  maxWidth: PropTypes.number,
  trackDetails: PropTypes.object
};

DetailCard.defaultProps = {
  maxWidth: 50,
  trackDetails: null
};

export default DetailCard;
