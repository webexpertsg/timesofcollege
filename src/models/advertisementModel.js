const { query } = require("express");
const config = require("../config/config.js");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: config.dbuser,
  host: config.dbhost,
  database: config.dbname,
  password: config.dbpassword,
  port: config.dbport,
});

const getWebsiteconfig = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM website_config", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};
const getAvertisementlisting = async () => {
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

const getAvertisement = (ad_id) => {
  //const notif_id = notif_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT *,TO_CHAR(ad_disp_date_from, 'yyyy-mm-dd') date_from, TO_CHAR(ad_disp_date_to, 'yyyy-mm-dd') date_to FROM advertisement WHERE ad_id = $1",
      [ad_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit Notification ID: ${notif_id}`);
      }
    );
    console.log(query);
  });
};
const updateAvertisementlisting = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      ad_id,
      ad_title,
      ad_disp_position,
      ad_disp_page,
      ad_disp_date_from,
      ad_disp_date_to,
      ad_url,
      ad_image,
    } = body;
    pool.query(
      "UPDATE advertisement SET ad_title = $2,ad_disp_position=$3, ad_disp_page=$4,ad_disp_date_from=$5,ad_disp_date_to=$6,ad_url=$7,ad_image=$8 WHERE ad_id = $1 RETURNING *",
      [
        ad_id,
        ad_title,
        ad_disp_position,
        ad_disp_page,
        ad_disp_date_from,
        ad_disp_date_to,
        ad_url,
        ad_image,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Avertisement updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
const updateWebconfig = (body) => {
  console.log("body-->", body);
  return new Promise(function (resolve, reject) {
    const { college_title_append } = body;
    pool.query(
      "UPDATE website_config SET college_title_append = $1 RETURNING *",
      [college_title_append],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Webconfig updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
const addAdvertisement = (body) => {
  console.log("body->", body);
  return new Promise(function (resolve, reject) {
    const {
      ad_title,
      ad_disp_position,
      ad_disp_page,
      ad_disp_date_from,
      ad_disp_date_to,
      ad_url,
    } = body;
    pool.query(
      "INSERT INTO advertisement(ad_title,ad_disp_position,ad_disp_page,ad_disp_date_from,ad_disp_date_to,ad_url) VALUES ( $1,$2,$3,$4,$5,$6) RETURNING *",
      [
        ad_title,
        ad_disp_position,
        ad_disp_page,
        ad_disp_date_from,
        ad_disp_date_to,
        ad_url,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new advertisement has been added: ${JSON.stringify(
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
module.exports = {
  getAvertisementlisting,
  getAvertisement,
  updateAvertisementlisting,
  addAdvertisement,
  getWebsiteconfig,
  updateWebconfig,
};
