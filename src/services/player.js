import {axiosClient} from '../lib/axios';

export const getPlayer = async ({url}) => {
  return await axiosClient.post('/apps/playerV2', {
    url: url,
    device: "roku",
    cdnip: 161,
  });
};
