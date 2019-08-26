import fetch from 'isomorphic-unfetch';
import wretch from 'wretch';

/**
 * Given a host, return the API base URL
 * Ensures the API uses the correct URL in the dev environment
 *
 * @param {string} host Host url
 *
 * @return {string}
 */
const getBaseUrl = host => {
  let url;
  if (process.browser) {
    url = host.includes('localhost')
      ? `http://${host}/api`
      : `https://${host}/api`;
  } else {
    const isDev = process.env.NODE_ENV !== 'production';
    url = isDev ? `http://${host}/api` : `https://${host}/api`;
  }
  console.log(`API base url: ${url}`);
  return url;
};

/**
 * Return base API instance with default options
 *
 * @param {string} host Host url
 *
 * @return {wretch}
 */
const api = host => wretch().url(getBaseUrl(host));

/**
 * GET /health
 * Health status check
 *
 * @param {string} host Host url
 *
 * @return {Promise} Resolves to JSON object
 */
export function healthCheck(host) {
  const url = `${getBaseUrl(host)}/health`;
  console.log(`Making API request to ${url} via wretch`);
  return api(host)
    .url('/health')
    .get()
    .json();
}

export function healthCheckFetch(host) {
  const url = `${getBaseUrl(host)}/health`;
  console.log(`Making API request to ${url} via fetch`);
  return fetch(url).then(res => {
    if (res && res.status === 200) {
      return res.json();
    } else {
      throw new Error(res.statusText);
    }
  });
}
