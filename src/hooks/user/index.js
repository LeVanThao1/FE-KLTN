import {useLazyQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {LOGIN} from '../../query/user';

export const useLogin = () => {
  const [result, setResult] = useState();
  const [login, {called, loading, data, error}] = useLazyQuery(LOGIN);

  useEffect(() => {
    if (data) {
      setResult(data.login);
    }
    if (error) {
      console.log(error.message);
    }
  }, [data, error]);

  return {
    login,
    result,
    loading,
    error,
  };
};
