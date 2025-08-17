import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
import axios from "axios";

// import { getImageURL } from "../../../utils/utils-image";
// import mapIcon from "/images/map-icon.png";

function GlobalSearch(props) {
  const [suggestcolleges, setSuggestcolleges] = useState();
  const [searchparameter, setSearchparameter] = useState({
    search_parameter: "",
  });

  const handleChangeFormdata = (e) => {
    const { name, value } = e.target;
    setSearchparameter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const autosuggestcolleges = (e) => {
    const college_name = e.target.value;
    //console.log("s", collegeName);
    if (college_name != "") {
      axios
        //.get("/api/cmsdetails/" + cms_url)
        .get(`/api/autosuggestcolleges/${college_name}`)
        .then((response) => {
          setSuggestcolleges(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSuggestcolleges();
    }
  };

  const searchvalueset = (e, val) => {
    setSearchparameter({ search_parameter: val });
    setSuggestcolleges();
  };

  const searchCollege = () => {
    //alert(searchparameter.search_parameter);
    window.location = "/college?keyword=" + searchparameter.search_parameter;
  };

  return (
    <>
      <div className="search-wrapper mt-7">
        <form action="" name="searchForm" id="searchForm" method="post">
          <input
            type="text"
            value={searchparameter.search_parameter}
            id="search-input"
            name="search_parameter"
            placeholder="Search: Colleges, Courses, Exams, Specializations & More"
            onChange={handleChangeFormdata}
            onKeyUp={(e) => autosuggestcolleges(e)}
            autoComplete="off"
            autoFocus
          />
          <input
            type="button"
            id="search-btn"
            value="Search"
            onClick={searchCollege}
          />

          {suggestcolleges?.length > 0 && (
            <div className="collegeAutosuggest-section">
              <ul>
                {suggestcolleges.map((item, id) => (
                  <li
                    key={id}
                    onClick={(e) => searchvalueset(e, item.college_name)}
                  >
                    {item.college_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
export default GlobalSearch;
