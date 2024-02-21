import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import { FilterType } from '../types';

const initialValues = {
  column: 'population',
  comparison: 'maior que',
  amount: '0',
};

function FilterForm() {
  const { getFilterPlanetsName, filterPlanets, options } = useContext(StarWarsContext);
  const [name, setName] = useState('');
  const [formValue, setFormValue] = useState<FilterType>(initialValues);

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
    getFilterPlanetsName(e.target.value);
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
          onClick={ () => filterPlanets(formValue) }
        >
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
