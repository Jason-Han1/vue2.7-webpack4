const replacerByCase = (cases = [undefined]) => {
  return function (key, val) {
    return ~cases.indexOf(val) ? undefined : val;
  };
};
const replacerByKey = () => {

};

const trimJSON = (json) => {
 return JSON.parse(JSON.stringify(json, replacerByCase(['', null, undefined])));
};

export default {
  replacerByCase,
  replacerByKey,
  trimJSON
};
