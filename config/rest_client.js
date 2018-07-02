import restClient from 'flex-rest-client';
import { makeRequest } from '../lib/helper'

restClient.config({
  baseUrl: '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  requestMethod: makeRequest
});

export default restClient;