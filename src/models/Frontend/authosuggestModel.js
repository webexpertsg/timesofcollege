import pool from "@/lib/db";

export async function autosuggest(college_name) {
  try {
    return await new Promise(function (resolve, reject) {
      const query =
        "SELECT college_name FROM colleges where college_name ILIKE $1 ORDER BY college_name ASC LIMIT 20";
      pool.query(query, ["%" + college_name + "%"], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }
      });
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
}