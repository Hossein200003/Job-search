const filters_reducer = (filters, action) => {
  switch (action.type) {
    case "ADD_FILTER": {
      if (!filters.includes(action.filter)) {
        return [...filters, action.filter];
      }
    }
    case "DEL_FILTER": {
      return filters.filter((item) => action.filter !== item);
    }
  }

  return action.jobsData;
};

const jData_reducer = (state, action) => {
  return action.jobsData;
};

export { filters_reducer, jData_reducer };
