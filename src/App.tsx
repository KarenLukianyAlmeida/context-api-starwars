import Table from './components/Table';
import './App.css';
import FilterForm from './components/FilterForm';
import Filters from './components/Filters';

function App() {
  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <FilterForm />
      <Filters />
      <Table />
    </>
  );
}

export default App;
