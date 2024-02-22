import { ApiDataType, OrderType } from '../types';

type OrderPlanetsProps = {
  order: OrderType;
  handleChangeOrder: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  columnsFilter: string[];
  orderPlanets: () => void;
};

function OrderPlanets({
  order, handleChangeOrder, columnsFilter, orderPlanets,
}: OrderPlanetsProps) {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="column-sort">
            <select
              data-testid="column-sort"
              name="column"
              id="column-sort"
              onChange={ handleChangeOrder }
              value={ order.column }
            >
              {columnsFilter.map((column) => (
                <option
                  value={ column }
                  key={ column }
                >
                  {column}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="asc">
            Crescente
            <input
              type="radio"
              name="sort"
              id="asc"
              data-testid="column-sort-input-asc"
              value="ASC"
              checked={ order.sort === 'ASC' }
              onChange={ handleChangeOrder }
            />
          </label>
          <label htmlFor="des">
            Decrescente
            <input
              type="radio"
              name="sort"
              id="des"
              data-testid="column-sort-input-desc"
              value="DES"
              checked={ order.sort === 'DES' }
              onChange={ handleChangeOrder }
            />
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ orderPlanets }
          >
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderPlanets;
