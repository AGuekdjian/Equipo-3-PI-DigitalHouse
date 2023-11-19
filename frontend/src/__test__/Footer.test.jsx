// __test__/Footer.test.jsx
import { render, screen } from 'vitest-dom';
import Footer from '../src/components/Footer';

// Test 1: Renderiza el componente Footer con el año actual
test('Renderiza el componente Footer con el año actual', () => {
  render(<Footer />);
  
  const yearElement = screen.getByText(new Date().getFullYear().toString());
  expect(yearElement).toBeDefined();
});

// Test 2: Renderiza el componente Footer con el nombre de la aplicación
test('Renderiza el componente Footer con el nombre de la aplicación', () => {
  render(<Footer />);
  
  const appNameElement = screen.getByText(/cinesearchpro/i);
  expect(appNameElement).toBeDefined();
});

// Test 3: Verifica que el componente Footer se renderice correctamente
test('Verifica que el componente Footer se renderice correctamente', () => {
  render(<Footer />);
  // Puedes agregar más verificaciones según sea necesario
  // ...

  // Ejemplo: Verifica que el componente contenga la clase 'footer'
  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toHaveClass('footer');
});

