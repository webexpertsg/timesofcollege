import pool from "@/lib/db";
export const countrylisting = async () => {
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
export const countrydetail = (cout_id) => {
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
export const updatecountry = (body) => {
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
export const addcountry = (body) => {
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

export const statelisting = async () => {
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
export const citylisting = async () => {
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