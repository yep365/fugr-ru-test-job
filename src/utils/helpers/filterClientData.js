export default (objArray, query, exactSearch) => {
  console.log(`Прилетело ${exactSearch}`);
  let filteredArr = [];
  objArray.forEach((obj) => {
    Object.values(obj).forEach((value) => {
      if (typeof value === "object") {
        let nestedObj = Object.values(value);
        nestedObj.filter((item) => {
          if (
            exactSearch
              ? String(item).toLowerCase() === String(query).toLowerCase()
              : String(item).toLowerCase().includes(String(query).toLowerCase())
          ) {
            return filteredArr.push(obj);
          }
        });
      } else {
        if (
          exactSearch
            ? String(value).toLowerCase() === String(query).toLowerCase()
            : String(value).toLowerCase().includes(String(query).toLowerCase())
        ) {
          return filteredArr.push(obj);
        }
      }
    });
  });
  return filteredArr;
};
