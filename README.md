## Get the gist is a Github Gist clone

#### built with Node.js and Express.js

### To run backend locally:

1. Fork/clone the repository
2. cd into repo's folder
3. `npm install`
4. `psql < schema.sql`
5. `node server.js`

### Tests:

1. `npm test`

### Endpoints

#### '/gist'

GET: returns an array of gists
POST: creates a new gist and returns that gist

#### '/gist/:gistID

GET: returns the specified gist by ID
PATCH: updates specified gist
DELETE: destroys speficied gist
