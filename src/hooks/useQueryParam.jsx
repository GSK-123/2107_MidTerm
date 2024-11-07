import { useState, useEffect } from 'react';

function useQueryParam(param) {
  const [queryValue, setQueryValue] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setQueryValue(searchParams.get(param));
  }, [param]);

  return queryValue;
}

export default useQueryParam;
