import {axiosClient} from '../lib/axios';

export const signInService = async ({userName, password}) => {
  return await axiosClient.post('/apps/login', {
    user: userName,
    senha: password,
    opid: '1',
  });
};
