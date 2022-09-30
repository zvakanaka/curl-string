const cj = require('color-json');
const hasOwnProperty = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

module.exports = curlString;

/**
 * Builds a curl command and returns the string.
 * @param  {String} url               Endpoint
 * @param  {Object} options           Object with headers, etc. (fetch format)
 * @param  {Object} [curlStringOptions={colorJson:true,jsonIndentWidth:2}] Formatting options
 * @return {String}                   cURL command
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

  let curl = `curl --request ${method} \\\n--url ${url}${
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
    curl += `\n--data '${bodyToDataString(options, curlStringOptions)}'`
  }

  return curl;
}

function getHeader(options, headerKeyName) {
  // return header that matches case, but if not found fall back to header that does not match case
  return options.headers[headerKeyName] || options.headers[Object.keys(options.headers).find(key => key.toLowerCase() === headerKeyName.toLowerCase())]
}

function hasHeader(options, headerKeyName) {
  return hasOwnProperty(options, 'headers') &&
    Object.keys(options.headers)
      .find(header => headerKeyName === header.toLowerCase());
}

/**
 * Constructs a body string for use inside --data
 * @param  {Object} options           Object with headers, etc. (fetch format)
 * @param  {Object} curlStringOptions Formatting options
 * @return {String}                   cURL command data string
 */
function bodyToDataString(options, curlStringOptions) {
  let parsedData;
  try {
    parsedData = JSON.parse(options.body);
  } catch (e) {
    // fall back to original body if it could not be parsed as JSON
    parsedData = options.body;
  }

  // return an ampersand delimited string
  if (hasHeader(options, 'content-type') &&
      getHeader(options, 'content-type').toLowerCase() === 'application/x-www-form-urlencoded') {
    if (typeof parsedData === 'string') {
      return parsedData;
    } else {
      return Object.entries(parsedData)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
    }
  } else {
    const colorJson = curlStringOptions && curlStringOptions.colorJson;
    const jsonIndentWidth =
      (curlStringOptions && curlStringOptions.jsonIndentWidth) || 2;

    return colorJson
      ? cj(parsedData)
      : JSON.stringify(parsedData, null, jsonIndentWidth);
  }
}
