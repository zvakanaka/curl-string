const cj = require('color-json');

/**
 * Builds a curl command and returns the string.
 * @param  {String} url     Endpoint
 * @param  {Object} options Object with headers, etc. (fetch format)
 * @return {String}         Curl command
 */
function curlString(
  url,
  options,
  curlStringOptions = { colorJson: true, jsonIndentWidth: 2 }
) {
  const method =
    options && options.method && typeof options.method === 'string'
      ? options.method.toUpperCase()
      : 'GET';

  const hasHeaders =
    options && options.headers && typeof options.headers === 'object';
  const hasBody = options && options.body;

  let curl = `\ncurl --request ${method} \\\n--url ${url}${
    hasHeaders || hasBody ? ' \\' : ''
  }`;

  if (hasHeaders) {
    Object.entries(options.headers).forEach(([key, value], i) => {
      curl += `\n--header '${key}: ${value}'${
        hasBody || i < Object.keys(options.headers).length - 1 ? ' \\' : ''
      }`;
    });
  }

  if (hasBody) {
    let parsedData;
    try {
      parsedData = JSON.parse(options.body);
    } catch (e) {
      parsedData = options.body;
    }

    const colorJson = curlStringOptions && curlStringOptions.colorJson;
    const jsonIndentWidth =
      (curlStringOptions && curlStringOptions.jsonIndentWidth) || 2;

    curl += `\n--data '${
      colorJson
        ? cj(parsedData)
        : JSON.stringify(parsedData, null, jsonIndentWidth)
    }'`;
  }

  return curl;
}

module.exports = curlString;
