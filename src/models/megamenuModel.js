import pool from "@/lib/db";

//const Pool = require("pg").Pool;
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

// const pool = new Pool({
//   user: config.dbuser,
//   host: config.dbhost,
//   database: config.dbname,
//   password: config.dbpassword,
//   port: config.dbport,
// });

export const getMegamenulist = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT t1.*,t2.menu_name parent_menu, case when t1.menu_status = 'A' then 'Active' else 'Inactive' end as status FROM megamenu t1 left join megamenu t2 on t1.menu_parent_id=t2.menu_id ORDER BY t1.menu_id DESC",
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
export const megamenuarrlist = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "select menu_id,menu_parent_id,menu_name from megamenu where menu_status ='A' AND menu_parent_id=0 or menu_parent_id in (select menu_id from megamenu where menu_parent_id=0)",
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
export const menudetail = (na_url) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM megamenu WHERE menu_id = $1",
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
export const addNewmenudetails = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      menu_name,
      menu_url,
      menu_description,
      meta_title,
      meta_description,
      meta_keyword,
      menu_parent_id,
      menu_disp_position,
      menu_status,
    } = body;
    pool.query(
      "INSERT INTO megamenu(menu_name,menu_url,menu_description,meta_title,meta_description,meta_keyword, menu_parent_id,menu_disp_position,menu_status) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        menu_name,
        menu_url,
        menu_description,
        meta_title,
        meta_description,
        meta_keyword,
        menu_parent_id,
        menu_disp_position,
        menu_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `menu details has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateMenudetails = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      menu_id,
      menu_name,
      menu_url,
      menu_description,
      meta_title,
      meta_description,
      meta_keyword,
      menu_parent_id,
      menu_disp_position,
      menu_status,
    } = body;
    pool.query(
      "UPDATE megamenu SET menu_name=$2,menu_url=$3,menu_description=$4,meta_title=$5,meta_description=$6, meta_keyword=$7,menu_parent_id=$8,menu_disp_position=$9,menu_status=$10 WHERE menu_id=$1 RETURNING menu_id",
      [
        menu_id,
        menu_name,
        menu_url,
        menu_description,
        meta_title,
        meta_description,
        meta_keyword,
        menu_parent_id,
        menu_disp_position,
        menu_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A menu details has been updated: ${JSON.stringify(
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

export const editmenu = (menu_id) => {
  //const menu_id = menu_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM megamenu WHERE menu_id = $1",
      [menu_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit roles ID: ${id}`);
      }
    );
    console.log(query);
  });
};

