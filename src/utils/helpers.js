export const hasNotEmptyValue = (obj) => {
  return Object.values(obj).some((value) => {
    return value !== null || typeof value !== "undefined" || value !== "";
  });
};

export const commaWithSingleQuotes = (value) => {
  if (value == null || value === undefined || value === "") {
    return "";
  }
  return value.split(",").map((number) => number.toString());
};
export const createUrl = (e) => {
  var questions = e.target.value;
  var qsturl = questions.replace(/[_\s]/g, "-").replace(/[^a-z0-9-\s]/gi, "");
  //editdata.question_url = qsturl.toLowerCase();
  return qsturl.toLowerCase().trim();
};
