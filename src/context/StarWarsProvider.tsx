import { useEffect, useState } from 'react';
import { ApiDataType, FilterType, OptionsFomrType, StarWarsContextType } from '../types';
import StarWarsContext from './StarWarsContext';

const optionsForm = {
  columnsFilter: [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ],
  comparisonFilter: [
    'maior que',
    'menor que',
    'igual a',
  ],
};

function StarWarsProvider({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<ApiDataType[]>([]);
  const [filterList, setFilterList] = useState<FilterType[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<ApiDataType[]>(apiData);
  const [options, setOptions] = useState<OptionsFomrType>(optionsForm);

  useEffect(() => {
    const getInfoApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
      setFilteredPlanets(data.results);
    };

    getInfoApi();
  }, []);

  const getFilterPlanetsName = (inputValue: string) => {
    const result = apiData
      .filter((planet) => planet.name.toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase()));
    setFilteredPlanets(result);
  };

  const filterPlanets = (formValue: FilterType) => {
    console.log(formValue);
    const { comparison, column, amount } = formValue;
    const result = filteredPlanets.filter((planet: ApiDataType) => {
      if (comparison === 'maior que') {
        return Number(planet[column as keyof ApiDataType]) > Number(amount);
      }
      if (comparison === 'menor que') {
        return Number(planet[column as keyof ApiDataType]) < Number(amount);
      }
      return Number(planet[column as keyof ApiDataType]) === Number(amount);
    });
    setFilteredPlanets(result);
    setFilterList((prevState) => [...prevState, formValue]);
    setOptions((prevOptions) => (
      { ...prevOptions,
        columnsFilter: prevOptions.columnsFilter
          .filter((item) => item !== formValue.column) }
    ));
  };

  const value: StarWarsContextType = {
    planets: apiData,
    getFilterPlanetsName,
    filteredPlanets,
    filterPlanets,
    filterList,
    options,
  };

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;
