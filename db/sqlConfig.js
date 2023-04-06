const sqlConfig = {
    user: 'rama',//change me to SQL authenticated user you setup
    password: 'password',//change me
    database: 'didasko',
    server: 'localhost',//change
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }
  module.exports = sqlConfig