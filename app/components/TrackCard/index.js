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

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: ${props => props.padding}em;
  }
`;

function TrackCard({ track, padding }) {
  return (
    <Container data-testid="track-card">
      <Card title={track.trackName}>
        <p>Album : {track.collectionCensoredName}</p>
        <p>Perfomed By : {track.artistName}</p>
        {track.artworkUrl100 ? <img src={track.artworkUrl100} /> : null}
        {track.previewUrl ? <ReactPlayer url={track.previewUrl} controls={true} /> : null}
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
