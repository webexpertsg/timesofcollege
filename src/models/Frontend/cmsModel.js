const { query } = require("express");
const config = require("../../config/config.js");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: config.dbuser,
  host: config.dbhost,
  database: config.dbname,
  password: config.dbpassword,
  port: config.dbport,
});

export const cmsdetails = (cms_url) => {
  //const cms_url = cms_url;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM cms WHERE cms_url = $1",
      [cms_url],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }
      }
    );
  });
};
