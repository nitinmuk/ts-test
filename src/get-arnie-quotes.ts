import { httpGet } from './mock-http-interface';

interface ArnieQuote {
  'Arnie Quote': string;
}
interface Failure {
  FAILURE: string;
}
type TResult = ArnieQuote | Failure;

/**
 * maps given httpGet function response object to TResult object
 * @param httpGetResponse response of httpGet function
 * @returns TResult
 */
const mapResponse = (httpGetResponse: {status: number, body: string}): TResult => {
  switch(httpGetResponse.status) {
    case 200:
      return {
        'Arnie Quote': JSON.parse(httpGetResponse.body).message
      }
    default:
      return {
        FAILURE: JSON.parse(httpGetResponse.body).message
      }
  }
}

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const arnieQuoteResponses = await Promise.all(urls.map(url => httpGet(url)));
  return arnieQuoteResponses.map(response => mapResponse(response));  
};
