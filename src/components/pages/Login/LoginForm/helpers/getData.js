export const getData = (values) => {
  const username = values.email.fieldValue;
  const password = values.password.fieldValue;

  const data = { username, password };

  return data;
};
