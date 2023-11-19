// __test__/FormBusquedaPelicula.test.jsx
import { render, screen } from 'vitest-dom';
import FormBusquedaPelicula from '../src/components/FormBusquedaPelicula';

// Test 1: Renderiza el componente FormBusquedaPelicula con el título correcto
test('Renderiza el componente FormBusquedaPelicula con el título correcto', () => {
  render(<FormBusquedaPelicula />);
  
  const titleElement = screen.getByText(/buscar película/i);
  expect(titleElement).toBeDefined();
});

// Test 2: Renderiza el componente FormBusquedaPelicula con un campo de entrada
test('Renderiza el componente FormBusquedaPelicula con un campo de entrada', () => {
  render(<FormBusquedaPelicula />);
  
  const inputElement = screen.getByPlaceholderText(/seleccione la pelicula/i);
  expect(inputElement).toBeDefined();
});

// Test 3: Verifica que el componente FormBusquedaPelicula se renderice correctamente
test('Verifica que el componente FormBusquedaPelicula se renderice correctamente', () => {
  render(<FormBusquedaPelicula />);
  
  // Verifica que el componente contenga la clase 'flex'
  const flexContainer = screen.getByTestId('form-busqueda');
  expect(flexContainer).toHaveClass('flex');

  // Verifica que el componente contenga el botón de búsqueda
  const searchButton = screen.getByRole('button', { name: /buscar/i });
  expect(searchButton).toBeDefined();
});
