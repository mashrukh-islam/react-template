/**
 *
 * TrackCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
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
const CustomImage = styled.img`
  && {
    height: 100px;
    width: 100px;
    padding: 10px;
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
      <Card cover={<CustomImage src={track.artworkUrl100} />}>
        <Meta title={track.trackName} description={albumName} />
        <Row>
          <Col size={1}>
            <T id="performed_by" values={{ artistName }} />
          </Col>
          <Col size={0.5}>
            <p>
              {track.trackPrice}
              {track.currency}
            </p>
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
