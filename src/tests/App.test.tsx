import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import StarWarsProvider from '../context/StarWarsProvider';
import { mockData } from './mockData';

const MOCK_RESPONSE = {
  ok: true,
  status: 200,
  json: async () => mockData,
} as Response;

describe('Table component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('1. Verifica se informações, vindas da api, do componente "Table" renderizam corretamente.', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const planetsName = await screen.findAllByTestId('planet-name');
    expect(planetsName[0]).toBeInTheDocument();
    
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(mockData.results.length).toBe(10);
  });
});
