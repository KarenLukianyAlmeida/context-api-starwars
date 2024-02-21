import { useEffect, useState } from 'react';
import { ApiDataType, StarWarsContextType } from '../types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<ApiDataType[]>([]);

  useEffect(() => {
    const getInfoApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
      setFilteredPlanets(data.results);
    };

    getInfoApi();
  }, []);

  const value: StarWarsContextType = {
    planets: apiData,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
