export default validationCode = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.match(/^[0-9]{6,6}$/) !== null;
};
