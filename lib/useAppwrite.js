import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (apiFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, fetchData };
};

export default useAppwrite;