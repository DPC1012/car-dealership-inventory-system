import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext';

const TestComponent = () => {
  const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'AUTHENTICATED' : 'GUEST'}</div>
      <div data-testid="admin-status">{isAdmin ? 'ADMIN' : 'USER'}</div>
      <div data-testid="user-email">{user?.email || 'NONE'}</div>
      <button
        onClick={() =>
          login('mock-jwt-token', {
            id: 'admin-1',
            email: 'admin@dealership.com',
            role: 'ADMIN',
            createdAt: '',
            updatedAt: '',
          })
        }
      >
        Login Admin
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('GUEST');
    expect(screen.getByTestId('user-email')).toHaveTextContent('NONE');
  });

  it('updates state and persists token to localStorage on login', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login Admin'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('AUTHENTICATED');
    expect(screen.getByTestId('admin-status')).toHaveTextContent('ADMIN');
    expect(screen.getByTestId('user-email')).toHaveTextContent('admin@dealership.com');
    expect(localStorage.getItem('token')).toBe('mock-jwt-token');
  });

  it('clears state and localStorage on logout', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login Admin'));
    fireEvent.click(screen.getByText('Logout'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('GUEST');
    expect(localStorage.getItem('token')).toBeNull();
  });
});
