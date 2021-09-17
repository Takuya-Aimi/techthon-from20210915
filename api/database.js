const { Pool } = require('pg');

module.exports = class database {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
    });
  }
  init = async () => {
    this.client = await this.pool.connect();
  }
  txBegin = async () => {
    try {
      const result = await this.client.query('BEGIN;');
    }
    catch (err) {
      throw err;
    }
  }
  txCommit = async () => {
    try {
      const result = await this.client.query('COMMIT;');
    }
    catch (err) {
      throw err;
    }
  }
  txRollback = async () => {
    try {
      const result = await this.client.query('ROLLABACK;');
    }
    catch (err) {
      throw err;
    }
  }
  release = () => {
    this.client.release();
  }
  query = async param => {
    try {
      const result = await this.client.query(param);
      return result ? result.rows : [];
    }
    catch (err) {
      throw err;
    }
  }
};
