import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('JobTrail Frontend Tests', () => {
  it('renders application without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });

  it('renders brand or navigation elements', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/JobTrail/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('contains interactive buttons on initial load', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});