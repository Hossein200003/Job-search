import { useContext } from "react";
import {
  Filters_context,
  Sort_context,
  Reverse_context,
} from "../../context/allContexts.js";

import styles from "./style.module.css";

const Header = (props) => {
  const { numOfJobs } = props;
  const { num } = numOfJobs;
  const { isReversed, setReverse } = useContext(Reverse_context);
  const { isSorted, setSort } = useContext(Sort_context);
  const { filters: filterLable, filters_dispatch } =
    useContext(Filters_context);

  return (
    <div className={`${styles.headBar}`}>
      <div>
        {filterLable.map((item) => (
          <button
            onClick={(e) =>
              filters_dispatch({ type: "DEL_FILTER", filter: item })
            }
            key={Math.round(1000 * Math.random())}
          >
            <h4>{item}</h4>
          </button>
        ))}
        <button
          onClick={() => setReverse(!isReversed)}
          className={`${styles.reverseBtn} ${isReversed && styles.reversed}`}
        >
          Invert filter system
        </button>
        <h3 style={{ display: "inline" }}>
          found: {num} {num <= 1 ? "Job" : "Jobs"}
        </h3>
        <button onClick={() => setSort(!isSorted)}>
          {" "}
          {isSorted ? "Recent" : "Relevant"}{" "}
        </button>
      </div>
    </div>
  );
};

export default Header;
