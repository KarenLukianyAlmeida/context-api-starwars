import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('FilterForm component', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('1. Verifica filtro por nome de planetas', async () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const inputName = screen.getByTestId('name-filter');
    expect(inputName).toBeInTheDocument();

    await userEvent.type(inputName, 'oo');

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(await screen.findByText('Naboo')).toBeInTheDocument();
    expect(await screen.queryByText('Alderaan')).not.toBeInTheDocument();
  });

  it('2. Verifica filtro por valores numéricos.', async () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputAmount = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    let planetsName = await screen.findAllByTestId('planet-name');

    await userEvent.selectOptions(inputColumn, 'population');
    await userEvent.selectOptions(inputComparison, 'maior que');
    await userEvent.type(inputAmount, '200000');
    await userEvent.click(buttonFilter);

    planetsName = await screen.findAllByTestId('planet-name');
    
    expect(planetsName.length).toBe(6);
    expect(inputColumn).toHaveValue('orbital_period');

    await userEvent.selectOptions(inputColumn, 'orbital_period');
    await userEvent.selectOptions(inputComparison, 'menor que');
    await userEvent.type(inputAmount, '463');
    await userEvent.click(buttonFilter);

    planetsName = await screen.findAllByTestId('planet-name');
    
    expect(planetsName.length).toBe(4);
    expect(inputColumn).toHaveValue('diameter');

    await userEvent.selectOptions(inputColumn, 'diameter');
    await userEvent.selectOptions(inputComparison, 'igual a');
    await userEvent.type(inputAmount, '4900');
    await userEvent.click(buttonFilter);

    planetsName = await screen.findAllByTestId('planet-name');
    
    expect(planetsName.length).toBe(1);
    expect(inputColumn).toHaveValue('rotation_period');
  });
  
  it('3. Verifica botões de excluir filtros individualmente.', async () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputAmount = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    
    await userEvent.selectOptions(inputColumn, 'population');
    await userEvent.selectOptions(inputComparison, 'maior que');
    await userEvent.type(inputAmount, '200000');
    await userEvent.click(buttonFilter);
    
    await userEvent.selectOptions(inputColumn, 'orbital_period');
    await userEvent.selectOptions(inputComparison, 'menor que');
    await userEvent.type(inputAmount, '463');
    await userEvent.click(buttonFilter);

    let butonRemoveFilter = await screen.findAllByTestId('button-remove-filter');
    expect(butonRemoveFilter.length).toBe(2);
    await userEvent.click(butonRemoveFilter[0]);

    butonRemoveFilter = await screen.findAllByTestId('button-remove-filter');
    expect(butonRemoveFilter.length).toBe(1);
  });

  it('4. Verifica se o botão "Remover todas filtragens" filtros.', async () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const inputColumn = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputAmount = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    
    await userEvent.selectOptions(inputColumn, 'population');
    await userEvent.selectOptions(inputComparison, 'maior que');
    await userEvent.type(inputAmount, '200000');
    await userEvent.click(buttonFilter);
    
    await userEvent.selectOptions(inputColumn, 'orbital_period');
    await userEvent.selectOptions(inputComparison, 'menor que');
    await userEvent.type(inputAmount, '463');
    await userEvent.click(buttonFilter);
    
    const buttonRemoveFilters = await screen.findByRole('button', { name: /remover todas filtragens/i });
    await userEvent.click(buttonRemoveFilters);
    expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
  });

  it('5. Verifica filtro por ordem crescente ou decrescente', async () => {
    render(<StarWarsProvider><App /></StarWarsProvider>);

    const inputColumn = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const inputDes = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByTestId('column-sort-button');

    await userEvent.selectOptions(inputColumn, 'population');
    await userEvent.click(inputDes);
    await userEvent.click(buttonSort);

    let planetsName = await screen.findAllByTestId('planet-name');
    expect(planetsName[0]).toHaveTextContent('Coruscant');

    await userEvent.selectOptions(inputColumn, 'diameter');
    await userEvent.click(inputAsc);
    await userEvent.click(buttonSort);

    planetsName = await screen.findAllByTestId('planet-name');
    expect(planetsName[0]).toHaveTextContent('Endor');
  });
});
