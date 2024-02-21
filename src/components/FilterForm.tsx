import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import { ApiDataType, FilterType, OptionsFomrType } from '../types';
import Filters from './Filters';

const initialValues = {
  column: 'population',
  comparison: 'maior que',
  amount: '0',
};

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

function FilterForm() {
  const { planets, setFilteredPlanets, filteredPlanets } = useContext(StarWarsContext);

  const [name, setName] = useState('');
  const [formValue, setFormValue] = useState<FilterType>(initialValues);
  const [options, setOptions] = useState<OptionsFomrType>(optionsForm);
  const [filterList, setFilterList] = useState<FilterType[]>([]);

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
    setFormValue(initialValues);
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
              {options.columnsFilter.map((column) => (
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
              {options.comparisonFilter.map((comparison) => (
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
            onClick={ filterPlanets }
          >
            Filtrar
          </button>
        </div>
      </form>
      <Filters
        filterList={ filterList }
      />
    </>
  );
}

export default FilterForm;
