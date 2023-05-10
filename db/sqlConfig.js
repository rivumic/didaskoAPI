require('dotenv').config()
const sqlConfig = {
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    server: process.env.server,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }
  module.exports = sqlConfig