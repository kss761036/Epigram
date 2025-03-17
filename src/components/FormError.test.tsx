import { render, screen } from '@testing-library/react';
import FormError from './FormError';

describe('FormError', () => {
  it('전달한 message가 노출되는지', () => {
    const message = '에러메시지';

    render(<FormError message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('null가 전달되면 렌더링이 안된다.', () => {
    const { container } = render(<FormError message={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('undefined가 전달되면 렌더링이 안된다.', () => {
    const { container } = render(<FormError message={undefined} />);

    expect(container).toBeEmptyDOMElement();
  });
});
