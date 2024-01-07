/* a hook for checking screen width */
import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [screenMatchesQuery, setScreenMatchesQuery] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== screenMatchesQuery) {
      setScreenMatchesQuery(media.matches);
    }

    const listener = () => {
      setScreenMatchesQuery(media.matches);
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [screenMatchesQuery, query]);

  return screenMatchesQuery;
};

export default useMediaQuery;
