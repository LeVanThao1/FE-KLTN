export const formatPhone = (value) =>
  value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

export const deFormatPhone = (value) => value.replace(/\s/gi, '');
