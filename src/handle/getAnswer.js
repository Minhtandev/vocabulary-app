export const getIndexAnswer = (data) => {
  var answers = [];
  data.length > 0 &&
    data.forEach((item, index) => {
      if (item.value) {
        answers.push(index);
      }
    });
  return answers;
};

export const getAnswer = (data) => {
  let anh = "";
  let viet = "";
  if (data.length > 0) {
    anh = data.find((item) => item.tag === 1).title;
    viet = data.find((item) => item.tag === 2).title;
  }
  return { anh, viet };
};

export const compareAnswer = (arr1, arr2) => {
  let result = true;
  if (arr1.length !== arr2.length) return false;
  if (arr1.length > 0) {
    result = arr1.every((item) => arr2.includes(item));
    if (!result) return result;
  }
  return result;
};
