const { Client } = require('pg');
const dbName =
  process.env.NODE_ENV === 'test' ? 'getthegist_test' : 'getthegist';

const client = new Client({
  connectionString: `postgresql://localhost/${dbName}`
});

client.connect();

module.exports = client;
