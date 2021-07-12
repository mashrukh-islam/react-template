/**
 *
 * TrackCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Statistic, Avatar } from 'antd';
import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
import If from '@components/If';
import T from '@components/T';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: ${props => props.padding}em;
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

const CustomPlayer = styled(ReactPlayer)`
  && {
    max-height: 200px;
    min-height: 20px;
    width: 100%;
  }
`;

const { Meta } = Card;
function TrackCard({ track, padding }) {
  const albumName = track.collectionCensoredName;
  const artistName = track.artistName;
  return (
    <Container data-testid="track-card" padding={padding}>
      <Card title={track.trackName} extra={<a href={`/track/${track.trackId}`}>See More</a>}>
        <Row>
          <Col size={1}>
            <Meta
              avatar={<Avatar src={track.artworkUrl100} size={100} />}
              title={albumName}
              description={<Statistic title="Price" value={track.trackPrice} suffix={track.currency} />}
            />
          </Col>
          <Col size={0.5}>
            <Meta
              title={<T id="performed_by" values={{ artistName }} />}
              description={<Statistic title="Released" value={new Date(track.releaseDate).toLocaleDateString()} />}
            />
          </Col>
        </Row>
        <If condition={track.previewUrl} otherwise={null}>
          <CustomPlayer url={track.previewUrl} controls={true} />
        </If>
      </Card>
    </Container>
  );
}

TrackCard.propTypes = {
  padding: PropTypes.number,
  track: PropTypes.object
};

TrackCard.defaultProps = {
  track: {},
  padding: 0
};

export default TrackCard;
