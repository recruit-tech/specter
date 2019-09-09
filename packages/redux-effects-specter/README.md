# redux-effects-specter

[specter](https://github.com/recruit-tech/specter)
binding for
[redux-effects](https://www.npmjs.com/package/redux-effects)
family.

## Installation

```
npm install --save redux-effects-specter
```

## Usage

Installing the middleware:

```javascript
import { createStore, applyMiddleware } from 'redux';
import { Client } from '@specter/specter';
import stepsMiddleware from 'redux-effects-steps';
import specterMiddleware from '@specter/redux-effects-specter';
import rootReducer from './reducers';

const client = new Client({
  base: '/xhr'
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    stepsMiddleware,
    fetchrMiddleware(fetchr)
  )
);
```

Defining action creators:

```javascript
import { createAction } from 'redux-actions';
import { steps } from 'redux-effects-steps';
import { specterRead } from '@specter/redux-effects-specter';

const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
const fetchUserFail = createAction('FETCH_USER_FAIL');

function fetchUser(user) {
  return steps(
    fetchUserRequest(),
    specterRead('users', { user }),
    [fetchUserSuccess, fetchUserFail]
  );
}
```

## API (Action Creators)

### specterCreate

- types

```
(service: string, options: { query?: object; body?: object; headers?: object } = {}): Promise
```

### specterUpdate

- types

```
(service: string, options: { query?: object; body?: object; headers?: object } = {}): Promise
```

### specterDelete

- types

```
(service: string, options: { query?: object; headers?: object } = {}): Promise
```

### specterRead

- types

```
(service: string, options: { query?: object; headers?: object } = {}): Promise
```
