// __test__/Card.test.jsx
import { render, screen } from 'vitest-dom';
import Card from '../src/components/Card';

// Test 1: Renderiza el componente Card correctamente con un título
test('Renderiza el componente Card con un título', () => {
  const mockItem = {
    id: 1,
    image_urls: ['https://example.com/image.jpg'],
    title: 'Sample Title',
  };

  render(<Card item={mockItem} />);
  
  const titleElement = screen.getByText(mockItem.title);
  expect(titleElement).toBeDefined();
});

// Test 2: Renderiza el enlace con la URL correcta para más detalles
test('Renderiza el enlace con la URL correcta para más detalles', () => {
  const mockItem = {
    id: 1,
    image_urls: ['https://example.com/image.jpg'],
    title: 'Sample Title',
  };

  render(<Card item={mockItem} />);
  
  const linkElement = screen.getByRole('link', { name: /más detalle/i });
  expect(linkElement).toHaveAttribute('href', '/detail/1');
});

// Test 3: Verifica que el componente Card se renderice correctamente
test('Verifica que el componente Card se renderice correctamente', () => {
  const mockItem = {
    id: 1,
    image_urls: ['https://example.com/image.jpg'],
    title: 'Sample Title',
  };

  render(<Card item={mockItem} />);
  // Puedes agregar más verificaciones según sea necesario
  // ...

  // Ejemplo: Verifica que el componente contenga la clase 'card'
  const cardElement = screen.getByTestId('card');
  expect(cardElement).toHaveClass('card');
});
