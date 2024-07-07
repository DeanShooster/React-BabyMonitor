export const server = "http://54.247.60.245:8080";

/**
 * Generic error handler. Defined by server error configuration of { Message , status } for errors.
 * @param {Response} responseObject
 * @returns Error object {error , status} or the data object.
 */
export async function errorHandler(responseObject: Response) {
  const result = await responseObject.json();
  if (result.Message) return { error: result.error, status: result.status };
  return result;
}
