// @flow
import { IS_SYNC, USE_CACHE } from "beinformed/constants/Constants";
import serverFetch from "beinformed/utils/fetch/serverFetch";
import xhr from "beinformed/utils/fetch/xhr";
import Cache from "beinformed/utils/browser/Cache";

/**
 * Request data from server, uses server datafetcher or xhr in browser.
 *
 * @param  {Object} args - Request arguments.
 * @return {Promise|Object} - Returns a Promise when in the client, a response when in the server.
 */
export default function universalFetch(args: Object): Promise<any> {
  // Set locale as Accept-Language header
  if (args.locale) {
    args.headers = {
      "Accept-Language": args.locale
    };
  }

  if (args.includeContext) {
    args.url = `${args.url}?includeContext=true`;
  }

  // server side no access to the browser cache apis, no cache available
  if (IS_SYNC) {
    return serverFetch(args);
  }

  if (USE_CACHE && args.cache) {
    const cacheKey = Cache.createResourceKey(args);

    if (Cache.hasItem(cacheKey)) {
      const cacheItem = Cache.getItem(cacheKey);

      if (cacheItem && typeof cacheItem === "object") {
        return Promise.resolve(cacheItem);
      }
    }
  }

  return xhr(args).then(response => {
    if (USE_CACHE && args.cache) {
      const cacheKey = Cache.createResourceKey(args);

      Cache.addItem(cacheKey, response);
    }

    return response;
  });
}
