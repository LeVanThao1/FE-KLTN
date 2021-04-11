export default validationName = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  return value.match(/^[a-zA-Z0-9_-]{3,30}$/) !== null;
};
