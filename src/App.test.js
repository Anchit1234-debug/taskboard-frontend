import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls healthcheck endpoint on component mount', async () => {
    axios.get.mockResolvedValue({ data: true });
    render(<App />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/healthcheck');
    });
  });

  test('displays healthy status when service is healthy', async () => {
    axios.get.mockResolvedValue({ data: true });
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('✓ Healthy')).toBeInTheDocument();
    });
  });

  test('displays unhealthy status when service is down', async () => {
    axios.get.mockResolvedValue({ data: false });
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('✗ Unhealthy')).toBeInTheDocument();
    });
  });

  test('displays error message when API request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to reach service')).toBeInTheDocument();
    });
  });

  test('shows loading message initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<App />);
    
    expect(screen.getByText('Checking service health...')).toBeInTheDocument();
  });

  test('renders button with correct label', async () => {
    axios.get.mockResolvedValue({ data: true });
    render(<App />);
    
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /Check Status/i });
      expect(button).toBeInTheDocument();
    });
  });
});
