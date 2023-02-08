# request -> cURL string
Debug API calls by printing human-readable cURL strings

## Motivation
- [cURL](https://curl.haxx.se/) is the most well-known command line tool for API calls
- Logging cURL commands to the console helps debug API calls
- cURL commands are easy to read (when printed in human readable format)
- cURL commands can be pasted into a terminal or [Postman](https://learning.getpostman.com/docs/postman/collections/data_formats/#importing-postman-data)

## Usage
```js
import curlString from 'curl-string';
const debug = true;

const url = 'http://example.com';
const options = {
  method: 'post',
  headers: { accept: 'application/json', 'accept-language': 'en' },
  body: { hello: 'world' }
};

if (debug) {
  console.log(curlString(url, options));  
}
// make real call here, e.g. fetch(url, options);
```
Output:  
![screenshot](https://imgur.com/FRlmfLR.png)

### Advanced Usage
`curlString` supports an optional 3rd parameter config object:
```js
const curlStringOptions = { colorJson: true, jsonIndentWidth: 2}; // (these are the defaults)
const str = curlString(url, options, curlStringOptions);
```

## Versions
### 3.0.x
Converted to [ESM](https://github.com/sindresorhus/meta/discussions/15) (`import` instead of `require`).
### 2.x.x 
Use this version if you still need `require` syntax (CommonJS).

