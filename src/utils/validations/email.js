export default validationEmail = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  return (
    value.match(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    ) !== null
  );
};
