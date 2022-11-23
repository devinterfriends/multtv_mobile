import {useEffect, useState} from 'react';
import {axios} from 'axios';

const useAxios = ({url, token, data}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(url)
      .then(res => {
        setResponse(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {response, error, loading};
};

export default useAxios;
