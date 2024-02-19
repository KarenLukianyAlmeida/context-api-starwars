import { createContext } from 'react';
import { StarWarsContextType } from '../types';

const StarWarsContext = createContext({} as StarWarsContextType);

export default StarWarsContext;
