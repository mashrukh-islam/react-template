import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getTrackDetails, getTracks } from '../itunesApi';

describe('iTunes Api tests', () => {
  const artistName = 'Opeth';
  const trackId = 123456;
  it('should make the api call to "search?term=" ', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      resultCount: 1,
      results: [{ artistName }]
    };
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getTracks(artistName);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    const data = {
      resultCount: 1,
      results: [{ trackId }]
    };
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await getTrackDetails(trackId);
    expect(res.data).toEqual(data);
  });
});
