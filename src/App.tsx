import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import { ApiDataType } from './types';

function App() {
  const [apiData, setApiData] = useState<ApiDataType[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => setApiData(data.results));
  }, []);

  return (
    <>
      <h1>Star Wars</h1>
      <Table planetesInfo={ apiData } />
    </>
  );
}

export default App;
