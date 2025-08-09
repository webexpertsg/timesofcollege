import React, { useState, useEffect } from "react";

import arrowUpIcon from "../../../../public/images/arrowUp.svg";
import searchIcon from "../../../../public/images/search.svg";

function Filter(props) {
  return (
    <div className="filter-card">
      <div className="header">
        <span>{props.header}</span>
        <span>
          <img src={arrowUpIcon} alt="" />
        </span>
      </div>
      {props.search && (
        <div className="search">
          <input type="text" placeholder="Search" />
          <img src={searchIcon} alt="" />
        </div>
      )}

      <ul>
        {props.fdata?.length &&
          props.fdata.map((items, i) => (
            <li key={i}>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  value={items.col_type}
                />
                <label htmlFor="checkbox">{items.college_type}</label>
              </span>
              <span>({items.total_count})</span>
            </li>
          ))}{" "}
        {props.filtercourse?.length &&
          props.filtercourse.map((items, i) => (
            <li key={i}>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  value={items.cour_id}
                  onClick={props.click}
                />
                <label htmlFor="checkbox">{items.course_name}</label>
              </span>
              <span>({items.total_count})</span>
            </li>
          ))}
        {props.filterstate?.length &&
          props.filterstate.map((items, i) => (
            <li key={i}>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  value={items.sta_id}
                />
                <label htmlFor="checkbox">{items.state_name}</label>
              </span>
              <span>({items.total_count})</span>
            </li>
          ))}
        {props.filtercity?.length &&
          props.filtercity.map((items, i) => (
            <li key={i}>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="checkbox"
                  value={items.cit_id}
                />
                <label htmlFor="checkbox">{items.city_name}</label>
              </span>
              <span>({items.total_count})</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

Filter.propTypes = {};

export default Filter;
