import pool from "@/lib/db";

  // try {

  // } catch (error_1) {
  //   console.error(error_1);
  //   throw new Error("Internal server error");
  // }

export async function listing() {
  try {
    return await new Promise(function (resolve, reject) {
      var search = "";
      var filter = "";
      // if (parmameters.query.city_url) {
      //   search = " AND ct.city_url = '" + parmameters.query.city_url + "'";
      // }
      // if (parmameters.query.category_url) {
      //   search =
      //     " AND cat.category_url = '" + parmameters.query.category_url + "'";
      // }
      // if (parmameters.query.course_url) {
      //   search =
      //     " AND cour.course_url = '" + parmameters.query.course_url + "'";
      // }
      // if (parmameters.query.search_parameter) {
      //   search =
      //     " AND c.college_name ILIKE '%" +
      //     parmameters.query.search_parameter +
      //     "%'";
      // }
      /*if(parmameters.query.coursefilter){
        filter = 
      }*/
      console.log(search);
      const query =
        "SELECT c.cid,c.college_name,c.college_url,c.logo,c.totalplacementratio,c.lowestplacementrecord,c.higestplacementrecord,regexp_count(c.courses, ',') + 1  total_courses, (c.ratingacademic+c.rattingaccommodation+c.rattingfaculty+c.rattinginfrastructure+c.rattingplacements+rattingsocial+c.rattingthroughout)/7 as total_rating,string_agg(distinct e.exam_name,', ') exam_name,string_agg(distinct a.approved_name,', ') approved_by, string_agg(distinct cty.college_type,', ') college_types,c.banner,s.state_name,ct.city_url,ct.city_name FROM colleges c  LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar LEFT JOIN examnames e ON e.exam_id = any(string_to_array(c.exams,',')::int[]) LEFT JOIN approvedby a ON a.approv_id = any(string_to_array(c.approvedby,',')::int[]) LEFT JOIN collegetype cty ON cty.col_type = any(string_to_array(c.ctype,',')::int[])  LEFT JOIN categories cat ON cat.cat_id = any(string_to_array(c.categories,',')::int[]) LEFT JOIN courses cour ON cour.cour_id = any(string_to_array(c.courses,',')::int[])  WHERE 1=1 ";

      pool.query(
        query +
          search +
          filter +
          "GROUP BY c.cid ,s.state_name,ct.city_url,ct.city_name ORDER BY c.cid DESC",
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
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

export async function collegedetails(college_url) {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT c.*,TO_CHAR(updated_at, 'YYYY-MM-DD') last_updated, string_agg(distinct cour.course_name,', ') courses_name, string_agg( distinct cour.course_url||'~'||cour.course_name,', ') top_courses, string_agg(distinct fac.facility_name,', ') facility_available,string_agg(distinct e.exam_name,', ') exam_name,string_agg(distinct a.approved_name,', ') approved_by, string_agg(distinct cty.college_type,', ') college_types,(c.ratingacademic+c.rattingaccommodation+c.rattingfaculty+c.rattinginfrastructure+c.rattingplacements+rattingsocial+c.rattingthroughout)/7 as total_rating, c.banner,s.state_name,ct.city_name FROM colleges c LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar LEFT JOIN examnames e ON e.exam_id = any(string_to_array(c.exams,',')::int[]) LEFT JOIN approvedby a ON a.approv_id = any(string_to_array(c.approvedby,',')::int[]) LEFT JOIN collegetype cty ON cty.col_type = any(string_to_array(c.ctype,',')::int[])  LEFT JOIN categories cat ON cat.cat_id = any(string_to_array(c.categories,',')::int[]) LEFT JOIN courses cour ON cour.cour_id = any(string_to_array(c.courses,',')::int[]) LEFT JOIN facility fac ON fac.facility_id = any(string_to_array(c.facilities,',')::int[]) WHERE c.college_url = $1 GROUP BY c.cid ,s.state_name,ct.city_name ORDER BY c.cid DESC",
        [college_url],
        (error, results) => {
          //  console.log(results);
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          }
        }
      )
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

export async function relatedcollegecoursewise(course) {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        // "SELECT c.cid,c.college_name,c.college_url,c.logo,c.averageplacementrecord,s.state_name,ct.city_name  FROM colleges c LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar  WHERE c.courses IN ($1) GROUP BY c.cid ,s.state_name,ct.city_name ORDER BY c.cid DESC  LIMIT 15",
        // "SELECT * FROM colleges WHERE courses IN($1) ORDER BY cid DESC",
        "SELECT c.cid,c.college_name,c.college_url,c.logo,c.averageplacementrecord,s.state_name,ct.city_url,ct.city_name FROM colleges c LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar WHERE position(c.courses in $1)>0 ORDER BY RANDOM() LIMIT 9",
        [course],
        (error, results) => {
          //  console.log(results);
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          }
        }
      );
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

export async function relatedcollegenews(course) {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM newsarticles WHERE position(na_categories in $1)>0 ORDER BY RANDOM() LIMIT 8",
        [course],
        (error, results) => {
          //  console.log(results);
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          }
        }
      );
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

export async function updatecollegeview(body) {
  try {
    return await new Promise(function (resolve, reject) {
      console.log(body);
      const { cid } = body;
      pool.query(
        "UPDATE colleges set views=views+1 WHERE cid=$1 RETURNING cid",
        [cid],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`college views updates: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    })
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

export async function insertformeqnuery(body){
  try {
      return await new Promise(function (resolve, reject) {
        const {
          fullname,
          email,
          contactno,
          city,
          coursename,
          college_id,
          event_name,
          event_title,
        } = body;
        pool.query(
          "INSERT INTO collegeenquery(fullname, email, contactno, city, coursename,college_id,event_name,event_title,enqury_date) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, now()) RETURNING *",
          [
            fullname,
            email,
            contactno,
            city,
            coursename,
            college_id,
            event_name,
            event_title,
          ],
          (error, results) => {
            if (error) {
              reject(error);
            }
            if (results && results.rows) {
              resolve(`enquery : ${JSON.stringify(results.rows[0])}`);
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

export async function collegetitleappend() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT college_title_append FROM website_config",
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
