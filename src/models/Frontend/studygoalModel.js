import pool from "@/lib/db";


export async function studygoallisting() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * from categories ORDER BY category_name ASC",
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

