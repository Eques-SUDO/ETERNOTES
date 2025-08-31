import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders ETERNOTES MUSIC text', async () => {
  render(<App />);
  await waitFor(() => {
    const logoElement = screen.getByText(/ETERNOTES MUSIC/i);
    expect(logoElement).toBeInTheDocument();
  });
});
