import pool from "@/lib/db";
 

export async function courseslisting() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * from courses ORDER BY course_name ASC",
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
}