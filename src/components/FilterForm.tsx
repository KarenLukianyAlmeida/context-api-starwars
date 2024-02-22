import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import { ApiDataType, FilterType } from '../types';
import Filters from './Filters';

const initialValues = {
  column: 'population',
  comparison: 'maior que',
  amount: '0',
};

const comparisonFilter = [
  'maior que',
  'menor que',
  'igual a',
];

const columnsFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterForm() {
  const { planets, setFilteredPlanets } = useContext(StarWarsContext);

  const [name, setName] = useState('');
  const [formValue, setFormValue] = useState<FilterType>(initialValues);
  const [options, setOptions] = useState<string[]>(columnsFilter);
  const [filterList, setFilterList] = useState<FilterType[]>([]);

  useEffect(() => filterPlanets(), [options]);

  const getFilterPlanetsName = (inputValue: string) => {
    const result = planets
      .filter((planet) => planet.name.toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase()));
    setFilteredPlanets(result);
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
    getFilterPlanetsName(e.target.value);
  };

  const filterPlanets = () => {
    const result = planets.filter((planet: ApiDataType) => {
      return filterList.every((filter) => {
        switch (filter.comparison) {
          case 'maior que':
            return Number(planet[filter.column as keyof ApiDataType])
            > Number(filter.amount);
          case 'menor que':
            return Number(planet[filter.column as keyof ApiDataType])
            < Number(filter.amount);
          default:
            return Number(planet[filter.column as keyof ApiDataType])
            === Number(filter.amount);
        }
      });
    });

    setFilteredPlanets(result);
  };

  const handleAddFilter = () => {
    setFilterList((prevState) => {
      const newFilterList = [...prevState, formValue];
      const columnsList = newFilterList.map((item) => item.column);
      const optionsList = columnsFilter
        .filter((item) => !columnsList.includes(item));

      console.log(optionsList);
      setOptions(optionsList);
      setFormValue({
        ...initialValues,
        column: optionsList.length > 0 ? optionsList[0] : '', // Ajuste conforme necessário
      });

      return newFilterList;
    });
  };

  const handleRemoveFilter = (column: string) => {
    const result = filterList.filter((filter) => filter.column !== column);
    setFilterList(result);

    const newOptionsList = [...options, column];
    setOptions(newOptionsList);
  };

  const handleRemoveAllFilters = () => {
    setFilterList([]);
    setOptions(columnsFilter);
    setFormValue({
      ...initialValues,
      column: columnsFilter[0],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name-filter">
            <input
              data-testid="name-filter"
              type="text"
              name="planetName"
              id="name-filter"
              placeholder="Planet Name..."
              value={ name }
              onChange={ handleChangeName }
            />
          </label>
        </div>

        <div>
          <label htmlFor="column-filter">
            <select
              data-testid="column-filter"
              name="column"
              id="column-filter"
              onChange={ handleChange }
              value={ formValue.column }
            >
              {options.map((column) => (
                <option
                  value={ column }
                  key={ column }
                >
                  {column}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="comparison-filter">
            <select
              data-testid="comparison-filter"
              name="comparison"
              id="comparison-filter"
              onChange={ handleChange }
              value={ formValue.comparison }
            >
              {comparisonFilter.map((comparison) => (
                <option
                  value={ comparison }
                  key={ comparison }
                >
                  { comparison }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="value-filter">
            <input
              data-testid="value-filter"
              type="number"
              name="amount"
              id="value-filter"
              min={ 0 }
              onChange={ handleChange }
              value={ formValue.amount }
            />
          </label>

          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => {
              filterPlanets();
              handleAddFilter();
            } }
          >
            Filtrar
          </button>
        </div>
      </form>
      <Filters
        filterList={ filterList }
        handleRemoveFilter={ handleRemoveFilter }
        handleRemoveAllFilters={ handleRemoveAllFilters }
      />
    </>
  );
}

export default FilterForm;
