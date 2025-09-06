import pool from "@/lib/db";

//get all colleges our database
export const getColleges = async (req) => {
  try {
    return await new Promise(function (resolve, reject) {
      var search = "";
      if (req.loginrole_id == "2") {
        search = " AND added_by=" + req.loginid;
      }

      const query =
        "select * from colleges where 1=1 " + search + " order by cid desc";
      pool.query(query, (error, results) => {
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

export const Login = async (body) => {
  try {
    return await new Promise(function (resolve, reject) {
      const { admin_email, admin_password } = body;
      pool.query(
        "select au_id,admin_id,admin_email,admin_contact,rol_id from adminusers where admin_status='A' and admin_email=$1 and admin_password=$2",
        [admin_email, admin_password],
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

/* //create a new merchant record in the databsse
const college = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      college_name,
      college_url,
      tag_line,
      usp_remark,
      meta_title,
      meta_keyword,
      meta_description,
      found_year,
      highlights,
      display_type,
      college_descripton,
      address,
      address2,
      landmark,
      pincode,
      country,
      state,
      city,
      contactno,
      faxno,
      email,
      website,
    } = body;
    pool.query(
      "INSERT INTO colleges(college_name,college_url,tag_line,usp_remark,meta_title,meta_keyword,meta_description,found_year,highlights,display_type,college_descripton,address,address2,landmark,pincode,country,state,city,contactno,faxno,email,website) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *",
      [
        college_name,
        college_url,
        tag_line,
        usp_remark,
        meta_title,
        meta_keyword,
        meta_description,
        found_year,
        highlights,
        display_type,
        college_descripton,
        address,
        address2,
        landmark,
        pincode,
        country,
        state,
        city,
        contactno,
        faxno,
        email,
        website,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new college details has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
}; */
//delete a merchant

export const deleteVehicle = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM colleges WHERE cid = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Vehicle deleted with ID: ${id}`);
      }
    );
  });
};

export const editRoles = (rol_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM roles WHERE rol_id = $1",
      [rol_id],
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
  });
};

export const getstatewisecity = (stat_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT cit_id,city_name FROM city_list WHERE stat_id = $1",
      [stat_id],
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

export const fetchSubcourese = async (course_id) => {
  try {
    return await new Promise(function (resolve, reject) {
      //const { course_id } = body;
      pool.query(
        "SELECT courb_id,branch_name FROM coursebranches where course_id=$1",
        //"SELECT courb_id,branch_name FROM coursebranches where course_id in($1)",
        //"SELECT courb_id,branch_name FROM coursebranches where course_id = ANY($1::int[])",
        [course_id],
        (error, results) => {
          //console.log("results", body);
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

/* const getCoursesarrs = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cour_id,course_name FROM courses WHERE cstatus='A' ORDER BY course_name ASC",
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
}; */

export const editcollege = (cid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM colleges WHERE cid = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college ID: ${id}`);
      }
    );
    // console.log(query);
  });
};
export const faqcollege = (cid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT cf.*,case when cf.cfaq_status = 'A' then 'Active' else 'Inactive' end as status FROM college_faq cf WHERE cf.cid = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college faq ID: ${id}`);
      }
    );
    console.log(query);
  });
};

export const editquestion = (cid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM questions WHERE qid = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college ID: ${id}`);
      }
    );
    console.log(query);
  });
};

export const editCms = (cmsid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM cms WHERE cmsid = $1",
      [cmsid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college ID: ${id}`);
      }
    );
    //console.log(query);
  });
};
export const deleteCMS = (cmsid) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM cms WHERE cmsid = $1",
      [cmsid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Cms Deleted: ${cmsid}`);
      }
    );
  });
};
export const deleteFacility = (facility_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM facility WHERE facility_id = $1",
      [facility_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`facility Deleted: ${facility_id}`);
      }
    );
  });
};
export const inactiveFacility = (facility_id) => {
  console.log("id--", facility_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE facility SET facility_status='D' WHERE facility_id=$1",
      [facility_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A approved by has been inactived: ${facility_id}`);
      }
    );
  });
};
export const inactiveCourse = (cour_id) => {
  console.log("id--", cour_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE courses SET cstatus='D' WHERE cour_id=$1",
      [cour_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A course has been inactived: ${cour_id}`);
      }
    );
  });
};
export const inactiveRole = (rol_id) => {
  console.log("id--", rol_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE roles SET role_status='D' WHERE rol_id=$1",
      [rol_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A role has been inactived: ${rol_id}`);
      }
    );
  });
};

export const editnewsarticle = (na_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT *,TO_CHAR(na_date, 'YYYY-MM-DD') exam_date FROM newsarticles WHERE na_id = $1",
      [na_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college ID: ${id}`);
      }
    );
    console.log(query);
  });
};

export const insertCollegebasicinformation = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      college_name,
      college_url,
      tag_line,
      usp_remark,
      found_year,
      intake,
      hostel_available,
      college_descripton,
      facultyprofile,
      ctype,
      trading,
      approvedby,
      facilities,
      categories,
      exams,
      meta_title,
      meta_keyword,
      meta_description,
      coupon_code,
      nirg_ranking,
      application_open,
      logo,
      banner,
      added_by,
    } = body;
    pool.query(
      "INSERT INTO colleges(college_name,college_url,tag_line,usp_remark,found_year,intake,hostel_available,college_descripton,facultyprofile,ctype,trading,approvedby,facilities,categories,exams,meta_title,meta_keyword,meta_description, coupon_code,nirg_ranking,application_open,logo,banner,added_by,added_at) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,CURRENT_DATE) RETURNING *",
      [
        college_name,
        college_url,
        tag_line,
        usp_remark,
        found_year,
        intake,
        hostel_available,
        college_descripton,
        facultyprofile,
        ctype,
        trading,
        approvedby,
        facilities,
        categories,
        exams,
        meta_title,
        meta_keyword,
        meta_description,
        coupon_code,
        nirg_ranking,
        application_open,
        logo,
        banner,
        added_by,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          //resolve(`College basic insert: ${JSON.stringify(results.rows[0])}`);
          resolve(JSON.stringify(results.rows[0]));
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateCollegebasicinformation = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      cid,
      college_name,
      college_url,
      tag_line,
      usp_remark,
      found_year,
      intake,
      hostel_available,
      college_descripton,
      facultyprofile,
      ctype,
      trading,
      approvedby,
      facilities,
      categories,
      exams,
      meta_title,
      meta_keyword,
      meta_description,
      logo,
      banner,
      coupon_code,
      nirg_ranking,
      application_open,
    } = body;
    pool.query(
      "UPDATE colleges SET college_name = $2, college_url = $3,tag_line=$4,usp_remark=$5,found_year=$6,intake=$7,hostel_available=$8,college_descripton=$9,facultyprofile=$10,ctype=$11,trading=$12,approvedby=$13,facilities=$14,categories=$15,exams=$16,meta_title=$17,meta_keyword=$18,meta_description=$19,logo=$20,banner=$21,coupon_code=$22,nirg_ranking=$23,application_open=$24,updated_at=CURRENT_DATE WHERE cid = $1 RETURNING *",
      [
        cid,
        college_name,
        college_url,
        tag_line,
        usp_remark,
        found_year,
        intake,
        hostel_available,
        college_descripton,
        facultyprofile,
        ctype,
        trading,
        approvedby,
        facilities,
        categories,
        exams,
        meta_title,
        meta_keyword,
        meta_description,
        logo,
        banner,
        coupon_code,
        nirg_ranking,
        application_open,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`College basic updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateGallery = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      cid,
      gallery1,
      gallery2,
      gallery3,
      gallery4,
      gallery5,
      brouchure,
      youtube,
    } = body;
    pool.query(
      "UPDATE colleges SET gallery1 = $2, gallery2 = $3,gallery3=$4,gallery4=$5,gallery5=$6,brouchure=$7,youtube=$8 WHERE cid = $1 RETURNING *",
      [
        cid,
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        brouchure,
        youtube,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College gallery updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateContactus = (body) => {
  console.log("contact us body-->", body);
  return new Promise(function (resolve, reject) {
    const {
      cid,
      address,
      address2,
      landmark,
      pincode,
      country,
      state,
      city,
      contactno,
      faxno,
      email,
      website,
    } = body;
    pool.query(
      "UPDATE colleges SET address = $2, address2 = $3,landmark=$4,pincode=$5,country=$6,state=$7,city=$8,contactno=$9,faxno=$10,email=$11,website=$12 WHERE cid = $1 RETURNING *",
      [
        cid,
        address,
        address2,
        landmark,
        pincode,
        country,
        state,
        city,
        contactno,
        faxno,
        email,
        website,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College contact updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateRating = (body) => {
  //console.log("contact us body-->", body);
  return new Promise(function (resolve, reject) {
    const {
      cid,
      ratingacademic,
      rattingaccommodation,
      rattingfaculty,
      rattinginfrastructure,
      rattingplacements,
      rattingsocial,
      rattingthroughout,
    } = body;
    pool.query(
      "UPDATE colleges SET ratingacademic = $2, rattingaccommodation = $3,rattingfaculty=$4,rattinginfrastructure=$5,rattingplacements=$6,rattingsocial=$7,rattingthroughout=$8 WHERE cid = $1 RETURNING *",
      [
        cid,
        ratingacademic,
        rattingaccommodation,
        rattingfaculty,
        rattinginfrastructure,
        rattingplacements,
        rattingsocial,
        rattingthroughout,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College contact updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateHighlight = (body) => {
  console.log("Highlight body-->", body);
  return new Promise(function (resolve, reject) {
    const { cid, display_type, highlights } = body;
    pool.query(
      "UPDATE colleges SET display_type = $2, highlights = $3 WHERE cid = $1 RETURNING *",
      [cid, display_type, highlights],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College admission updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateCourses = (body) => {
  console.log("Highlight body-->", body);
  return new Promise(function (resolve, reject) {
    const { cid, courses, sub_course_details } = body;
    pool.query(
      "UPDATE colleges SET courses=$2, sub_course_details = $3 WHERE cid = $1 RETURNING *",
      [cid, courses, sub_course_details],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College admission updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateAdmission = (body) => {
  //console.log("contact us body-->", body);
  return new Promise(function (resolve, reject) {
    const { cid, adminssiondetails, scholarshipoffer } = body;
    pool.query(
      "UPDATE colleges SET adminssiondetails = $2, scholarshipoffer = $3 WHERE cid = $1 RETURNING *",
      [cid, adminssiondetails, scholarshipoffer],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College admission updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updatePlacement = (body) => {
  //console.log("Placement body-->", body);
  return new Promise(function (resolve, reject) {
    const {
      cid,
      placement_overview,
      totalplacementratio,
      averageplacementrecord,
      higestplacementrecord,
      lowestplacementrecord,
      toprecruiters,
      toprecuitingsectors,
      topprofile,
    } = body;
    pool.query(
      "UPDATE colleges SET placement_overview = $2, totalplacementratio = $3,averageplacementrecord=$4,higestplacementrecord=$5,lowestplacementrecord=$6,toprecruiters=$7,toprecuitingsectors=$8,topprofile=$9 WHERE cid = $1 RETURNING *",
      [
        cid,
        placement_overview,
        totalplacementratio,
        averageplacementrecord,
        higestplacementrecord,
        lowestplacementrecord,
        toprecruiters,
        toprecuitingsectors,
        topprofile,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College admission updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateFaq = (body) => {
  //console.log("Placement body-->", body);
  return new Promise(function (resolve, reject) {
    const { cid, faq } = body;
    pool.query(
      "UPDATE colleges SET faq = $2 WHERE cid = $1 RETURNING *",
      [cid, faq],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `College admission updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateCollege = (cid, body) => {
  return new Promise(function (resolve, reject) {
    const {
      cid,
      college_name,
      college_url,
      tag_line,
      usp_remark,
      found_year,
      intake,
      college_descripton,
      meta_title,
      meta_keyword,
      meta_description,
      display_type,
      address,
      address2,
      landmark,
      pincode,
      country,
      state,
      city,
      contactno,
      faxno,
      email,
      website,
      ctype,
      trading,
      approvedby,
      categories,
      courses,
      hostel_available,
      adminssiondetails,
      scholarshipoffer,
      facultyprofile,
      faq,
      facilities,
      totalplacementratio,
      averageplacementrecord,
      higestplacementrecord,
      lowestplacementrecord,
      toprecruiters,
      toprecuitingsectors,
      topprofile,
    } = body;
    pool.query(
      "UPDATE colleges SET college_name = $2, college_url = $3,tag_line=$4,usp_remark=$5,found_year=$6,intake=$7,college_descripton=$8,meta_title=$9,meta_keyword=$10,meta_description=$11,display_type=$12,address=$13,address2=$14,landmark=$15,pincode=$16,country=$17,state=$18,city=$19,contactno=$20,faxno=$21,email=$22,website=$23,ctype=$24,trading=$25,approvedby=$26,categories=$27,courses=$28,hostel_available=$29,adminssiondetails=$30 ,scholarshipoffer=$31,facultyprofile=$32,faq=$33,facilities=$34,totalplacementratio=$35,averageplacementrecord=$36,higestplacementrecord=$37,lowestplacementrecord=$38,toprecruiters=$39,toprecuitingsectors=$40,topprofile=$41, WHERE cid = $1 RETURNING *",
      [
        cid,
        college_name,
        college_url,
        tag_line,
        usp_remark,
        found_year,
        intake,
        college_descripton,
        meta_title,
        meta_keyword,
        meta_description,
        display_type,
        address,
        address2,
        landmark,
        pincode,
        country,
        state,
        city,
        contactno,
        faxno,
        email,
        website,
        ctype,
        trading,
        approvedby,
        categories,
        courses,
        hostel_available,
        adminssiondetails,
        scholarshipoffer,
        facultyprofile,
        faq,
        facilities,
        totalplacementratio,
        averageplacementrecord,
        higestplacementrecord,
        lowestplacementrecord,
        toprecruiters,
        toprecuitingsectors,
        topprofile,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`College updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateCMS = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      cmsid,
      cms_title,
      cms_url,
      cms_description,
      cms_meta_title,
      cms_meta_description,
      cms_meta_keyword,
    } = body;
    pool.query(
      "UPDATE cms SET cms_title = $2,cms_url=$3, cms_description=$4,cms_meta_title=$5,cms_meta_description=$6,cms_meta_keyword=$7 WHERE cmsid = $1 RETURNING *",
      [
        cmsid,
        cms_title,
        cms_url,
        cms_description,
        cms_meta_title,
        cms_meta_description,
        cms_meta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Question updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const addNewsarticle = (body) => {
  return new Promise(function (resolve, reject) {
    console.log("body", body);
    const {
      na_type,
      na_title,
      na_url,
      na_brief_description,
      na_description,
      na_metatitle,
      na_metadescription,
      na_metakeyword,
      na_status,
      added_by,
      na_trends,
      na_categories,
      na_image,
      na_postedby,
    } = body;
    pool.query(
      "INSERT INTO newsarticles(na_type,na_title,na_url,na_brief_description,na_description,na_metatitle,na_metadescription,na_metakeyword,na_status,added_by,na_trends,na_categories,na_image,na_postedby) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *",
      [
        na_type,
        na_title,
        na_url,
        na_brief_description,
        na_description,
        na_metatitle,
        na_metadescription,
        na_metakeyword,
        na_status,
        added_by,
        na_trends,
        na_categories,
        na_image,
        na_postedby,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new record has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

//export const updateNewsarticles = (na_id, body) => {
export const updateNewsarticles = (body) => {
  // console.log("body", body);
  return new Promise(function (resolve, reject) {
    const {
      na_id,
      na_type,
      na_title,
      na_url,
      na_brief_description,
      na_description,
      na_metatitle,
      na_metadescription,
      na_metakeyword,
      na_status,
      na_trends,
      na_categories,
      added_by,
      na_image,
      na_date,
      na_postedby,
    } = body;
    pool.query(
      "UPDATE newsarticles SET na_type = $2,na_title=$3, na_url=$4, na_brief_description=$5,na_description=$6,na_metatitle=$7,na_metadescription=$8,na_metakeyword=$9,na_status=$10,na_trends=$11,na_categories=$12,added_by=$13,na_image=$14,na_date=$15,na_postedby=$16 WHERE na_id = $1 RETURNING *",
      [
        na_id,
        na_type,
        na_title,
        na_url,
        na_brief_description,
        na_description,
        na_metatitle,
        na_metadescription,
        na_metakeyword,
        na_status,
        na_trends,
        na_categories,
        added_by,
        na_image,
        na_date,
        na_postedby,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Question updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

//update a merchant record
export const updateVehicle = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "UPDATE colleges SET name = $1, email = $2 WHERE cid = $3 RETURNING *",
      [name, email, veh_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Vehicle updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

//get all merchants our database

export const getCourses = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT c.*,cat.category_name, case when c.cstatus = 'A' then 'Active' else 'Inactive' end as status FROM courses c LEFT JOIN categories cat ON c.cat_id=cat.cat_id ORDER BY c.cour_id DESC",
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

export const getExamlist = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * from examnames ORDER BY exam_id DESC",
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

export const getTrendinglist = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT * from trending ORDER BY tid DESC",
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

export const edittrending = (tid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM trending WHERE tid = $1",
      [tid],
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

export const updatetrending = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { tid, trading_name, trading_url, trading_status } = body;
    pool.query(
      "UPDATE trending SET trading_name=$2,trading_url=$3,trading_status=$4 WHERE tid=$1 RETURNING tid",
      [tid, trading_name, trading_url, trading_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A trending details has been updated: ${JSON.stringify(
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

export const addNewTrending = (body) => {
  return new Promise(function (resolve, reject) {
    const { trading_name, trading_url, trading_status } = body;
    pool.query(
      "INSERT INTO trending(trading_name, trading_url, trading_status) VALUES ($1, $2, $3) RETURNING *",
      [trading_name, trading_url, trading_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `Trending details has been added: ${JSON.stringify(
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

export const editexam = (exam_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM examnames WHERE exam_id = $1",
      [exam_id],
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

export const editcollegefaq = (cfaq_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM college_faq WHERE cfaq_id = $1",
      [cfaq_id],
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
    //console.log(query);
  });
};

export const addNewexam = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      exam_name,
      exam_url,
      exam_brief,
      exam_description,
      emeta_title,
      emeta_description,
      emeta_keyword,
    } = body;
    pool.query(
      "INSERT INTO examnames(exam_name,exam_url,exam_brief,exam_description,emeta_title,emeta_description,emeta_keyword) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *",
      [
        exam_name,
        exam_url,
        exam_brief,
        exam_description,
        emeta_title,
        emeta_description,
        emeta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `Exam details has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateexam = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      exam_id,
      exam_name,
      exam_url,
      exam_brief,
      exam_description,
      emeta_title,
      emeta_description,
      emeta_keyword,
    } = body;
    pool.query(
      "UPDATE examnames SET exam_name=$2,exam_url=$3,exam_brief=$4,exam_description=$5,emeta_title=$6,emeta_description=$7, emeta_keyword=$8 WHERE exam_id=$1 RETURNING exam_id",
      [
        exam_id,
        exam_name,
        exam_url,
        exam_brief,
        exam_description,
        emeta_title,
        emeta_description,
        emeta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A exam details has been updated: ${JSON.stringify(
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

export const addNewCollegefaq = (body) => {
  return new Promise(function (resolve, reject) {
    const { cid, cfaq_section, cfaq_question, cfaq_answer, cfaq_status } = body;
    pool.query(
      "INSERT INTO college_faq(cid,cfaq_section,cfaq_question,cfaq_answer,cfaq_status) VALUES ($1, $2, $3,$4,$5) RETURNING *",
      [cid, cfaq_section, cfaq_question, cfaq_answer, cfaq_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `faq details has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updatecollegefaqs = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      cfaq_id,
      cid,
      cfaq_section,
      cfaq_question,
      cfaq_answer,
      cfaq_status,
    } = body;
    pool.query(
      "UPDATE college_faq SET cid=$2,cfaq_section=$3,cfaq_question=$4,cfaq_answer=$5,cfaq_status=$6 WHERE cfaq_id=$1 RETURNING cfaq_id",
      [cfaq_id, cid, cfaq_section, cfaq_question, cfaq_answer, cfaq_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A college faq details has been updated: ${JSON.stringify(
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

export const getMenurolewise = async (login_id) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "select m.module_link, m.module_title from adminusers au JOIN roles r ON au.rol_id::int = r.rol_id JOIN modules m ON m.mod_id = any(string_to_array(r.modules_access_ids,',')::int[]) WHERE au.au_id=$1 ORDER BY m.module_disp_position ASC",
        [login_id],
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

//get country array
export const getCountryarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cout_id value,country_name label FROM countrylist ORDER BY country_name ASC",
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

export const getStatearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT sta_id value,state_name label FROM state_list ORDER BY state_name ASC",
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

export const getCityarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cit_id value,city_name label FROM city_list ORDER BY city_name ASC",
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

//get all course arra our database
export const getCoursesarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cour_id value,course_name label FROM courses WHERE cstatus='A' ORDER BY course_name ASC",
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

//get all sud course array our database
export const getSubcoursestypearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT coursetype_id,course_type_name FROM coursetype ORDER BY course_type_name ASC",
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

export const getModulearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT mod_id,module_title FROM modules WHERE module_status='A' ORDER BY module_title ASC",
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

export const getCollegetypearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT col_type,college_type FROM collegetype WHERE college_type_status='A' ORDER BY college_type ASC",
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

export const getExamlistarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT exam_id,exam_name FROM examnames ORDER BY exam_name ASC",
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

export const getFeetypearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT feetype_id,fee_type FROM fee_type ORDER BY fee_type ASC",
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

export const getCategoriesarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cat_id value,category_name label FROM categories ORDER BY category_name ASC",
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

export const getApprovedbyarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT approv_id,approved_name FROM approvedby ORDER BY approved_name ASC",
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

export const getCoursearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT cour_id,course_name FROM courses ORDER BY course_name ASC",
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

export const getSubcoursearr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT courb_id,branch_name FROM coursebranches ORDER BY branch_name ASC",
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

export const getRolesrr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT rol_id,role_name FROM roles WHERE role_status='A' ORDER BY role_name ASC",
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

export const getTradingarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT tid,trading_name FROM trending WHERE trading_status='A' ORDER BY trading_name ASC",
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

export const getFacilityarr = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT facility_id,facility_name FROM facility WHERE facility_status='A' ORDER BY facility_name ASC",
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

export const getAdminusers = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      //pool.query("SELECT *,case when branch_status = 'A' then 'Active'else 'Inactive' end as status FROM coursebranches ORDER BY courb_id ASC", (error, results) => {
      pool.query(
        "SELECT *,case when admin_status = 'A' then 'Active' else 'Inactive' end as status FROM adminusers  ORDER BY au_id DESC",
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

export const getRolelist = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "select r.rol_id, r.role_name,r.role_status,case when r.role_status = 'A' then 'Active' else 'Inactive' end as status, string_agg(module_title,', ') module_name from roles r left join modules md on md.mod_id = any(string_to_array(r.modules_access_ids,',')::int[]) group by rol_id,role_name  ORDER BY rol_id DESC",
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

export const getCoursebranchs = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      //pool.query("SELECT *,case when branch_status = 'A' then 'Active'else 'Inactive' end as status FROM coursebranches ORDER BY courb_id ASC", (error, results) => {
      pool.query(
        "SELECT cb.*,co.course_name,case when cb.branch_status = 'A' then 'Active'else 'Inactive' end as status FROM coursebranches as cb inner join courses as co on cb.course_id = co.cour_id ORDER BY courb_id DESC",
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

//get all course type our database
export const getCoursetype = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when ct_status = 'A' then 'Active'else 'Inactive' end as status  FROM coursetype ORDER BY course_type_name ASC",
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
export const editCoursetype = (coursetype_id) => {
  //const coursetype_id = coursetype_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM coursetype WHERE coursetype_id = $1",
      [coursetype_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit course type ID: ${coursetype_id}`);
      }
    );
    // console.log(query);
  });
};
//get all college type our database
export const editCollege = (cid) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM collegetype WHERE col_type = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit college ID: ${id}`);
      }
    );
    // console.log(query);
  });
};
export const getCollegetype = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when college_type_status = 'A' then 'Active'else 'Inactive' end as status FROM collegetype ORDER BY college_type ASC",
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
export const updateCollegetype = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { col_type, college_type, college_type_status } = body;
    pool.query(
      "UPDATE collegetype SET college_type=$2,college_type_status=$3 WHERE col_type=$1 RETURNING col_type",
      [col_type, college_type, college_type_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A college type has been updated: ${JSON.stringify(
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
export const addCoursetype = (body) => {
  return new Promise(function (resolve, reject) {
    const { course_type_name, ct_status } = body;
    pool.query(
      "INSERT INTO coursetype(course_type_name,ct_status) VALUES ($1, $2) RETURNING *",
      [course_type_name, ct_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new course type has been added: ${JSON.stringify(
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
export const updateCoursetype = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { coursetype_id, course_type_name, ct_status } = body;
    pool.query(
      "UPDATE coursetype SET course_type_name=$2,ct_status=$3 WHERE coursetype_id=$1 RETURNING coursetype_id",
      [coursetype_id, course_type_name, ct_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A course type has been updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
export const inactiveCoursetype = (coursetype_id) => {
  //console.log("id--", coursetype_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE coursetype SET ct_status='D' WHERE coursetype_id=$1",
      [coursetype_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A course type has been inactived: ${coursetype_id}`);
      }
    );
  });
};
export const insertCollegetype = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { college_type, college_type_status } = body;
    pool.query(
      "INSERT INTO collegetype(college_type,college_type_status) VALUES ($1, $2) RETURNING *",
      [college_type, college_type_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A college type has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
export const editCoursebranch = (courb_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM coursebranches WHERE courb_id = $1",
      [courb_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit course branch ID: ${id}`);
      }
    );
    //console.log(query);
  });
};
//create a new course branch record in the databsse
export const addCoursebrach = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      course_id,
      branch_name,
      branch_url,
      meta_title,
      meta_description,
      meta_keyword,
      branch_status,
    } = body;
    pool.query(
      "INSERT INTO coursebranches(course_id,branch_name,branch_url,meta_title,meta_description,meta_keyword,branch_status) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *",
      [
        course_id,
        branch_name,
        branch_url,
        meta_title,
        meta_description,
        meta_keyword,
        branch_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new course branch details has been added: ${JSON.stringify(
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
export const updateCoursebrach = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      courb_id,
      course_id,
      branch_name,
      branch_url,
      meta_title,
      meta_description,
      meta_keyword,
      branch_status,
    } = body;
    pool.query(
      "UPDATE coursebranches SET course_id=$2,branch_name=$3,branch_url=$4,meta_title=$5,meta_description=$6,meta_keyword=$7,branch_status=$8 WHERE courb_id=$1 RETURNING courb_id",
      [
        courb_id,
        course_id,
        branch_name,
        branch_url,
        meta_title,
        meta_description,
        meta_keyword,
        branch_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A course branch details has been updated: ${JSON.stringify(
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
export const inactiveCoursebranch = (courb_id) => {
  //console.log("id--", courb_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE coursebranches SET branch_status='D' WHERE courb_id=$1",
      [courb_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A course branch has been inactived: ${courb_id}`);
      }
    );
  });
};
export const inactiveCollegetype = (col_type) => {
  //console.log("id--", col_type);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE collegetype SET college_type_status='D' WHERE col_type=$1",
      [col_type],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A college type has been inactived: ${col_type}`);
      }
    );
  });
};

//create a new users record in the databsse
export const addNewusers = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      admin_id,
      admin_email,
      admin_password,
      admin_contact,
      admin_status,
      rol_id,
    } = body;
    pool.query(
      "INSERT INTO adminusers(admin_id,admin_email,admin_password,admin_contact,admin_status,rol_id) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
      [
        admin_id,
        admin_email,
        admin_password,
        admin_contact,
        admin_status,
        rol_id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new user branch details has been added: ${JSON.stringify(
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
//create add new role record in the databsse
export const addRoles = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { role_name, modules_access_ids, role_status } = body;
    pool.query(
      "INSERT INTO roles(role_name,modules_access_ids,role_status) VALUES ($1,$2,$3) RETURNING *",
      [role_name, modules_access_ids, role_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A role details has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateRoles = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { rol_id, role_name, modules_access_ids, role_status } = body;
    pool.query(
      "UPDATE roles SET role_name=$2,modules_access_ids=$3,role_status=$4 WHERE rol_id=$1 RETURNING *",
      [rol_id, role_name, modules_access_ids, role_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A role details has been updated: ${JSON.stringify(
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

export const addNewcourses = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      course_name,
      course_url,
      cmeta_title,
      cmeta_description,
      cmeta_keyword,
      cstatus,
      cat_id,
    } = body;
    pool.query(
      "INSERT INTO courses(course_name,course_url,cmeta_title,cmeta_description,cmeta_keyword,cstatus,cat_id) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *",
      [
        course_name,
        course_url,
        cmeta_title,
        cmeta_description,
        cmeta_keyword,
        cstatus,
        cat_id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new user branch details has been added: ${JSON.stringify(
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

export const editfacility = (facility_id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM facility WHERE facility_id = $1",
      [facility_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        }

        //resolve(`Edit facility ID: ${id}`);
      }
    );
    //console.log(query);
  });
};

export const addNewfacility = (body) => {
  return new Promise(function (resolve, reject) {
    const { facility_name, facility_status } = body;
    pool.query(
      "INSERT INTO facility(facility_name,facility_status) VALUES ($1, $2) RETURNING *",
      [facility_name, facility_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new facility has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updatefacility = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const { facility_id, facility_name, facility_status } = body;
    pool.query(
      "UPDATE facility SET facility_name=$2,facility_status=$3 WHERE facility_id=$1 RETURNING facility_id",
      [facility_id, facility_name, facility_status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A facility details has been updated: ${JSON.stringify(
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

export const addQuestion = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      question,
      answer,
      qstatus,
      trading,
      catgories,
      question_url,
      qmeta_title,
      qmeta_description,
      qmeta_keyword,
    } = body;
    pool.query(
      "INSERT INTO questions(question,answer, qstatus,trading,catgories,question_url,qmeta_title,qmeta_description,qmeta_keyword) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        question,
        answer,
        qstatus,
        trading,
        catgories,
        question_url,
        qmeta_title,
        qmeta_description,
        qmeta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new question has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateQuestion = (qid, body) => {
  return new Promise(function (resolve, reject) {
    const {
      qid,
      question,
      answer,
      qstatus,
      trading,
      catgories,
      question_url,
      qmeta_title,
      qmeta_description,
      qmeta_keyword,
    } = body;
    pool.query(
      "UPDATE questions SET question = $2,answer=$3, qstatus=$4,trading=$5,catgories=$6, question_url=$7,qmeta_title=$8,qmeta_description=$9,qmeta_keyword=$10 WHERE qid = $1 RETURNING *",
      [
        qid,
        question,
        answer,
        qstatus,
        trading,
        catgories,
        question_url,
        qmeta_title,
        qmeta_description,
        qmeta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Question updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const addCms = (body) => {
  console.log("body->", body);
  return new Promise(function (resolve, reject) {
    const {
      cms_title,
      cms_url,
      cms_description,
      cms_meta_title,
      cms_meta_description,
      cms_meta_keyword,
    } = body;
    pool.query(
      "INSERT INTO cms(cms_title,cms_url,cms_description,cms_meta_title,cms_meta_description,cms_meta_keyword) VALUES ( $1,$2,$3,$4,$5,$6) RETURNING *",
      [
        cms_title,
        cms_url,
        cms_description,
        cms_meta_title,
        cms_meta_description,
        cms_meta_keyword,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new question has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const addNewcategories = (body) => {
  console.log("add category", body);
  return new Promise(function (resolve, reject) {
    const {
      category_name,
      category_url,
      category_description,
      category_meta_title,
      category_meta_keyword,
      category_meta_description,
      category_featured,
      category_status,
    } = body;
    pool.query(
      "INSERT INTO categories(category_name,category_url,category_description,category_meta_title,category_meta_keyword,category_meta_description,category_featured,category_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        category_name,
        category_url,
        category_description,
        category_meta_title,
        category_meta_keyword,
        category_meta_description,
        category_featured,
        category_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new category details has been added: ${JSON.stringify(
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

export const updateCategory = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      cat_id,
      category_name,
      category_url,
      category_description,
      category_meta_title,
      category_meta_keyword,
      category_meta_description,
      category_featured,
      category_status,
    } = body;
    pool.query(
      "UPDATE categories SET category_name=$2,category_url=$3,category_description=$4,category_meta_title=$5,category_meta_keyword=$6, category_meta_description=$7,category_featured=$8,category_status=$9 WHERE cat_id=$1 RETURNING cat_id",
      [
        cat_id,
        category_name,
        category_url,
        category_description,
        category_meta_title,
        category_meta_keyword,
        category_meta_description,
        category_featured,
        category_status,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A category details has been updated: ${JSON.stringify(
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

export const updatecourse = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      cour_id,
      course_name,
      course_url,
      cmeta_title,
      cmeta_description,
      cmeta_keyword,
      cstatus,
      cat_id,
    } = body;
    pool.query(
      "UPDATE courses SET course_name=$2,course_url=$3,cmeta_title=$4,cmeta_description=$5,cmeta_keyword=$6,cstatus=$7, cat_id=$8 WHERE cour_id=$1 RETURNING cour_id",
      [
        cour_id,
        course_name,
        course_url,
        cmeta_title,
        cmeta_description,
        cmeta_keyword,
        cstatus,
        cat_id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A category details has been updated: ${JSON.stringify(
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
//get all facility our database
export const getFacility = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when facility_status = 'A' then 'Active' else 'Inactive' end as status FROM facility ORDER BY facility_id DESC",
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
//get all question and answer our database
export const getQuestionlisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when qstatus = 'A' then 'Active' else 'Inactive' end as status FROM questions ORDER BY qid DESC",
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
//get all news and articles our database
export const getNewsarticleslisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when na_type = 'a' then 'Article' when na_type = 'n' then 'News' else 'Exam' end as type,case when na_status = 'A' then 'Active' else 'Inactive' end as status FROM newsarticles ORDER BY na_id DESC",
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
//get all facility our database
export const getCategories = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when category_status = 'A' then 'Active' else 'Inactive' end as status FROM categories ORDER BY category_name ASC",
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

export const editCategory = (cat_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM categories WHERE cat_id = $1",
      [cat_id],
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
    //console.log(query);
  });
};

export const editcourse = (cour_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM courses WHERE cour_id = $1",
      [cour_id],
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
    //console.log(query);
  });
};
//get all facility our database

export const getApprovedby = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT *,case when app_status = 'A' then 'Active' else 'Inactive' end as status FROM approvedby ORDER BY approved_name ASC",
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

export const editapproved = (approv_id) => {
  //const rol_id = rol_id;
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM approvedby WHERE approv_id = $1",
      [approv_id],
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
    //console.log(query);
  });
};

export const addnewapprovedby = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      approved_name,
      approved_url,
      app_meta_title,
      app_meta_description,
      app_meta_keyword,
      app_status,
      approved_description,
    } = body;
    pool.query(
      "INSERT INTO approvedby( approved_name,approved_url,app_meta_title,app_meta_description,app_meta_keyword,app_status,approved_description) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *",
      [
        approved_name,
        approved_url,
        app_meta_title,
        app_meta_description,
        app_meta_keyword,
        app_status,
        approved_description,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        }
        if (results && results.rows) {
          resolve(
            `A new approved by details has been added: ${JSON.stringify(
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

export const updateapprovedby = (body) => {
  return new Promise(function (resolve, reject) {
    console.log(body);
    const {
      approv_id,
      approved_name,
      approved_url,
      app_meta_title,
      app_meta_description,
      app_meta_keyword,
      app_status,
      approved_description,
    } = body;
    pool.query(
      "UPDATE approvedby SET approved_name=$2,approved_url=$3,app_meta_title=$4,app_meta_description=$5,app_meta_keyword=$6,app_status=$7, approved_description=$8 WHERE approv_id=$1 RETURNING approv_id",
      [
        approv_id,
        approved_name,
        approved_url,
        app_meta_title,
        app_meta_description,
        app_meta_keyword,
        app_status,
        approved_description,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A approved by has been updated: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
export const deleteVehicless = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM colleges WHERE cid = $1",
      [cid],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Vehicle deleted with ID: ${id}`);
      }
    );
  });
};
export const inactiveApprovedby = (approv_id) => {
  console.log("id--", approv_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE approvedby SET app_status='D' WHERE approv_id=$1",
      [approv_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A approved by has been inactived: ${approv_id}`);
      }
    );
  });
};
export const inactiveCategory = (cat_id) => {
  console.log("id--", cat_id);
  return new Promise(function (resolve, reject) {
    pool.query(
      "UPDATE categories SET category_status='D' WHERE cat_id=$1",
      [cat_id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A approved by has been inactived: ${cat_id}`);
      }
    );
  });
};

export const getCMSListing = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM cms ORDER BY cmsid DESC", (error, results) => {
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

export const getNotificationlisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT notif_id,notification_title, notification_url, notification_position,case when notification_status = 'A' then 'Active' else 'Inactive' end as status FROM notifications ORDER BY notif_id DESC",
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

export const collegeenquirylisting = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        "SELECT ce.*,TO_CHAR(ce.enqury_date, 'dd-Mon-yyyy') enqury_at,c.college_name FROM collegeenquery ce LEFT JOIN colleges c ON ce.college_id=c.cid ORDER BY ce.ce_id DESC",
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

export const insertCollegeBasicInfoNew = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      college_name,
      college_url,
      tag_line,
      usp_remark,
      found_year,
      intake,
      hostel_available,
      college_descripton,
      facultyprofile,
      ctype,
      trading,
      approvedby,
      facilities,
      categories,
      exams,
      meta_title,
      meta_keyword,
      meta_description,
      coupon_code,
      nirg_ranking,
      application_open,
      logo,
      banner,
      added_by,
    } = body;
    pool.query(
      "INSERT INTO colleges(college_name,college_url,tag_line,usp_remark,found_year,intake,hostel_available,college_descripton,facultyprofile,ctype,trading,approvedby,facilities,categories,exams,meta_title,meta_keyword,meta_description, coupon_code,nirg_ranking,application_open,logo,banner,added_by,added_at) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,CURRENT_DATE) RETURNING *",
      [
        college_name,
        college_url,
        tag_line,
        usp_remark,
        found_year,
        intake,
        hostel_available,
        college_descripton,
        facultyprofile,
        ctype,
        trading,
        approvedby,
        facilities,
        categories,
        exams,
        meta_title,
        meta_keyword,
        meta_description,
        coupon_code,
        nirg_ranking,
        application_open,
        logo,
        banner,
        added_by,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          //resolve(`College basic insert: ${JSON.stringify(results.rows[0])}`);
          resolve(JSON.stringify(results.rows[0]));
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

export const updateCollegeBasicInfoNew = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      cid,
      college_name,
      college_url,
      tag_line,
      usp_remark,
      found_year,
      intake,
      hostel_available,
      college_descripton,
      facultyprofile,
      ctype,
      trading,
      approvedby,
      facilities,
      categories,
      exams,
      meta_title,
      meta_keyword,
      meta_description,
      logo,
      banner,
      coupon_code,
      nirg_ranking,
      application_open,
    } = body;
    pool.query(
      "UPDATE colleges SET college_name = $2, college_url = $3,tag_line=$4,usp_remark=$5,found_year=$6,intake=$7,hostel_available=$8,college_descripton=$9,facultyprofile=$10,ctype=$11,trading=$12,approvedby=$13,facilities=$14,categories=$15,exams=$16,meta_title=$17,meta_keyword=$18,meta_description=$19,logo=$20,banner=$21,coupon_code=$22,nirg_ranking=$23,application_open=$24,updated_at=CURRENT_DATE WHERE cid = $1 RETURNING *",
      [
        cid,
        college_name,
        college_url,
        tag_line,
        usp_remark,
        found_year,
        intake,
        hostel_available,
        college_descripton,
        facultyprofile,
        ctype,
        trading,
        approvedby,
        facilities,
        categories,
        exams,
        meta_title,
        meta_keyword,
        meta_description,
        logo,
        banner,
        coupon_code,
        nirg_ranking,
        application_open,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`College basic updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

module.exports = {
  Login,
  getColleges,
  //college,
};
