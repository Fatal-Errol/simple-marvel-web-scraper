import NodeCache from 'node-cache';
import { expirySeconds, sleepSeconds, maxRetry } from '../config/cache';

const cache = new NodeCache();

export const getCacheData = async key => {
  let isUpdating = cache.get(`${key}_is_updating`);

  if (!isUpdating) {
    return cache.get(key);
  }

  // Let's retry until we timeout.
  // Disable the linter rule here since I need the synchronous approach here
  /* eslint-disable no-await-in-loop */
  for (let tries = 1; tries <= maxRetry && isUpdating; tries += 1) {
    await new Promise(resolve => setTimeout(resolve, sleepSeconds));
    isUpdating = cache.get(`${key}_is_updating`);
  }
  /* eslint-enable no-await-in-loop */


  if (isUpdating) {
    // Error out after the attempts
    throw new Error('Cache is updating, please try again in a bit...');
  }

  return cache.get(key);
};

export const setCacheData = async (key, refreshPromise) => {
  cache.set(`${key}_is_updating`, 1);

  const data = await refreshPromise;

  cache.set(key, data, expirySeconds);
  cache.set(`${key}_is_updating`, 0);

  return data;
};
