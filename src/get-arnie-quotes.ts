import { httpGet } from './mock-http-interface';

interface ArnieQuote {
  'Arnie Quote': string;
}
interface Failure {
  FAILURE: string;
}
type TResult = ArnieQuote | Failure;

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const arnieQuoteResults = await Promise.all(urls.map(url => httpGet(url)));
  return arnieQuoteResults.map(result => {
    switch(result.status) {
    case 200:
      return {
        'Arnie Quote': JSON.parse(result.body).message
      }
    default:
      return {
        FAILURE: JSON.parse(result.body).message
      }
  }});  
};
