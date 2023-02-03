export type Options = {
  method?: string,
  headers?: object,
  body?: object | string
};

export type CurlStringOptions = {
  colorJson: boolean,
  jsonIndentWidth: number,
}

/**
 * Builds a human readable cURL command and returns the string.
 * @param {string} url - JSON object to highlighter.
 * @param {Options} [options] - A map with the ANSI characters for each supported color.
 * @param {CurlStringOptions} [curlStringOptions] - An object to configure the coloring.
 * @returns {string} cURL command
 */
export default function curlString(
  url: string,
  options?: Options,
  curlStringOptions?: CurlStringOptions,
): string

