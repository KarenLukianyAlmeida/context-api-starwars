import { FilterType } from '../types';

type FilterProps = {
  filterList: FilterType[];
  handleRemoveFilter: (column: string) => void;
  handleRemoveAllFilters: () => void;
};

function Filters({
  filterList, handleRemoveFilter, handleRemoveAllFilters,
}: FilterProps) {
  console.log(filterList);
  return (
    <div className="containerFilters">
      {filterList.map((filter, index) => (
        <div key={ index } data-testid="filter">
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
            className="removeBtn"
            onClick={ () => handleRemoveFilter(filter.column) }
          >
            ❌
          </button>
        </div>
      ))}
      {filterList.length > 0 && (
        <div>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ handleRemoveAllFilters }
          >
            Remover todas filtragens
          </button>
        </div>)}
    </div>

  );
}

export default Filters;
