# simple-marvel-web-scraper v0.0.1

An awesome (not really) tool that scrapes marvel's API to get the leaks for Wandavision (this is a joke).

## Goals
- Implement the APIs as simple as possible with minimal setup needed.
- Pass the exam

## Getting Started

1. Clone the repo

`git clone https://github.com/Fatal-Errol/simple-marvel-web-scraper.git`

2. Go to the project root

`cd simple-marvel-api-scraper`

1. Create your .env file using the contents of `.env.sample` as template. 
Add your marvel api credentials, you can leave the rest as is.

    - MARVEL_API_PUBLIC_KEY
    - MARVEL_API_PRIVATE_KEY

1. Run `yarn install`
1. To run the test, use `yarn test`
1. Run `yarn start` to start the app
1. Open `http://localhost:8080`

## Available Routes

/
- Returns the basic details about the app

/docs
- Shows the documentation page

/characters
- Returns the ids of marvel characters

/characters/:id
- Returns additional information about the marvel character id

## Caching Strategy

### Initialization
The `/characters` endpoint uses asynchronous calls to get all the marvel character ids in less than 30 seconds.
The result is stored in an in-memory cache that auto expires after a day. Any succeeding call to this endpoint will
use the cache.

### Updating
Once the cache expires, the script calls the third party API again to refresh it. We can assume that marvel 
characters are not typically updated multiple times a day. If there are new 
characters being added to their database, then it might be done on a certain period and probably in bulk. 
Updating the cache once a day should be enough but a configurable time and a manual trigger should cover other 
edge cases (src/config/cache.js).
 
### Concurrency Considerations 
A semaphore is created while an API call triggers the refresh command. This will prevent other concurrent calls 
from execute multiple refresh commands by checking if the semaphore exists. While the cache is being updated,
the other concurrent calls wait and checks the semaphore every 5 seconds. When the semaphore is released, those calls
can now read the cache.

If the other concurrent calls waited for more than 25 seconds, the API errors out with a "retry again" message.
Usually the refresh takes 10-15 seconds so it should not normally come to this.

### Why not cache the data in /characters/:id?
It doesn't add value since the marvel api returns fast. We might consider this
if we have a lot of traffic and our 3000 daily limit is being hit
frequently. I'm confident that this will not happen but who knows the future.

### Why not use a DB?
I want this to have a very small third party service dependency. In-memory cache works with this kind of data since
the characters isn't updated frequently so the numbers should not jump significantly even after a few years
(unless antman finds an antqueen and creates superhero antbabies).

## Changelog
### v0.0.1
- Initial POC release

### TODO
- Make it a full blown scraper that competes with any other scrapers out there (ETA: in another life maybe)

### Notes
- Haven't completed the unit tests since I ran out of time. Hopefully this is enough. Thanks
