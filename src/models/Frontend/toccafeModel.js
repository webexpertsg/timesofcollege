import pool from "@/lib/db";

export async function toccafelisting() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT question,answer FROM questions WHERE qstatus='A' ORDER BY qid DESC",
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
};
