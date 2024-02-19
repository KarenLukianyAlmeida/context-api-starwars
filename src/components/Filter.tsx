import { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const { getFilterPlanets } = useContext(StarWarsContext);
  const [name, setName] = useState('');

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    getFilterPlanets(e.target.value);
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        name="planetName"
        id="planetName"
        placeholder="Planet Name..."
        value={ name }
        onChange={ handleChangeName }
      />
    </form>
  );
}

export default Filter;
