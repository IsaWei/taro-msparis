import Request from '../../utils/request';

export const login = data => Request({
  url: '/api/login',
  method: 'POST',
  data,
});
