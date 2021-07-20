/**
 *
 * TrackDetailsContainer
 *
 */

import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { iTunesProviderCreators } from '../reducer';
import If from '@components/If';
import DetailCard from '@components/DetailCard';
import {
  makeSelectITunesProvider,
  selectTrackDetails,
  selectTrackId,
  selectTrackDetailsError,
  selectLoading
} from '../selectors';
import saga from '../saga';

export function TrackDetailsContainer({
  trackDetails,
  maxWidth,
  trackDetailsError,
  dispatchClearTrackDetails,
  dispatchFetchTrackDetails,
  loading
}) {
  useInjectSaga({ key: 'iTunesProvider', saga });
  const { trackId } = useParams();
  useEffect(() => {
    if (!loading) {
      dispatchFetchTrackDetails(trackId);
    }
  }, []);

  useEffect(() => {
    if (!loading && !trackDetails) {
      dispatchClearTrackDetails();
    }
  }, [trackDetails, loading]);

  const renderErrorCard = () => {
    return (
      <Card>
        <If condition={trackDetailsError} otherwise={null}>
          <p>{trackDetailsError}</p>
        </If>
      </Card>
    );
  };
  return (
    <If condition={!loading && trackDetails} otherwise={renderErrorCard()}>
      <DetailCard naxWidth={maxWidth} trackDetails={trackDetails} />
    </If>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchFetchTrackDetails: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func,
  loading: PropTypes.bool,
  trackDetails: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    artistViewUrl: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string.isRequired,
    collectionCensoredName: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    collectionViewUrl: PropTypes.string.isRequired,
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
  trackDetailsError: PropTypes.string,
  maxWidth: PropTypes.number
};

TrackDetailsContainer.defaultProps = {
  trackDetails: null,
  trackDetailsError: null,
  maxWidth: 50
};

const mapStateToProps = createStructuredSelector({
  iTunesProvider: makeSelectITunesProvider(),
  trackDetails: selectTrackDetails(),
  trackDetailsError: selectTrackDetailsError(),
  trackId: selectTrackId(),
  loading: selectLoading()
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
