import pool from "@/lib/db";

export async function topCourses() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cour_id,course_name,course_url FROM courses WHERE cour_top='Y' ORDER BY course_name ASC LIMIT 12",
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

export async function topNotification() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM notifications ORDER BY notif_id DESC",
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

export async function featuredColleges() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT c.cid,c.college_name,c.college_url,c.logo,c.averageplacementrecord,(c.ratingacademic+c.rattingaccommodation+c.rattingfaculty+c.rattinginfrastructure+c.rattingplacements+rattingsocial+c.rattingthroughout)/7 as total_rating,s.state_name,ct.city_name  FROM colleges c LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar WHERE c.featured ='Y' GROUP BY c.cid ,s.state_name,ct.city_name ORDER BY RANDOM() LIMIT 15",
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

export async function topPopularcolleges() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT c.cid,c.college_name,c.college_url,c.logo,c.totalplacementratio,c.lowestplacementrecord,c.higestplacementrecord,(c.ratingacademic+c.rattingaccommodation+c.rattingfaculty+c.rattinginfrastructure+c.rattingplacements+rattingsocial+c.rattingthroughout)/7 as total_rating,regexp_count(c.courses, ',') + 1  total_courses, string_agg( distinct cou.course_url||'~'||cou.course_name,', ') courses, string_agg(distinct e.exam_name,', ') exam_name,string_agg(distinct a.approved_name,', ') approved_by, string_agg(distinct cty.college_type,', ') college_types,c.banner,s.state_name,ct.city_name FROM colleges c  LEFT JOIN state_list s ON c.state = s.sta_id::varchar LEFT JOIN city_list ct on c.city = ct.cit_id::varchar LEFT JOIN examnames e ON e.exam_id = any(string_to_array(c.exams,',')::int[]) LEFT JOIN approvedby a ON a.approv_id = any(string_to_array(c.approvedby,',')::int[]) LEFT JOIN collegetype cty ON cty.col_type = any(string_to_array(c.ctype,',')::int[]) LEFT JOIN courses cou ON cou.cour_id = any(string_to_array(c.courses,',')::int[]) GROUP BY c.cid ,s.state_name,ct.city_name ORDER BY c.cid DESC  LIMIT 8",
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

export async function goal() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        //"SELECT cat.cat_id, cat.category_name,cat.category_url, string_agg(distinct c.course_name,', ') courses, string_agg(distinct c.course_url,', ') course_url,count(co.cid) total_colleges FROM categories cat JOIN courses c on c.cour_id = any(string_to_array(cat.cour_ids,',')::int[]) LEFT JOIN colleges co on cat.cat_id=any(string_to_array(co.categories,',')::int[]) WHERE cat.category_status='A' GROUP BY cat.cat_id ORDER BY goal_disp_position ASC LIMIT 15",
        "SELECT CAT.CATEGORY_NAME,CATEGORY_URL,STRING_AGG(DISTINCT C.COURSE_NAME,', ') COURSES,STRING_AGG(DISTINCT C.COURSE_URL,', ') COURSE_URL, COUNT(CO.CID) TOTAL_COLLEGES FROM CATEGORIES CAT JOIN COURSES C ON CAT.CAT_ID=C.CAT_ID LEFT JOIN COLLEGES CO ON CAT.CAT_ID=ANY(STRING_TO_ARRAY(CO.CATEGORIES,',')::INT[]) WHERE CAT.CATEGORY_STATUS='A' GROUP BY CAT.CATEGORY_URL,CAT.CATEGORY_NAME,CAT.GOAL_DISP_POSITION ORDER BY CAT.GOAL_DISP_POSITION ASC LIMIT 15",
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

export async function exams() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM newsarticles WHERE na_type='e' ORDER BY na_id DESC LIMIT 15",
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

export async function newsandupdates() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * ,TO_CHAR(na_date, 'dd-Mon-yyyy') disp_date FROM newsarticles WHERE na_type !='e' ORDER BY na_id DESC LIMIT 15",
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

export async function studybycities() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * FROM city_list where city_top = 'Y' ORDER BY city_name ASC LIMIT 25",
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

export async function trendings() {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT trading_url,trading_name FROM trending WHERE trading_status='A' ORDER BY trading_name ASC",
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
