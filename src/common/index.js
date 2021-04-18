import {Client} from '../config';

export const queryData = async (
  inputQuery,
  variables = {},
  fetchPolicy = 'no-cache',
) => {
  const data = await Client.query({
    query: inputQuery,
    variables,
    fetchPolicy,
  });
  return data;
};

export const mutateData = async (
  inputQuery,
  variables = {},
  fetchPolicy = 'no-cache',
) => {
  const data = await Client.mutate({
    query: inputQuery,
    variables,
    fetchPolicy,
  });
  return data;
};
