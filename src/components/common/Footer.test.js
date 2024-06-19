import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StickyFooter from './Footer';
import '@testing-library/jest-dom/extend-expect';

describe('StickyFooter', () => {
  test('renders BottomNavigation with three actions', () => {
    render(
      <MemoryRouter>
        <StickyFooter />
      </MemoryRouter>
    );

    // Check if the BottomNavigationActions are rendered with correct labels
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Following/i)).toBeInTheDocument();
    expect(screen.getByText(/Archive/i)).toBeInTheDocument();
  });

  test('navigates to correct pages on action click', () => {
    render(
      <MemoryRouter>
        <StickyFooter />
      </MemoryRouter>
    );

    // Simulate click on "Contact" action
    fireEvent.click(screen.getByText(/Contact/i));
    expect(window.location.pathname).toBe('/contact');

    // Simulate click on "Following" action
    fireEvent.click(screen.getByText(/Following/i));
    expect(window.location.pathname).toBe('/following');

    // Simulate click on "Archive" action
    fireEvent.click(screen.getByText(/Archive/i));
    expect(window.location.pathname).toBe('/archive');
  });
});
