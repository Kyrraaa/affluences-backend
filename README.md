# Affluences Backend - API

## Description

Develop an api route that checks if a resource is reservable.

## Prerequisites

To run the Affluences Backend project, you need to have the following installed on your system:

- Node.js (version 12 or above)
- Yarn or NPM package manager

## Installation

1. Clone this repository from GitHub.
2. Navigate to the project directory.
3. Run the following command to install the dependencies:

```shell
yarn install
```

## Routes

This route returns reservations for a given resource for a date

**URI** : /api/available

**Method** : GET

**Parameters**

| name | type | required |
| ------ | ------ | ------|
| date | date in format YYYY-MM-DD HH:MM:SS | yes |
| resourceId | int | yes |

**Example**

GET http://127.0.0.1:3000/api/available?date=2023-05-29%2010:30:00&resourceId=1337

Response

```json
{
    "available": false
}
```

## Testing
This project includes a comprehensive test suite to ensure its functionality. To run the tests, follow these steps:

1. Make sure you are in the project directory.
2. Run the following command:

```shell
yarn test
```