import RestClient from 'flex-rest-client';
import { makeRequest } from '../lib/helper'

let restClient = new RestClient();
restClient.config({
  baseUrl: '',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  requestMethod: makeRequest,
  genQueryStringFunctions: {
    genSortParam: function (obj) {
      let sortArr = [];
      Object.keys(obj).forEach((attr) => {
        sortArr.push(attr + ' ' + ((obj[attr] != 1) ? 'DESC' : 'ASC'));
      });
      return {
        key: 'sort',
        value: sortArr.join(',')
      };
    },
    genIncludeParam: function (arr) {
      return {
        key: 'populate',
        value: arr.join(',')
      };
    }
  }

});

export default restClient;