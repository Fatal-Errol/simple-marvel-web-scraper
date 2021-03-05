import axios from 'axios';
import md5 from 'md5';

import {
  baseUrl, apiKey, apiSecret, fetchLimit
} from '../config/marvel';

import { appEnv } from '../config/app';

async function fetch(path, selectCallback = null, otherParams = {}) {
  const ts = Date.now();

  const params = {
    ...otherParams,
    apikey: apiKey,
    ts,
    hash: md5(ts + apiSecret + apiKey),
  };

  const response = await axios.get(`${baseUrl}/${path}`, { params });

  const {
    data: {
      data: { results, total },
    },
  } = response;

  const data = selectCallback ? selectCallback(results) : response;

  return { data, total };
}

async function fetchPaginatedCollection(
  path,
  selectCallback = null,
  orderBy = 'name'
) {
  const asyncRequests = [];

  // Let's get the first page so that we can get the total
  const { data, total: apiTotal } = await fetch(path, selectCallback, {
    orderBy,
    limit: fetchLimit,
    offset: 0,
  });

  const maxPage = Math.ceil(apiTotal / fetchLimit);

  // start with 2 because we already fetched the first record
  for (let page = 2; page <= maxPage; page += 1) {
    // let's call them in parallel
    asyncRequests.push(
      fetch(path, selectCallback, {
        orderBy,
        limit: fetchLimit,
        offset: (page - 1) * fetchLimit,
      })
    );
  }

  let aggData = data;

  // Disable the linter rule here since I need the synchronous approach here
  /* eslint-disable no-await-in-loop */
  /* eslint-disable no-restricted-syntax */
  for (const asyncFunc of asyncRequests) {
    const { data: currentData } = await asyncFunc;

    aggData = [ ...aggData, ...currentData ];
  }
  /* eslint-enable no-await-in-loop */
  /* eslint-enable no-restricted-syntax */

  return { data: aggData, total: apiTotal };
}

const fetchCharacterIds = async () => {
  const { data, total } = await fetchPaginatedCollection(
    'characters',
    items => items.reduce(
      (accumulator, currentValue) => [ ...accumulator, currentValue.id ],
      []
    ),
    'name'
  );

  if (total !== data.length) {
    throw new Error(`Fetch error: Expecting ${total} got ${data.length}.`);
  }

  return data;
};

const fetchCharacterInfoById = async id => {
  const { data } = await fetch(`characters/${parseInt(id, 10)}`, items => items.reduce(
    (accumulator, currentValue) => [ ...accumulator, currentValue ],
    []
  ));

  return data.shift();
};

const errorParser = error => {
  if (error.response) {
    const {
      response: {
        status: code,
        data: { message, status },
      },
    } = error;

    return {
      code,
      message: status || message,
      trace: appEnv !== 'production' ? error.stack : null,
    };
  }

  return {
    code: 500,
    message: error.message,
    trace: appEnv !== 'production' ? error.stack : null,
  };
};

export { fetchCharacterIds, fetchCharacterInfoById, errorParser };
