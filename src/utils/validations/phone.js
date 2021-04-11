export default validationPhoneNumber = (value) => {
  if (typeof value !== 'string') {
    return false;
  }
  // mobi:  070, 079, 077, 076, 078
  // vinaphone: 083, 084, 085, 081, 082
  // viettel: 035, 033
  return (
    value.match(/(03|05|08|07|09|01[0|2|7|6|8|9|3|4|5|1])+([0-9]{8})\b/g) !==
    null
  );
};
