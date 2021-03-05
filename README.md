# simple-marvel-web-scraper v0.0.1

An awesome (not really) tool that scrapes marvel's API to get the leaks for Wandavision (this is a joke).

## Goals
- Implement the APIs as simple as possible with minimal setup needed.
- Pass the exam

## Getting Started

1. Clone the repo

`git clone `

2. Go to the project root

`cd simple-marvel-api-scraper`

1. Create your .env file using the contents of .env.sample as template. Add your marvel api credentials:

    - MARVEL_API_PUBLIC_KEY
    - MARVEL_API_PRIVATE_KEY

1. Run `yarn install`
1. To run the test, use `yarn test`
1. Run `yarn start` to start the app
1. Open `http://localhost:8080`

## Available Routes

/s
- Returns the basic details about the app

/docs
- Shows the OpenAPI Spec

/characters
- Returns the ids of marvel characters
- This uses in memory cache. I wanted to build this without using a database or other third party services.

/characters/:id
- Returns additional information about the marve character id

## Changelog
### v0.0.1
- Initial POC release

### TODO
- Make it a full blown scraper that competes with any other scrapers out there (ETA: in another life maybe)

### Notes
- Haven't completed the unit tests since I ran out of time
