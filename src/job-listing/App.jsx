import { useState, useReducer, useEffect } from "react";
import { filters_reducer, jData_reducer } from "./reducers/allReducers.js";
import { JobCard, Header, useJobData } from "./imports/Comps.js";
import {
  Filters_context,
  Sort_context,
  Reverse_context,
} from "./context/allContexts.js";
import "./globalStyle.css";

const App = () => {
  const [jobsData, jData_dispatch] = useReducer(jData_reducer, []);
  const [filters, filters_dispatch] = useReducer(filters_reducer, []);
  const [isSorted, setSort] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [num, setNumOfJobs] = useState(null);
  useEffect(() => {
    useJobData(jData_dispatch);
  }, []);
  
  return (
    <div className={`main`}>
      <Filters_context.Provider value={{ filters, filters_dispatch }}>
        <Reverse_context.Provider value={{ isReversed, setReverse }}>
          <Sort_context.Provider value={{ isSorted, setSort }}>
            <Header numOfJobs={{ num }} />
            <div className="cards">
              <JobCard data={jobsData} numOfJobs={{ setNumOfJobs }} />
            </div>
          </Sort_context.Provider>
        </Reverse_context.Provider>
      </Filters_context.Provider>

      {jobsData.length === 0 && (
        <h1 style={{ textAlign: "center " }}>Loading...</h1>
      )}
    </div>
  );
};

// const Header_reducer = (state,action,) => {

//  return action.jobsData;
// };

export default App;
