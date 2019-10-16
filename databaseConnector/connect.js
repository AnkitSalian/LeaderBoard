const {Pool, Client} = require('pg');
const config = require('config');

const pool = new Pool(config.get('dbConfig'));

module.exports = pool;