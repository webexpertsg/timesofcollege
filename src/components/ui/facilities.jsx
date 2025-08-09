import React, { useEffect } from "react";
import { usePathname } from 'next/navigation';

import { CONSTANT } from "../../constant";

function Facilities(props) {
  const { data, clgName } = props;
  
  const { pathname } = usePathname();
  useEffect(() => {
      window.scroll(0, 0)
  }, [pathname])

  return (
    <>
      <section className="facilities mt-10">
        <h2 className="font-bold text-2xl mb-5">{clgName} Facilities</h2>
        <ul>
          {data &&
            data.split(",").map((item, i) => (
              <li key={i}>
                <img
                  src={CONSTANT.FACILITIES[item].imgUrl}
                  style={{ width: "50px" }}
                />
                <span>{CONSTANT.FACILITIES[item].name}</span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
export default Facilities;
