import pool from "@/lib/db";

export async function examlisting() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,TO_CHAR(na_date, 'dd-Mon-yyyy') disp_date FROM newsarticles WHERE na_type='e' ORDER BY na_id DESC",
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

export async function examdetail(na_url) {
  try {
    return new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,TO_CHAR(na_date, 'dd-Mon-yyyy') disp_date FROM newsarticles WHERE na_url = $1",
        [na_url],
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
  } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
  }

};