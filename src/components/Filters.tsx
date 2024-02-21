import { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filterList } = useContext(StarWarsContext);

  return (
    <div className="containerFilters">
      {filterList.map((filter, index) => (
        <div key={ index }>
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.amount}
            {' '}
          </span>
          <button
            type="button"
            data-testid="filter"
            className="removeBtn"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
