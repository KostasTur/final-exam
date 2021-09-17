import { useState, useEffect } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = 'https://chuck-j.herokuapp.com/api';

const useAxios = (params) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const res = await axios.request(params);
      console.log(res.data);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, []);

  return { response, error, loading };
};

export default useAxios;