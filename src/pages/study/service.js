import Request from '../../utils/request';
import {stringify} from 'qs';

export const getStudyByStatus = params => Request({
  url: `/api/studies/status?${stringify(params)}`,
  method: 'GET',
});

export const queryStudies = params => Request({
  url: `/api/studies?${stringify(params)}`,
  method: 'GET',
});
export const queryStudiesShared = params => Request({
  url: `/api/studies/shared?${stringify(params)}`,
  method: 'GET',
});

