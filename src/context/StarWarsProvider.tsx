import { useEffect, useState } from 'react';
import { ApiDataType, StarWarsContextType } from '../types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<ApiDataType[]>(apiData);

  useEffect(() => {
    const getInfoApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
      setFilteredPlanets(data.results);
    };

    getInfoApi();
  }, []);

  const getFilterPlanets = (inputValue: string) => {
    const result = apiData.filter((planet) => planet.name.includes(inputValue));
    setFilteredPlanets(result);
  };

  const value: StarWarsContextType = {
    planets: apiData,
    getFilterPlanets,
    filteredPlanets,
  };

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
