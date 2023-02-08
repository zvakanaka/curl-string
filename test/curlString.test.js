import curlString from '../index.js';

test('To return a cURL for just a URL', () => {
  expect(curlString('http://example.com')).toBe(`curl --request GET \\
--url http://example.com`);
});

test('To handle lowercase `post` and a body', () => {
  expect(
    curlString(
      'http://example.com',
      { method: 'post', body: { hello: 'world' } },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--data '{
  "hello": "world"
}'`);
});

test('To handle lowercase `post` and a stringified body', () => {
  expect(
    curlString(
      'http://example.com',
      { method: 'post', body: JSON.stringify({ hello: 'world' }) },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--data '{
  "hello": "world"
}'`);
});

test('To handle custom JSON indent width', () => {
  expect(
    curlString(
      'http://example.com',
      { method: 'post', body: { hello: 'world' } },
      { colorJson: false, jsonIndentWidth: 3 }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--data '{
   "hello": "world"
}'`);
});

test('To handle just a header', () => {
  expect(
    curlString(
      'http://example.com',
      { headers: { accept: 'application/json' } },
      { colorJson: false }
    )
  ).toBe(`curl --request GET \\
--url http://example.com \\
--header 'accept: application/json'`);
});

test('To handle just headers', () => {
  expect(
    curlString(
      'http://example.com',
      { headers: { accept: 'application/json', 'accept-language': 'en' } },
      { colorJson: false }
    )
  ).toBe(`curl --request GET \\
--url http://example.com \\
--header 'accept: application/json' \\
--header 'accept-language: en'`);
});

test('To handle colorized JSON', () => {
  expect(
    curlString(
      'http://example.com',
      { method: 'post', body: { hello: 'world' } },
      { colorJson: true }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--data '[33m{
  [0m[37m"hello":[33m [0m[32m"world"[33m
}[0m'`);
});

test('To handle a header and a body', () => {
  expect(
    curlString(
      'http://example.com',
      {
        method: 'post',
        headers: { accept: 'application/json' },
        body: { hello: 'world' }
      },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--header 'accept: application/json' \\
--data '{
  "hello": "world"
}'`);
});

test('To handle headers and a body', () => {
  expect(
    curlString(
      'http://example.com',
      {
        method: 'post',
        headers: { accept: 'application/json', 'accept-language': 'en' },
        body: { hello: 'world' }
      },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--header 'accept: application/json' \\
--header 'accept-language: en' \\
--data '{
  "hello": "world"
}'`);
});

test('To handle x-www-form-urlencoded content-type header and JSON body', () => {
  expect(
    curlString(
      'http://example.com',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'accept-language': 'en',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: { hello: 'world', inTheWorld: true, ofTheWorld: false }
      },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--header 'accept: application/json' \\
--header 'accept-language: en' \\
--header 'content-type: application/x-www-form-urlencoded' \\
--data 'hello=world&inTheWorld=true&ofTheWorld=false'`);
});

test('To handle x-www-form-urlencoded content-type header and already URL encoded body', () => {
  expect(
    curlString(
      'http://example.com',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'accept-language': 'en',
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: 'hello=world&inTheWorld=true&ofTheWorld=false'
      },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--header 'accept: application/json' \\
--header 'accept-language: en' \\
--header 'content-type: application/x-www-form-urlencoded' \\
--data 'hello=world&inTheWorld=true&ofTheWorld=false'`);
});


test('To handle x-www-form-urlencoded content-type header of different case and already URL encoded body', () => {
  expect(
    curlString(
      'http://example.com',
      {
        method: 'post',
        headers: {
          accept: 'application/json',
          'accept-language': 'en',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'hello=world&inTheWorld=true&ofTheWorld=false'
      },
      { colorJson: false }
    )
  ).toBe(`curl --request POST \\
--url http://example.com \\
--header 'accept: application/json' \\
--header 'accept-language: en' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data 'hello=world&inTheWorld=true&ofTheWorld=false'`);
});

