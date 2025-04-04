import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner 컴포넌트', () => {
  it('Spinner 컴포넌트가 올바르게 렌더링된다.', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('svg');

    expect(spinner).toBeInTheDocument();
  });

  it('className prop으로 전달된 클래스가 적용된다', () => {
    const { container } = render(<Spinner className='custom-class' />);
    const spinner = container.querySelector('svg');

    expect(spinner).toHaveClass('custom-class');
  });
});
