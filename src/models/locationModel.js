const { query } = require("express");
const config = require("../config/config.js");

const Pool = require("pg").Pool;
/* const pool = new Pool({
  user: "postgres", //timeofcollege
  host: "localhost",
  database: "edupotal", //tocdatabase
  password: "password", //Navi2212
  port: 5432,
}); 
const pool = new Pool({
  user: "tocadmin", //timeofcollege
  host: "164.121.168.184.host.secureserver.net",
  database: "tocprddb", //tocdatabase
  password: "Avi@1985", //Navi2212
  port: 5432,
});*/

const pool = new Pool({
  user: config.dbuser,
  host: config.dbhost,
  database: config.dbname,
  password: config.dbpassword,
  port: config.dbport,
});

const countrylisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM countrylist WHERE 1=1 ORDER BY country_name ASC",
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
const countrydetail = (cout_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM countrylist WHERE cout_id = $1",
      [cout_id],
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
const updatecountry = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      cout_id,
      country_name,
      country_url,
      country_brief,
      meta_title,
      meta_description,
      meta_keyword,
    } = body;
    pool.query(
      "UPDATE countrylist SET country_name=$2,country_url=$3,country_brief=$4,meta_title=$5,meta_description=$6, meta_keyword=$7 WHERE cout_id=$1 RETURNING cout_id",
      [
        cout_id,
        country_name,
        country_url,
        country_brief,
        meta_title,
        meta_description,
        meta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A country details has been updated: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
const addcountry = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      country_name,
      country_url,
      country_brief,
      meta_title,
      meta_description,
      meta_keyword,
    } = body;
    pool.query(
      "INSERT INTO countrylist(country_name,country_url, country_brief,meta_title,meta_description,meta_keyword) VALUES ($1, $2, $3,$4, $5, $6) RETURNING *",
      [
        country_name,
        country_url,
        country_brief,
        meta_title,
        meta_description,
        meta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A country details has been updated: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

const statelisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT s.sta_id,s.state_name,c.country_name FROM state_list s JOIN countrylist c ON s.cout_id = c.cout_id WHERE 1=1 ORDER BY s.state_name ASC",
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
const citylisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT c.cit_id,c.city_name,c.city_url,s.state_name FROM city_list c JOIN state_list s ON c.stat_id = s.sta_id WHERE 1=1 ORDER BY c.city_name ASC",
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

module.exports = {
  countrylisting,
  countrydetail,
  updatecountry,
  addcountry,
  statelisting,
  citylisting,
};
