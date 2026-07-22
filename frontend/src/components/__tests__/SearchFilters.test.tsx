import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchFilters } from '../SearchFilters';

describe('SearchFilters Component', () => {
  it('renders search input, category chips, and price inputs', () => {
    render(
      <SearchFilters
        filters={{}}
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText(/e.g. Porsche, BMW/i)).toBeInTheDocument();
    expect(screen.getByText('SEDAN')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/1000000/i)).toBeInTheDocument();
  });

  it('calls onChange when typing in make search input', () => {
    const handleChange = vi.fn();
    render(
      <SearchFilters
        filters={{}}
        onChange={handleChange}
        onClear={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/e.g. Porsche, BMW/i);
    fireEvent.change(input, { target: { value: 'Porsche' } });

    expect(handleChange).toHaveBeenCalledWith({ make: 'Porsche' });
  });

  it('calls onClear when clicking Clear Filters button', () => {
    const handleClear = vi.fn();
    render(
      <SearchFilters
        filters={{ make: 'Porsche', category: 'SUV' }}
        onChange={vi.fn()}
        onClear={handleClear}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /Clear Filters/i });
    fireEvent.click(clearBtn);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
