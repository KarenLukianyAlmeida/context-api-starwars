export type ApiDataType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type OptionsFomrType = {
  columnsFilter: string[];
  comparisonFilter: string[];
};

export type FilterType = {
  column: string;
  comparison: string;
  amount: string;
};

export type StarWarsContextType = {
  planets: ApiDataType[];
  getFilterPlanetsName: (inputValue: string) => void;
  filteredPlanets: ApiDataType[];
  filterPlanets: (formValue: FilterType) => void;
  filterList: FilterType[];
  options: OptionsFomrType;
};
