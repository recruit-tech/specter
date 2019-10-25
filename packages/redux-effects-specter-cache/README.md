# redux-effects-specter-cache

Caching middleware for
[@specter/redux-effects-specter](https://www.npmjs.com/package/@specter/redux-effects-specter).

## Installation

```
npm install --save @specter/redux-effects-specter \     # peer dependency
                   @specter/redux-effects-specter-cache
```

## Usage

Installing the middleware:

```javascript
import { createStore, applyMiddleware } from 'redux';
import { Client } from '@specter/specter';
import stepsMiddleware from 'redux-effects-steps';
import specterMiddleware from '@specter/redux-effects-specter';
import specterCacheMiddleware from '@specter/redux-effects-specter-cache';
import rootReducer from './reducers';

const client = new Client({
  base: '/xhr'
});

const cacheConfig = {
  max: 500,
  maxAge: 1000 * 60 * 60
};

const cacheMiddlewareConfig = {
  excludes: [
    "greet" // expected service name of specter
  ]
}

const store = createStore(
  rootReducer,
  applyMiddleware(
    stepsMiddleware,
    specterCacheMiddleware({ cacheConfig, cacheMiddlewareConfig }),
    specterMiddleware(fetchr)
  )
);

```
redux-effects-specter-cache must be applied **before** redux-effects-specter.

## API

### Middleware

#### `specterCacheMiddleware(cacheConfig, [options])`

Creates redux middleware.

##### Arguments

* `cacheConfig` *(Object)*: See
  [lru-cahce API docs](https://www.npmjs.com/package/lru-cache)
  for more info.
* `options` *(Object)*:
    * `excludes` *(Array)*: An array of the resource names to not use the cache.
      Defaults `[]`.
    * `fromCache` *(Function)*: Checks whether an action is target to obtain from cache.
      Defaults `() => true`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, uses cache to obtain the resource.
    * `toCache` *(Function)*: Checks whether an action is target to store to cache.
      Defaults `() => true`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, saves the obtaining resource to cache.
    * `resetCache` *(Function)*: reset cache if resetCache function returns true.
      Defaults `() => false`.
        * Arguments:
            * `action` *(Object)*: An action.
            * `state` *(Object)*: The current state of the Store.
        * Returns:
            * *(Boolean)*: If `true`, reset all cache.

##### Returns

* *(Function)*: Redux middleware.