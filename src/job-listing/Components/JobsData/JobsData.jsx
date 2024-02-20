import { useState, useEffect } from "react";
import data from "../../data/data.json";
const jobsArr = data;

const JobData = (props) => {
  const { jData_dispatch } = props;
  useEffect(() => getData(), []);
  
  const getData = async () => {
    const data = fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(jobsArr),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await data;
    // console.log(response.json())
    const commData = await response.json();
    const jobData_arr = Object.values(commData);
    jobData_arr.pop();
    jData_dispatch({jobsData:jobData_arr});
  };
};

export default JobData;
