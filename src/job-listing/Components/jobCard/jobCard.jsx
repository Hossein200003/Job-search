import { useContext, useEffect } from "react";
import {
  Filters_context,
  Sort_context,
  Reverse_context,
} from "../../context/allContexts.js";

import styles from "./style.module.css";

const Jobcard = (props) => {
  // const [filters, filters_dispatch] = useReducer(filters_reducer,[]);
  const { filters, filters_dispatch } = useContext(Filters_context);
  const { isSorted } = useContext(Sort_context);
  const { isReversed } = useContext(Reverse_context);
  const { data, numOfJobs } = props;
  const { setNumOfJobs } = numOfJobs;

  let jobCards = data
    .map((item) => (
      <Card data={item} dispatch={filters_dispatch} key={item.id} />
    ))
    .filter((component) => {
      // console.log(component.props.data.level)
      const shortName = component.props.data;
      const jobDetails = [
        shortName.role,
        shortName.level,
        ...shortName.languages,
        ...shortName.tools,
      ];
      const doesArrayMatch_filters = filters.map((filter) =>
        isReversed ? !jobDetails.includes(filter) : jobDetails.includes(filter)
      );
      return doesArrayMatch_filters.every((item) => item);
    });

  useEffect(() => setNumOfJobs(jobCards.length), [jobCards]);

  if (isSorted) {
    jobCards = jobCards.sort((a, b) => {
      return a.props.data.postedAt - b.props.data.postedAt;
    });
  }

  return (
    <div>
      {console.log(jobCards.length)}
      {jobCards.length !== 0 && jobCards}
      {filters.length !== 0 && jobCards.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h1>
            No Jobs Found
            <br />
            Therefore you will have no money :)
          </h1>
        </div>
      )}
    </div>
  );
};

const Card = ({ data, dispatch }) => {
  return (
    <div className={`${styles.card}`}>
      <div>
        <h1 className={styles.title}>{data.position}</h1>
        <h2 className={styles.company}>{data.company}</h2>
        <h3>
          <span style={{ fontSize: "15px" }}>Experience: </span>
          {data.level}
        </h3>
      </div>

      <div name="datas" className={`${styles.datasDiv}`}>
        <h4>{data.location} | </h4>
        <h4>{data.contract} |</h4>
        <h4>
          {Math.floor(data.postedAt / 7) >= 1
            ? Math.floor(data.postedAt / 7) > 1
              ? Math.floor(data.postedAt / 7) + "weeks ago"
              : Math.floor(data.postedAt / 7) + "week ago"
            : data.postedAt > 1
            ? data.postedAt + "days ago"
            : data.postedAt + "day ago"}
        </h4>
      </div>

      <div name="filters" className={`${styles.btnsDiv}`}>
        <button
          onClick={(e) =>
            dispatch({ type: "ADD_FILTER", filter: e.target.innerHTML })
          }
        >
          {data.role}
        </button>
        {data.languages.map((lang) => (
          <button
            onClick={(e) =>
              dispatch({
                type: "ADD_FILTER",
                filter: e.target.innerHTML,
              })
            }
            key={Math.round(1000 * Math.random())}
          >
            {lang}
          </button>
        ))}
        <button
          onClick={(e) =>
            dispatch({ type: "ADD_FILTER", filter: e.target.innerHTML })
          }
        >
          {data.level}
        </button>
      </div>

      <div name="tools" className={`${styles.btnsDiv}`}>
        Tools: {data.tools.length === 0 && <button>N/A</button>}
        {data.tools.map((tool) => (
          <button
            onClick={(e) =>
              dispatch({
                type: "ADD_FILTER",
                filter: e.target.innerHTML,
              })
            }
            key={Math.round(1000 * Math.random())}
          >
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Jobcard;
