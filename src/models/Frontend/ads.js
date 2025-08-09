// const { query } = require("express");
// const config = require("../../config/config.js");

// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: config.dbuser,
//   host: config.dbhost,
//   database: config.dbname,
//   password: config.dbpassword,
//   port: config.dbport,
// });
import pool from "@/lib/db";


export async function getadslisting() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *, TO_CHAR(ad_disp_date_from, 'dd-Mon-yyyy') date_from, TO_CHAR(ad_disp_date_to, 'dd-Mon-yyyy') date_to  FROM advertisement ORDER BY ad_id DESC",
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};
